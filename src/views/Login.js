import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, setUser } from 'react-formio';
import { push } from 'connected-react-router';

const Login = class extends Component {
    render() {
        return (
            <Form src={'https://bczrqfsivlgdiqk.form.io/user/login'}
                onSubmit={(submission) => { debugger; }}
                onSubmitDone={this.props.onSubmitDone}
            />
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onSubmitDone: (submission) => {
            // debugger;
            dispatch(setUser(submission));
            dispatch(push('/'));
        }
    };
};

export default connect(null, mapDispatchToProps)(Login)
