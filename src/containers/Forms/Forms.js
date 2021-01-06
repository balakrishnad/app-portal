import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectRoot, indexForms } from 'react-formio';
import Card from '../../components/common/Card';
import { deleteFormIoForm } from '../../utils/formioUtils';
import { push } from 'connected-react-router';
// import './Forms.scss';
export default () => {
  const dispatch = useDispatch();
  const forms = useSelector((state) => selectRoot('forms', state));
  const auth = useSelector((state) => selectRoot('auth', state));
  // useEffect(() => {
  //     // this lines fetches all the forms associated to the formio project.
  //     dispatch(indexForms('forms', 1, { limit: 999999 }))
  // }, [dispatch]);
  const [canDelete, setCanDelete] = useState(false);
  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = (err) => {
    dispatch(indexForms('forms', 1, { limit: 999999 }));

    if (err) {
      alert(err);
    }
  };

  const deleteFormClicked = (id) => {
    alert('called from card');
    // deleteFormIoForm(dispatch, form._id, fetchForms);
    dispatch(push(`/form/${id}/delete`));
  };

  const checkRoleForDelete = (form) => {
    if (form && auth && auth.user) {
      const roleToCheck = auth.roles.authenticated._id;

      if (auth.user.roles.includes(roleToCheck)) {
        const acc = form.access.filter((f) =>
          ['delete_all', 'delete_own'].includes(f.type)
        );
        if (acc) {
          return acc.find((r) => r.roles.includes(roleToCheck));
        }

        // const subAcc = form.submissionAccess.find(f => f.type === 'delete_own')
        // if (subAcc) {
        //     return subAcc.roles.includes(roleToCheck);
        // }
        // debugger;
      }
    }
    return false;
  };

  const onCardClicked = (id) => {
    dispatch(push(`/form/${id}`));
  };

  const onShowSubClick = (id) => {
    debugger;
    dispatch(push(`/form/${id}/submission`));
  };

  const onEditClick = (id) => {
    debugger;
    dispatch(push(`/form/${id}/edit`));
  };

  const onPopoutClicked = (id) => {
    window.open(`#/form/${id}`, '_blank');
  };

  return (
    <div>
      <h4>
        {' '}
        <b>Forms</b>{' '}
      </h4>

      {!forms.forms.length ? (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
          }}
        >
          <div className='bg-image'></div>

          <div
            className='spinner-border text-primary'
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
            }}
          ></div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {forms.forms.map(
            (form) => (
              <Card
                data={form}
                onDetailsClick={onCardClicked}
                onDeleteClick={deleteFormClicked}
                showDeleteForm={checkRoleForDelete(form)}
                onShowSubClick={onShowSubClick}
                onEditClick={onEditClick}
                showSubmission
                showEditForm
                showPopout
                onPopoutClicked={onPopoutClicked}
              />
            )
            /* <div className='card bg-col mb-3 height100'>
                            <div className='card-header'>
                                <span className='tooltip' style={{ fontSize: '0.8rem', float: 'left', marginRight: '0.5rem' }}>
                                    Created on: {(new Date(form.created)).toLocaleDateString()}
                                    <div className='tooltipTop'>
                                        <div className='tooltipArrow'></div>
                                        <div className='tooltipDate'>
                                            Created on:{(new Date(form.created)).toLocaleDateString()}
                                        </div>
                                    </div> 
                                </span>
                                <span className='test'></span>
                                <ExternalLinkIcon style={{ height: '1rem', width: '1rem', fill: '#fff', cursor: 'pointer', margin: '0 .5rem', float: 'right' }} />
                            </div>
                            <div className='card-body'>
                                <p className='card-text'>

                                    <div style={{ fontSize: '1.25rem', paddingTop: '1rem' }}>{form.title}</div>
                                </p>
                            </div>
                            <div className='card-footer bg-transparent'>
                                <ShowIcon style={{ height: '1.5rem', width: '1.5rem', fill: '#002855', cursor: 'pointer', margin: '0 .5rem' }} />
                                <EditIcon style={{ height: '1rem', width: '1rem', fill: '#002855', cursor: 'pointer', margin: '0 .5rem' }} />
                                {checkRoleForDelete(form) &&
                                    <DeleteIcon style={{ height: '1.3rem', width: '1.3rem', fill: '#002855', cursor: 'pointer', margin: '0 .5rem' }} onClick={() => deleteFormClicked(form._id)} />
                                }
                            </div>
                        </div> */
          )}
        </div>
      )}
    </div>
  );
};
