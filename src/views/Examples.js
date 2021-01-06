import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import {
    selectRoot, getForm, indexForms, FormGrid, saveSubmission,
    Form, saveForm, FormEdit, FormBuilder, SubmissionGrid, getSubmissions, getSubmission
} from "react-formio";

import _ from 'lodash';

const Home = class extends Component {
    static propTypes = {
        auth: PropTypes.object,
        flusForm: PropTypes.object
    };

    constructor(props) {
        super(props);

        this.state = {
            geolocation: null,

            isFormCreated: false,
        };
    }

    componentDidMount() {
        // console.log('componentDidMount');
        this.props.getForms();
        this.props.getForm();
        this.props.getFlusForm();

        // this.props.getSubmissions();

        // this.props.getSubmissionByID();

        // if ('geolocation' in navigator) {
        //     navigator.geolocation.getCurrentPosition(position => {
        //         // console.log("Latitude is :", position.coords.latitude);
        //         // console.log("Longitude is :", position.coords.longitude);

        //         this.setState({
        //             geolocation: {
        //                 long: position.coords.longitude,
        //                 lat: position.coords.latitude
        //             }
        //         });
        //     });
        // }
    }

    static getDerivedStateFromProps(nextProps, state) {
        if (nextProps.forms.forms.length > 0) {
            // console.log('getDerivedStateFromProps');
            // console.log(nextProps.forms.forms);

            return {
                forms: nextProps.forms.forms
            };
        }

        return null;
    }

    componentDidUpdate(nextProps, state) {
        if (state.forms && state.forms.length > 0) {
            // console.log('componentDidUpdate');
            // console.log(nextProps.forms.forms);
        }
    }

    render() {
        const { flusForm, form, forms, flus, submissions, submissionById, auth } = this.props;
        // console.trace('flus', flus);
        // console.trace('flusForm', flusForm);
        // console.trace('form', form);

        // console.trace('auth', auth);
        // console.trace('submissionById', submissionById);

        return (
            <div>
                <h3> Forms </h3>

                {/* <p> {JSON.stringify(form)}  </p> */}
                {/* <p> {JSON.stringify(forms)}  </p> */}
                <br />
                <br />

                {/* <SubmissionGrid
                    submissions={submissions}
                    form={flus.form}
                /> */}

                {/* <FormGrid forms={forms} /> */}
                {/* <div style={{ border: '1px solid red'  }}>
                    <h1> {flus.form.title} </h1>
                    <button> Update Form </button>
                </div>
                <br />
                <FormBuilder
                    form={flus.form}
                    onChange={(schema) => {
                        debugger;
                        console.log(schema)
                    }}
                    onSaveComponent={(s) => {
                        // alert('save component');
                    }}
                /> */}

                {/* <FormEdit
                    form={{ display: 'form' }}
                    // form={flus.form}
                    saveText={'Save Form'}
                    // options={{
                    //     inputsOnly: false,
                    //     hooks: {
                    //         beforeSubmit: (submission, next) => {
                    //             debugger;

                    //             next([{ message: 'beforeSubmit - next error' }]);
                    //         },
                    //         beforeNext: (currentPage, submission, next) => {
                    //             debugger;

                    //             next([{ message: 'beforeNext - next error' }]);
                    //         }
                    //     }
                    // }}
                    saveForm={this.props.saveForm}
                /> */}

                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {forms.forms.map(f => {
                        return <div style={{
                            height: '7rem', flex: '0 0 25%',
                            margin: '1rem', borderRadius: '5%',
                            backgroundColor: 'rgb(41, 157, 175)',
                            textAlign: 'center', color: '#fff',
                            fontSize: '1.25rem', fontWeight: 'bold',
                            paddingTop: '2rem'
                        }}>
                            {f.title}
                        </div>
                    })}
                </div>
                <br /><br />
                {/* <Form
                        form={flus.form}
                        onSubmit={(submission) => {
                            // debugger;
                            // console.trace('onSubmit' + submission);
                        }}
                        onChange={(submission) => {
                            // debugger;
                            // console.trace('onChange' + submission);
                        }}
                        onError={(errors) => {
                            // debugger;
                            // console.trace('onError' + errors);
                        }}
                        // submission={submissionById.submission}
                        options={{
                            // readOnly: true,
                            // noAlerts: true,
                            inputsOnly: false,

                            evalContext: {
                                testGlobal: function (input) {
                                    debugger;
                                    return 'test 1212121 - ' + input;
                                }
                            }
                        }}

                    /> */}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    // debugger
    return {
        auth: selectRoot('auth', state),
        flusForm: selectRoot('flusForm', state),
        form: selectRoot('form', state),
        forms: selectRoot('forms', state),

        flus: selectRoot('form', selectRoot('flus', state)),

        // title: selectRoot('form', selectRoot('title', state)),

        submissions: selectRoot('submissions', selectRoot('flus', state)),
        submissionById: selectRoot('submission', selectRoot('flus', state)),
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    // debugger;
    return {
        // getFlusForm: () => dispatch(getForm('form', '5ea192f60935e25843a100cc')),
        getFlusForm: () => dispatch(getForm('form', '5ebd444a251b9e0e7437bbb1')),
        getForm: () => dispatch(getForm('flus')),
        getForms: (page = 1, query = {}) => dispatch(indexForms('forms', page, { limit: 999999 })),

        // saveSubmission: () => dispatch(saveSubmission('' )),

        getFormByPath: (path) => dispatch(getForm(path)),

        saveForm: (form, cb) => {
            // debugger;
            const newForm = {
                ...form,
                tags: ['common', 'byBA'],
            };

            dispatch(saveForm('form', newForm, (err, form) => {
                if (!err) {
                    debugger;
                    //   dispatch(push(`/form/${form._id}`))
                }
                debugger;
                console.trace(form);

                cb();
                // dispatch(getForm(newForm.path));
            }))
        },

        getSubmissions: (page, query) => dispatch(getSubmissions('flus', page, query)),
        getSubmissionByID: () => dispatch(getSubmission('flus', '5ebbcf6b6606bea903d9642e', null, { limit: 99999 }))
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)
