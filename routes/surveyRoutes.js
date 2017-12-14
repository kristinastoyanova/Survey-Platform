const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url'); //built-in node.js module
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin'); //Make sure the user is logged in
const requireCredits = require('../middlewares/requireCredits'); //Make sure the user has enough credits
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('survey');

module.exports = app => {
    app.get('/api/surveys', requireLogin, async (req, res) => {
        const surveys = await Survey.find({ _user: req.user }).select({ recipients: false });

        res.send(surveys);
    });

    app.get('/api/surveys/:surveyId/:choice', (req, res) => {
        res.send('Thanks for voting!');
    });

    app.post('/api/surveys/webhooks', (req, res) => {
        const p = new Path('/api/surveys/:surveyId/:choice'); //to extract surveyId and choice from the url

       _.chain(req.body)
            .map(({ email, url }) => {
                const match = p.test(new URL(url).pathname);//use pathname to extract only the route, without the domain
                if(match) {
                    return {email, surveyId: match.surveyId, choice: match.choice};
                }
            })
            .compact() //remove undefined elements of array
            .uniqBy('email', 'surveyId')
            .each(({ surveyId, email, choice }) => {
               Survey.updateOne(
                   {
                       _id: surveyId,
                       recipients: {
                            $elemMatch: {email: email, responded: false}
                        }
                    },
                   {
                       $inc: {[choice]: 1},
                       $set: {'recipients.$.responded': true},
                       lastResponded: new Date()
                    }
               ).exec()
            })
            .value();

    });

    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        const { title, subject, body, recipients } = req.body;

        const survey = new Survey({
            title, //ES6
            subject,
            body,
            recipients: recipients.split(',').map(email => ({ email: email.trim() })),
            _user: req.user.id,
            dateSent: Date.now()
        });

        const mailer = new Mailer(survey, surveyTemplate(survey));

        try {
            await mailer.send();
            await survey.save();
            req.user.credits -= 1;
            const user = await req.user.save();

            res.send(user);
        } catch(err) {
            res.status(422).send(err);
        }
    });
};