import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import { auth, form, forms, submission, submissions } from 'react-formio';

export default (history) => combineReducers({
    router: connectRouter(history),
    auth: auth(),
    form: form({ name: 'form' }),
    forms: forms({ name: 'forms', query: { type: 'form' } }),
    submission: submission({ name: 'submission' }),
    submissions: submissions({ name: 'submissions' }),
})
