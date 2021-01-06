import React, { useState } from 'react';
import {useTable, useFilters, useGlobalFilter, useAsyncDebounce, useSortBy} from 'react-table';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { FormGrid, indexForms, selectRoot, selectError, Errors } from 'react-formio';

export default ({ columns, data, form})=> { 
  const dispatch = useDispatch();
  const submissions = useSelector((state) => selectRoot('submissions', state));
  //const forms = useSelector(state => selectRoot('forms', state));
  //const errors = useSelector(state => selectError('forms', state));
  // Define a default UI for filtering
const GlobalFilter = ({preGlobalFilteredRows, globalFilter, setGlobalFilter,}) => {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <span>
      Search:{' '}
      <input
        className='form-control'
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
      />
    </span>
  );
}

const DefaultColumnFilter = ({column: { filterValue, preFilteredRows, setFilter },}) => {
  const count = preFilteredRows.length;
  return (
    <input
      className='form-control'
      value={filterValue || ''}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
      placeholder={`Search ${count} records...`}
    />
  );
}
const handleView = (form, submissions, i) => {
  //debugger;
  console.log(submissions.submissions[i])
  dispatch(push(`/form/${form._id}/submission/${submissions.submissions[i]._id}/view`));
};
const handleEdit =  (form, submissions, i) => {
  //debugger;
  dispatch(push(`/form/${form._id}/submission/${submissions.submissions[i]._id}/edit`));
};

const Table = ({ columns, rowData }) =>{
  const [data, setData] = useState(rowData);
  const handleDelete = (ind) => {
    data.splice(ind, 1);
    setData([...data]);
  };
  const defaultColumn = React.useMemo(
    () => ({
      // Default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useFilters,
    useGlobalFilter,
    useSortBy
  );

  return (
    <div>
      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <table
        className='table table-bordered table-hover table-responsive'
        {...getTableProps()}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              <th className='align-middle p-3'>Actions</th>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  {column.render('Header')}
                  <span className='sort' {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {/* {column.isSorted ? ( */}
                      {column.isSortedDesc ? (
                        <i class='fa fa-caret-down' aria-hidden='true'></i>
                      ) : (
                        <i class='fa fa-caret-up' aria-hidden='true'></i>
                      )}                    
                  </span>
                  
                  {/* Render the columns filter UI */}
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
                  
                </th>
              ))}
              
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                 <td>
                  <div className='d-flex' justify-content='center'>
                    <button
                      className='btn m-1 p-2 '
                      onClick={() => handleView(form, submissions, i)}
                      style={{
                        borderRadius: '0px',
                        backgroundColor: 'cadetblue',
                        color: 'white',
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
                      {' '}
                    </button>
                    <button
                      className='btn m-1 p-2 '
                      onClick={() => handleEdit (form, submissions, i)}
                      style={{
                        borderRadius: '0px',
                        backgroundColor: 'peru',
                        color: 'white',
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
                      {' '}
                    </button>
                    <button
                      className='btn m-1 '
                      style={{
                        backgroundColor: 'crimson',
                        borderRadius: '0px',
                      }}
                      data-toggle='modal'
                      data-target='#exampleModalCenter'
                    >
                      <svg
                        width='1em'
                        height='1em'
                        style={{ fontSize: '15px', color: 'white' }}
                        viewBox='0 0 16 16'
                        className='bi bi-trash'
                        fill='currentColor'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          fill-rule='evenodd'
                          d='M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z'
                        />
                      </svg>

                      <div
                        class='modal fade delete-model'
                        id='exampleModalCenter'
                        tabindex='-1'
                        role='dialog'
                        aria-labelledby='exampleModalCenterTitle'
                        aria-hidden='true'
                      >
                        <div
                          class='modal-dialog modal-dialog-centered'
                          role='document'
                        >
                          <div class='modal-content'>
                            <div class='modal-header'>
                              <h5
                                class='modal-title'
                                id='exampleModalLongTitle'
                              >
                                Delete
                              </h5>
                              <button
                                type='button'
                                class='close'
                                data-dismiss='modal'
                                aria-label='Close'
                              >
                                <span aria-hidden='true'>&times;</span>
                              </button>
                            </div>
                            <div class='modal-body'>
                              Are you sure you want to delete ?
                            </div>
                            <div class='modal-footer'>
                              <button
                                type='button'
                                class='btn btn-secondary'
                                data-dismiss='modal'
                              >
                                Close
                              </button>
                              <button
                                type='button'
                                class='btn btn-primary'
                                onClick={() => handleDelete(i)}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </button>
                  </div>
                </td>
              
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
               </tr>
            );
          })}
        </tbody>
      </table>
      <br />
    </div>
  );
}
  return <Table columns={columns} rowData={data} />;
}


