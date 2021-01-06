import React, { useState } from 'react';
import { FormBuilder, saveForm } from 'react-formio';
import { useDispatch } from 'react-redux';
import FormFields from './FormFields';

const defaultObj = {
    formId: '',
    formName: '',
    formType: null,
    department: '',
    description: '',
    reference: '',
    subDept: '',
};

export default () => {
    const dispatch = useDispatch();

    const [currentForm, setCurrentForm] = useState({ display: 'form' });
    const [formDetails, setFormDetails] = useState(defaultObj);

    const saveFormClicked = (form) => {
        dispatch(saveForm('form', form, (err, f) => {
            if (err) {
                console.log(err);
            } else {
                // setCreatedForm(f);
                // setIsFormCreated(true);
            }
        }));
    };

    const formFieldsChanged = (key, value) => {
        setFormDetails({
            ...formDetails,
            [key]: value,
        });

        if (key === 'formType') {
            setCurrentForm({
                ...currentForm,
                display: value,
            });
        }
    };

    const formChanged = (form) => {
        setCurrentForm(form);
    };

    return (
        <div>
            <h2 style={{
                fontWeight: 'normal', color: '#002855', fontSize: '2.5vw',
                marginBottom: '2.5vw', textAlign: 'center'
            }}>
                Create new Form
            </h2>

            <FormFields formFieldsChanged={formFieldsChanged} formDetails={formDetails} />
            <br />

            <FormBuilder form={currentForm} onChange={formChanged} />
            {/* <FormEdit
        form={{ display: 'form' }}
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
                saveForm={saveFormClicked}
            /> */}
        </div>
    )
};
