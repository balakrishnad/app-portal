import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Form, Errors, getSubmission,
    getForm, selectRoot, selectError, clearFormError
} from 'react-formio';

export default ({ match }) => {
    const dispatch = useDispatch();

    const forms = useSelector(state => selectRoot('forms', state));

    const errors = useSelector(state => ([
        selectError('form', state),
        selectError('submissions', state),
    ]));

    const [currentForm, setCurrentForm] = useState(null);
    const [curSubObj, setCurSubObj] = useState(null);
    const [isFormDisabled, setIsFormDisabled] = useState(false);

    useEffect(() => {
        return () => {
            dispatch(clearFormError());
        };
    }, []);

    useEffect(() => {
        const { formid, submissionid } = match.params;
        if (forms && forms.forms && forms.forms.length === 0) {
            dispatch(getForm('form', formid, (err, res) => {
                if (!err && res) {
                    setCurrentForm(res);
                }
            }));
            // dispatch(clearFormError());
        }

        if (submissionid) {
            setIsFormDisabled(match.url.includes('/view'));
            dispatch(getSubmission('submission', submissionid, formid, (err, subObj) => {
                if (!err) {
                    setCurSubObj(subObj);
                }
            }));
        } else {
            setCurSubObj(null);
            setIsFormDisabled(false);
        }

        // dispatch(getSubmissions('submissions', 1, {}, match.params.formid, (err, res) => {
        //     if (!err && res) {
        //         // setCurrentSubmissions()
        //         debugger;
        //     }
        // }))
    }, [dispatch]);

    useEffect(() => {
        if (forms && forms.forms && forms.forms.length > 0) {
            setCurrentForm(forms.forms.find(f => f._id === match.params.formid));
        }
    }, [forms]);

    return (
        <div>
            <Errors errors={errors} />

            {currentForm &&
                <>
                    <div className='row' style={{ marginBottom: '2.5rem' }}>
                        <div className='col'>
                            <div style={{ fontSize: '1.5rem' }}>{currentForm.title}</div>
                        </div>
                    </div>

                    <Form
                        form={currentForm}
                        submission={curSubObj}
                        options={{
                            readOnly: isFormDisabled,
                        }}
                    />
                </>
            }
        </div>
    );
}