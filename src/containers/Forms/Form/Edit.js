import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  FormBuilder,
  Errors,
  resetForm,
  getForm,
  selectRoot,
  selectError,
  clearFormError,
} from 'react-formio';

export default ({ match }) => {
  const dispatch = useDispatch();

  const form = useSelector((state) => selectRoot('form', state));
  const errors = useSelector((state) => selectError('form', state));

  const [currentForm, setCurrentForm] = useState(null);

  useEffect(() => {
    if (!currentForm) {
      dispatch(getForm('form', match.params.formid));
      dispatch(clearFormError());
    }
  }, [dispatch]);

  useEffect(() => {
    if (form.id && form.form) {
      setCurrentForm(form.form);
      dispatch(resetForm());
    }
  }, [form]);

  const saveFormClicked = () => {};

  const formChange = (form) => {
    debugger;
  };

  return (
    <div>
      <Errors errors={errors} />
      <br />

      {currentForm && (
        <>
          <div className='row' style={{ marginBottom: '2.5rem' }}>
            <div className='col'>
              <div style={{ fontSize: '1.5rem' }}>{currentForm.title}</div>
            </div>
            <div className='col form-group'>
              <button
                className='float-right'
                style={{
                  // backgroundColor: '#002855', color: '#fff',
                  fontWeight: 'normal',
                  fontSize: '1rem',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '1.5rem',
                }}
                onClick={saveFormClicked}
              >
                Save Form
              </button>
            </div>
          </div>

          <FormBuilder form={currentForm} onChange={formChange} />
        </>
      )}
    </div>
  );
};
