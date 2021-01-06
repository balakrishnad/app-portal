import React, { useState } from 'react';
import { FormEdit, saveForm, FormBuilder } from 'react-formio';
import { useDispatch } from 'react-redux';
import FormFields from './FormFields';

export default () => {
    const dispatch = useDispatch();

    const [currentForm, setCurrentForm] = useState({ display: 'pdf' });

    const saveFormClicked = (form) => {
        debugger;

        dispatch(saveForm('form', form, (err, f) => {
            if (err) {
                console.log(err);
            } else {
                // setCreatedForm(f);
                // setIsFormCreated(true);
            }
        }));
    };
    
    const changeFormType = () => {
        setCurrentForm({ display: 'wizard' });
    };

    return (
        <div>
            <h2 style={{
                fontWeight: 'normal', color: '#002855', fontSize: '2.5vw',
                marginBottom: '2.5vw', textAlign: 'center'
            }}>
                Create new PDF Form
            </h2>
            
            <button className='float-right'
                style={{
                    backgroundColor: '#002855', color: '#fff',
                    fontWeight: 'normal', fontSize: '1rem',
                    padding: '0.5rem 0.75rem', borderRadius: '1.5rem'
                }}
                onClick={changeFormType}>
                Change
            </button>

            <br />
            <br />
            <br />

            <FormFields type='pdf' />
            {/* <FormBuilder form={currentForm} onChange={() => { }} /> */}
            <br />
            <br />

            <FormEdit
                form={currentForm}
                saveText={'Save PDF Form'}
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
            />
        </div>
    )
};