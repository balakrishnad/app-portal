import React, { useEffect } from 'react';
import './DataFetch.css';

const DataFetch = ({ data, index, headerData }) => {
  function viewMore(e, index) {
    console.log(index);

    if (
      document
        .querySelectorAll('.text')
        [index].classList.contains('show-more-height')
    ) {
      document.querySelectorAll('.show-more')[index].textContent = 'View Less';
    } else {
      document.querySelectorAll('.show-more')[index].textContent = 'View More';
    }

    document
      .querySelectorAll('.text')
      [index].classList.toggle('show-more-height');
  }

  return (
    <div className='d-flex justify-content-center' key={index}>
      <div className='card my-2 '>
        <div className='card-body '>
          <div id='profile-description'>
            <div className='text show-more-height'>
              <div className='row '>
                <div className='col-xl-10 col-lg-10 col-md-10 col-sm-10 col-xs-10 '>
                  <div className='row'>
                    {headerData.map((x, i) => {
                      return (
                        <div className='col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3'>
                          <p className='title'>{x.Header}</p>

                          {Object.keys(data).includes(x.accessor) ? (
                            <p className='value'>{data[x.accessor]}</p>
                          ) : (
                            <p className='value'>NA</p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className='col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2'>
                  <button
                    className='btn m-1 p-2 '
                    // onClick={() => handleView(index)}
                    style={{
                      borderRadius: '0px',
                      backgroundColor: 'cadetblue',
                      // width: '77px',
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
                    {/* View{' '} */}
                  </button>
                  <button
                    className='btn m-1 p-2 '
                    // onClick={() => handleEdit(index)}
                    style={{
                      borderRadius: '0px',
                      backgroundColor: 'peru',
                      // width: '77px',
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
                    {/* Edit{' '} */}
                  </button>
                  <button
                    // onClick={() => handleDelete(index)}
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
                        fontSize: '15px',
                        color: 'white',
                      }}
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
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className=' d-flex justify-content-center m-2'>
          <button
            key={2}
            id='show'
            className='show-more btn btn-warning '
            onClick={(e) => viewMore(e, index)}
          >
            View More
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataFetch;
