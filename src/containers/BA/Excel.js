import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveForm, selectRoot, FormBuilder } from 'react-formio';
import camelCase from 'lodash/camelCase';
import XLSX from 'xlsx';
import './Excel.scss';

const defaultObj = {
  formName: '',
  department: '',
  description: '',
  reference: '',
  formId: '',
};

const createTabObj = (name, components) => {
  let label = '',
    key = '';

  switch (name) {
    case 'First':
      label = 'Tab 1';
      key = 'tab1';
      break;
    case 'Second':
      label = 'Tab 2';
      key = 'tab2';
      break;
    case 'Third':
      label = 'Tab 3';
      key = 'tab3';
      break;
    case 'Fourth':
      label = 'Tab 4';
      key = 'tab4';
      break;
    default:
      label = '';
      key = '';
      break;
  }

  return {
    label,
    key,
    components,
  };
};

export default () => {
  const dispatch = useDispatch();

  const auth = useSelector((state) => selectRoot('auth', state));

  const [formDetails, setFormDetails] = useState(defaultObj);
  const [createdForm, setCreatedForm] = useState(null);
  const [isFormCreated, setIsFormCreated] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);
  const [excelData, setExcelData] = useState(null);
  const [formComponents, setFormComponents] = useState([]);

  useEffect(() => {
    if (excelData) {
      const newObj = excelData.reduce((accum, item) => {
        const tabName = item.tabs || 'Outer';

        if (!accum[tabName]) {
          accum[tabName] = [];
        }
        accum[tabName].push(item);

        return accum;
      }, {});

      const tabs = [];
      let outerComps = [];

      const arrangeToColumns = (key, arr) => {
        const resultComp = [],
          leftColumn = [],
          rightColumn = [];

        arr.forEach((element, index) => {
          const field = determineField(key + (index + 1), element);

          if (index % 2 === 0) {
            leftColumn.push(field);
          } else {
            rightColumn.push(field);
          }
        });

        resultComp.push({
          type: 'columns',
          label: 'Columns',
          columns: [
            {
              components: leftColumn,
              width: 6,
              offset: 0,
              push: 0,
              pull: 0,
              size: 'md',
            },
            {
              components: rightColumn,
              width: 6,
              offset: 0,
              push: 0,
              pull: 0,
              size: 'md',
            },
          ],
          key: 'columns',
          input: false,
          tableView: false,
        });

        return resultComp;
      };

      for (const key in newObj) {
        const components = arrangeToColumns(key, newObj[key]);

        if (key === 'Outer') {
          outerComps = [...components];
        } else {
          const tabObj = createTabObj(key, components);

          tabs.push(tabObj);
        }
      }

      if (tabs.length > 0) {
        outerComps.push({
          type: 'tabs',
          key: 'tabs1',
          Label: 'Tabs',
          input: false,
          components: tabs,
        });
      }

      outerComps.push({
        type: 'button',
        id: 'btnSubmit',
        key: 'submit',
        label: 'Submit',
        labelPosition: 'top',
      });

      setFormComponents(outerComps);
    }
  }, [excelData]);

  const determineField = (uniqueID, element) => {
    let field = {};

    const { type, name, values, placeholder, orientation } = element;
    let fieldValues = [];

    switch (type) {
      case 'TextField':
        field = {
          type: 'textfield',
          id: 'txt' + uniqueID,
          key: 'textField' + uniqueID,
          label: name || 'textField' + uniqueID,
          labelPosition: 'top',
          placeholder: placeholder,
          tableView: true,
        };
        break;

      case 'TextArea':
        field = {
          type: 'textarea',
          id: 'txtArea' + uniqueID,
          key: 'txtArea' + uniqueID,
          label: name || 'txtArea' + uniqueID,
          labelPosition: 'top',
          placeholder: placeholder,
          tableView: true,
        };
        break;

      case 'Number':
        field = {
          type: 'number',
          id: 'lblNum' + uniqueID,
          key: 'number' + uniqueID,
          label: name || 'number' + uniqueID,
          labelPosition: 'top',
          placeholder: placeholder,
          tableView: true,
        };
        break;

      case 'Password':
        field = {
          type: 'password',
          id: 'lblPwd' + uniqueID,
          key: 'pwd' + uniqueID,
          label: name || 'pwd' + uniqueID,
          labelPosition: 'top',
          placeholder: placeholder,
          tableView: true,
        };
        break;

      case 'Checkbox':
        field = {
          type: 'checkbox',
          id: 'lblChk' + uniqueID,
          key: 'chk' + uniqueID,
          label: name || 'chk' + uniqueID,
          value: values,
          labelPosition: 'top',
          placeholder: placeholder,
          tableView: true,
        };
        break;

      case 'Button':
        field = {
          type: 'button',
          id: 'btn' + uniqueID,
          key: 'btn' + uniqueID,
          label: name || 'btn' + uniqueID,
          labelPosition: 'top',
          placeholder: placeholder,
        };
        break;

      case 'Select':
        fieldValues = [{ label: '', value: '' }];

        if (values !== '') {
          fieldValues = values.split('#').map((val) => ({
            label: val,
            value: val,
            shortcut: '',
          }));
        }

        field = {
          type: 'select',
          data: {
            json: '',
            url: '',
            resource: '',
            custom: '',
            values: fieldValues,
          },
          id: 'Select' + uniqueID,
          key: 'Select' + uniqueID,
          label: name || 'Select' + uniqueID,
          labelPosition: 'top',
          placeholder: placeholder,
          inline: true,
          tableView: true,
        };

        if (orientation === 'Vertical') {
          field.inline = false;
        }

        break;

      case 'SelectBoxes':
        fieldValues = [{ label: '', value: '' }];

        if (values) {
          fieldValues = values.split('#').map((val) => ({
            label: val,
            value: val,
          }));
        }

        field = {
          type: 'selectboxes',
          values: fieldValues,
          id: 'SelectBox' + uniqueID,
          key: 'SelectBox' + uniqueID,
          label: name || 'SelectBox' + uniqueID,
          labelPosition: 'top',
          placeholder: placeholder,
          inline: true,
          tableView: true,
        };

        if (orientation === 'Vertical') {
          field.inline = false;
        }

        break;

      case 'Radio':
        fieldValues = { label: 'radio 1', value: 'radio1', shortcut: '' };

        if (values !== '') {
          fieldValues = values.split('#').map((val) => ({
            label: val,
            value: val,
            shortcut: '',
          }));
        }

        field = {
          type: 'radio',
          values: fieldValues,
          id: 'radio' + uniqueID,
          key: 'radioButtons' + uniqueID,
          label: name || 'radioButtons' + uniqueID,
          labelPosition: 'top',
          inline: true,
          tableView: true,
        };

        if (orientation === 'Vertical') {
          field.inline = false;
        }

        break;
      default:
        break;
    }

    return field;
  };

  const onChange = (e) => {
    const { name, value } = e.target;

    setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };

  const onFileChanged = (e) => {
    const files = e.target.files;
    if (files && files[0]) setSelectedFile(files[0]);
  };

  const onUploadClicked = () => {
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;

    reader.onload = (e) => {
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, {
        type: rABS ? 'binary' : 'array',
        bookVBA: true,
      });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws, {
        blankrows: false,
        defval: '',
      });

      setExcelData(data);
    };

    if (rABS) {
      reader.readAsBinaryString(selectedFile);
    } else {
      reader.readAsArrayBuffer(selectedFile);
    }
  };

  const createFormClicked = () => {
    setIsFormCreated(false);
    setCreatedForm(null);

    const { formName } = formDetails;

    const authenticatedId = auth.roles.authenticated._id;

    const newForm = {
      display: 'form',
      components: formComponents,
      title: formName,
      name: camelCase(formName),
      path: camelCase(formName).toLowerCase(),
      tags: ['common', 'excelToForm'],
      submissionAccess: [
        { type: 'read_all', roles: [authenticatedId] },
        { type: 'update_all', roles: [authenticatedId] },
        { type: 'delete_all', roles: [authenticatedId] },
      ],
      access: [
        { type: 'delete_all', roles: [authenticatedId] },
        { type: 'update_all', roles: [authenticatedId] },
      ],
    };

    dispatch(
      saveForm('form', newForm, (err, form) => {
        if (err) {
          console.log(err);
        } else {
          setCreatedForm(form);
          setIsFormCreated(true);
        }
      })
    );
  };

  const createNewFormClicked = () => {
    setIsFormCreated(false);
    setCreatedForm(null);
  };

  const saveFormClicked = () => {};

  const isFormValid = excelData && formDetails.formName;

  return (
    <div style={{ color: 'rgb(0, 40, 85)' }}>
      <h2
        style={{
          fontWeight: 'normal',
          color: '#002855',
          fontSize: '2.5vw',
          marginBottom: '2.5vw',
          textAlign: 'center',
        }}
      >
        Create Form using Excel
      </h2>
      <div className='wrapper-div'>
        <p style={{ textAlign: 'right' }}>
          <button className='download-btn'>
            <i className='fa fa-download'></i>
            <a
              href='files/ToCreateForm.xlsx'
              download
              title='Click here to download the Excel template'
            >
              Download Template here
            </a>
          </button>
        </p>

        {!isFormCreated && (
          <Fragment>
            <div className='row'>
              <div className='col-4 form-group text-right'>
                <label htmlFor='formName'>Form Name</label>
              </div>
              <div className='col-6 form-group'>
                <input
                  type='text'
                  className='form-control'
                  id='formName'
                  name='formName'
                  placeholder='Enter Form Name'
                  onChange={onChange}
                  value={formDetails.formName}
                />
              </div>
            </div>
            <div className='row'>
              <div className='col-4 form-group text-right'>
                <label htmlFor='dept'>Department</label>
              </div>
              <div className='col-6 form-group'>
                <input
                  type='text'
                  className='form-control'
                  id='dept'
                  name='department'
                  placeholder='Enter Department'
                  value={formDetails.department}
                  onChange={onChange}
                />
              </div>
            </div>

            <div className='row'>
              <div className='col-4 form-group text-right'>
                <label htmlFor='formDesc'>Description</label>
              </div>
              <div className='col-6 form-group'>
                <input
                  type='text'
                  className='form-control'
                  id='formDesc'
                  name='description'
                  placeholder='Enter Form Description'
                  value={formDetails.description}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className='row'>
              <div className='col-4 form-group text-right'>
                <label htmlFor='refer'>Reference</label>
              </div>
              <div className='col-6 form-group'>
                <input
                  type='text'
                  className='form-control'
                  id='refer'
                  name='reference'
                  placeholder='Enter Reference'
                  value={formDetails.reference}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className='row'>
              <div className='col-4 form-group text-right'>
                <label htmlFor='file'> Upload Excel </label>
              </div>
              <div className='col-6 form-group'>
                <input
                  type='file'
                  className='form-control'
                  id='file'
                  accept='.xlsx,.xls'
                  onChange={onFileChanged}
                />

                <div className='col form-group'>
                  <button
                    style={{ marginTop: '1.8rem' }}
                    onClick={onUploadClicked}
                  >
                    Upload
                  </button>
                </div>
              </div>
            </div>

            <br />
            <div className='row text-right'>
              <div className='col form-group'>
                <button
                  style={{
                    backgroundColor: !isFormValid ? '' : '#002855',
                    color: !isFormValid ? '' : '#fff',
                    fontWeight: 'normal',
                    fontSize: '1rem',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '1.5rem',
                  }}
                  disabled={!isFormValid}
                  onClick={createFormClicked}
                >
                  Create Form
                </button>
              </div>
            </div>
          </Fragment>
        )}
      </div>

      {isFormCreated && (
        <div className='row'>
          <div className='col'>
            <div style={{ fontSize: '1.2rem' }}>
              Form Created Successfully...
            </div>
            <div style={{ fontSize: '0.8rem' }}>
              Please make changes (if any) to the Form below.
            </div>
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
              onClick={createNewFormClicked}
            >
              Create New Form
            </button>
          </div>
        </div>
      )}

      {isFormCreated && createdForm && (
        <Fragment>
          <div
            className='row'
            style={{ marginTop: '2rem', marginBottom: '2rem' }}
          >
            <div className='col'>
              <div style={{ fontSize: '1.6rem' }}>{createdForm.title}</div>
            </div>
            <div className='col form-group'>
              <button
                className='float-right'
                style={{
                  backgroundColor: '#002855',
                  color: '#fff',
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
          <br />
          <FormBuilder form={createdForm} />
        </Fragment>
      )}
    </div>
  );
};
