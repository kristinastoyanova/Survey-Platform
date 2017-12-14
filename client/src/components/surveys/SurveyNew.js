//SurveyNew shows SurveyForm and SurveyFormReview
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {
    //constructor(props) {
    //    super(props);
    //
    //    this.state = {showFormReview: false};
    //}
    // => Using constructor method is equivalent to the following:

    state = { showFormReview: false }

    renderContent() {
        if(this.state.showFormReview) {
            return <SurveyFormReview
                        onCancel = { () => this.setState({ showFormReview: false }) }
                    />;
        }

        return <SurveyForm
                    onSurveySubmit = { () => this.setState({ showFormReview: true }) }
                />;
    }

    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        );
    }
}

//Added to clear form inputs when the user navigate out of SurveyNew component
// which is default behavior, but when user navigate between SurveyForm and SurveyFormReview we don't want this
export default reduxForm({
    form: 'surveyForm'
})(SurveyNew);