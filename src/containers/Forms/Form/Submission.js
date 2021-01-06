import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SwitchButton from '../../../components/common/SwitchButton';
import FormioUtils from 'formiojs/utils';
import DataFetch from '../../../components/common/DataFetch';
import TableLib from '../../../components/common/TableLib';
import { push } from 'connected-react-router';
import {
  FormBuilder,
  Errors,
  resetForm,
  getForm,
  selectRoot,
  selectError,
  getSubmissions,
  getComponentDefaultColumn,
  resetSubmissions,
} from 'react-formio';
import './Submission.css';

export default ({ match }) => {
  const dispatch = useDispatch();
  const submissions = useSelector((state) => selectRoot('submissions', state));
  const form = useSelector((state) => selectRoot('form', state));
  const errors = useSelector((state) => selectError('submissions', state));
  const [subs, setCurrentSubs] = useState(null);
  const [columns, setColumns] = useState(null);
  const [submissionData, setSubmissionData] = useState(null);
  const [isChecked, setisChecked] = useState(false);
  // const [edit, setEdit] = useState(-1);
  // const [submissionData, setsubmissionData] = useState(columns);
  // let [editedData, setEditedData] = useState({});
  // const [alert, setAlert] = useState(false);

  // const handleDelete = (ind) => {
  //   var r = window.confirm('Are you sure you want to delete ?');
  //   if (r == true) {
  //     // console.log(submissionData)
  //     submissionData.splice(ind, 1);
  //     // console.log(submissionData)
  //     setSubmissionData([...submissionData]);
  //   }
  // };
  // const handleView = (ind) => {
  //   console.log('You have clicked Card View', ind);
  // };
  // const handleEdit = (ind) => {
  //   setEdit(ind);
  //   editedData = { ...submissionData[ind] };
  //   setEditedData({ ...editedData });
  // };
  // const handleCancel = (ind) => {
  //   setEdit(-1);
  // };
  // const handleSave = (ind) => {
  //   submissionData.splice(ind, 1, editedData);
  //   setSubmissionData(submissionData);
  //   setEdit(-1);
  //   setAlert(true);
  //   setTimeout(() => {
  //     setAlert(false);
  //   }, 5000);
  // };

  // const handleChange = (e, ind) => {
  //   editedData = { ...editedData, [e.target.id]: e.target.value };
  //   setEditedData({ ...editedData });
  // };

  const checkboxChange = () => {
    setisChecked(!isChecked);
  };
  useEffect(() => {
    return () => {
      dispatch(resetSubmissions());
    };
  });

  useEffect(() => {
    dispatch(getForm('form', match.params.formid));
    // dispatch(getSubmissions('submissions', 1, {}, match.params.formid));
  }, [dispatch]);

  useEffect(() => {
    if (form.id) {
      dispatch(getSubmissions('submissions', 1, {}, match.params.formid));
    }
  }, [form]);

  useEffect(() => {
    const cols = [];
    if (form && form.form) {
      FormioUtils.eachComponent(form.form.components, (component) => {
        if (component.input && component.tableView && component.key) {
          // cols.push(getComponentDefaultColumn(component));
          cols.push({
            Header: component.label,
            accessor: component.key,
          });
        }
      });
      setColumns(cols);
    }
  }, [form]);

  useEffect(() => {
    const tempSubmissionData = [];
    if (
      submissions &&
      submissions.submissions &&
      submissions.submissions.length > 0
    ) {
      // setCurrentForm(forms.forms.find(f => f._id === match.params.formid));
      //debugger;
      setCurrentSubs(submissions);
      submissions.submissions.map((i) => {
        tempSubmissionData.push(i.data);
      });
      setSubmissionData(tempSubmissionData);
    }
  }, [submissions]);

  const backToForm = () => {
    dispatch(push('/forms'));
};

  return (
    <div>
      <div className='back-btn' style={{marginBottom:'1rem'}}><i onClick={backToForm} class="fa fa-arrow-left" aria-hidden="true"></i></div>
      <Errors errors={errors} />
      <div style={{ display: 'flex', marginBottom: '2rem' }}>
        <div className='col-6' style={{ padding: 0 }}>
          Submissions of <b>{form.form.title}</b>.
        </div>
        <div className='col-6' style={{ padding: 0 }}>
          <SwitchButton
            inpLabel='Switch View'
            onChange={checkboxChange}
            checked={isChecked}
          />
        </div>
      </div>
      {/* <div>
                <pre>
                    {JSON.stringify(submissions.submissions, null, 3)}
                </pre>
            </div> */}
      {!isChecked ? (
        <div>
          {subs && columns && (
            <div id='submission-grid'>
              {/* <SubmissionGrid submissions={subs} form={form.form} /> */}
              <TableLib columns={columns} data={submissionData} form={form.form} submissions={submissions}/>
              {/* <table className='table table-bordered table-hover table-responsive'>
                <thead>
                  <tr>
                    {columns.map((data, index) => {
                      return (
                        <>
                          <th
                            className='align-middle p-3'
                            scope='col'
                            style={{}}
                          >
                            {data.header}
                          </th>
                        </>
                      );
                    })}
                    <th className='align-middle p-3'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {submissionData.map((x, index) => {
                    return (
                      <>
                        <tr>
                          {columns.map((data) => {
                            return (
                              <>
                                {edit == index ? (
                                  <td className='align-middle'>
                                    <input
                                      type='text'
                                      id={data.key}
                                      defaultValue={x[data.key]}
                                      onChange={(e) => handleChange(e, index)}
                                    ></input>
                                  </td>
                                ) : (
                                  <td>
                                    {x[data.key] ? x[data.key] + '' : 'NA'}
                                  </td>
                                )}
                              </>
                            );
                          })}
                          {edit != index ? (
                            <td>
                              <div justify-content='center'>
                                <button
                                  className='btn m-1 p-2 '
                                  onClick={() => handleView(index)}
                                  style={{
                                    borderRadius: '0px',
                                    backgroundColor: 'cadetblue',
                                    width: '77px',
                                    color: '#fff',
                                  }}
                                >
                                  <svg
                                    style={{
                                      fontSize: '20px',
                                      marginLeft: '5px',
                                      paddingRight: '5px',
                                    }}
                                    width='1em'
                                    height='1em'
                                    viewBox='0 0 16 16'
                                    class='bi bi-card-list'
                                    fill='currentColor'
                                    xmlns='http://www.w3.org/2000/svg'
                                  >
                                    <path
                                      fill-rule='evenodd'
                                      d='M14.5 3h-13a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z'
                                    />
                                    <path
                                      fill-rule='evenodd'
                                      d='M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8zm0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5z'
                                    />
                                    <circle cx='3.5' cy='5.5' r='.5' />
                                    <circle cx='3.5' cy='8' r='.5' />
                                    <circle cx='3.5' cy='10.5' r='.5' />
                                  </svg>
                                  View{' '}
                                </button>
                                <button
                                  className='btn m-1 p-2 '
                                  onClick={() => handleEdit(index)}
                                  style={{
                                    borderRadius: '0px',
                                    backgroundColor: 'peru',
                                    width: '77px',
                                    color: '#fff',
                                  }}
                                >
                                  <svg
                                    style={{
                                      fontSize: '20px',
                                      marginLeft: '5px',
                                      paddingRight: '5px',
                                    }}
                                    width='1em'
                                    height='1em'
                                    viewBox='0 0 16 16'
                                    class='bi bi-pencil-square'
                                    fill='currentColor'
                                    xmlns='http://www.w3.org/2000/svg'
                                  >
                                    <path d='M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z' />
                                    <path
                                      fill-rule='evenodd'
                                      d='M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z'
                                    />
                                  </svg>
                                  Edit{' '}
                                </button>
                                <button
                                  onClick={() => handleDelete(index)}
                                  className='btn m-1 '
                                  style={{
                                    backgroundColor: 'crimson',
                                    borderRadius: '0px',
                                    color: '#fff',
                                  }}
                                >
                                  <svg
                                    width='1em'
                                    height='1em'
                                    style={{
                                      fontSize: '20px',
                                      color: 'white',
                                    }}
                                    viewBox='0 0 16 16'
                                    className='bi bi-trash-fill '
                                    fill='currentColor'
                                    xmlns='http://www.w3.org/2000/svg'
                                  >
                                    <path
                                      fill-rule='evenodd'
                                      d='M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z'
                                    />
                                  </svg>
                                </button>
                              </div>
                            </td>
                          ) : (
                            <td>
                              <svg
                                width='1em'
                                style={{ fontSize: '25px' }}
                                onClick={() => handleCancel(index)}
                                height='1em'
                                viewBox='0 0 16 16'
                                className='bi bi-x'
                                fill='currentColor'
                                xmlns='http://www.w3.org/2000/svg'
                              >
                                <path
                                  fill-rule='evenodd'
                                  d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z'
                                />
                              </svg>
                              <svg
                                onClick={() => handleSave(index)}
                                data-toggle='modal'
                                data-target='#exampleModal'
                                data-dismiss='modal'
                                style={{ fontSize: '25px' }}
                                width='1em'
                                height='1em'
                                viewBox='0 0 16 16'
                                className='bi bi-check-circle'
                                fill='currentColor'
                                xmlns='http://www.w3.org/2000/svg'
                              >
                                <path
                                  fill-rule='evenodd'
                                  d='M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z'
                                />
                                <path
                                  fill-rule='evenodd'
                                  d='M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z'
                                />
                              </svg>
            {subs && columns && <div id='submission-grid'>
                <SubmissionGrid
                    onAction={(submission, action) => {
                        dispatch(push(`/form/${form.id}/submission/${submission._id}/${action}`));
                        console.log('submission - ', submission);
                        console.log('action- ', action);
                    }}
                    submissions={subs}
                    form={form.form}
                />
            </div>}
        </div>
    );
}



                              <div
                                className='modal fade'
                                id='exampleModal'
                                tabindex='-1'
                                role='dialog'
                                aria-labelledby='exampleModalLabel'
                                aria-hidden='true'
                              >
                                <div className='modal-dialog' role='document'>
                                  <div className='modal-content'>
                                    <div className='modal-body bg-success text-white'>
                                      Data Updated Successfully
                                      <button
                                        type='button'
                                        className='close text-white'
                                        data-dismiss='modal'
                                        aria-label='Close'
                                      >
                                        <span aria-hidden='true'>&times;</span>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </td>
                          )}
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table> */}
            </div>
          )}
        </div>
      ) : (
        <div>
          {subs &&
            columns &&
            submissionData.map((x, i) => (
              <DataFetch data={x} index={i} headerData={columns} />
            ))}
        </div>
      )}
    </div>
  );
};
