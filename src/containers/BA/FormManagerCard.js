import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectRoot, indexForms } from "react-formio";

import { ShowIcon, DeleteIcon, EditIcon, ExternalLinkIcon } from "../../components/common/SVG"

import { deleteFormIoForm } from '../../utils/formioUtils';
import { push } from 'connected-react-router';

export default () => {
    const dispatch = useDispatch();
    const forms = useSelector(state => selectRoot('forms', state));
    const auth = useSelector(state => selectRoot('auth', state));

    // useEffect(() => {
    //     // this lines fetches all the forms associated to the formio project.
    //     dispatch(indexForms('forms', 1, { limit: 999999 }))
    // }, [dispatch]);

    useEffect(() => {
        fetchForms();
    }, []);

    const fetchForms = (err) => {
        dispatch(indexForms('forms', 1, { limit: 999999 }));

        if (err) {
            alert(err);
        }
    };

    // const deleteFormClicked = (e, id) => {
    //     deleteFormIoForm(dispatch, id, fetchForms);
    // };

    const btnClicked = (event, action, id) => {
        event.preventDefault();
        event.stopPropagation();

        switch (action) {
            case 'view':
                dispatch(push(`/form/${id}`));
                break;
            case 'submission':
                dispatch(push(`/form/${id}/submission`));
                break;
            case 'edit':
                dispatch(push(`/form/${id}/edit`));
                break;
            case 'popout':
                window.open(`#/form/${id}`, '_blank');
                break;
            case 'delete':
                dispatch(push(`/form/${id}/delete`));
                break;
            default:
        }
    }

    const checkRoleForDelete = (form) => {
        if (form && auth && auth.user) {
            const roleToCheck = auth.roles.authenticated._id;

            if (auth.user.roles.includes(roleToCheck)) {
                const acc = form.access.find(f => ['delete_all', 'delete_own'].includes(f.type))
                if (acc) {
                    return acc.roles.includes(roleToCheck);
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

    const onCardClicked = (form) => {
        dispatch(push(`/form/${form._id}`));
    };

    return (
        <div>
            <h4> <b>Form Manager (Card)</b> </h4>

            {!forms.forms.length ?
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: '100%'
                }}>
                    <div className="bg-image"></div>

                    <div className="spinner-border text-primary" style={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%'
                    }}>
                    </div>
                </div> :
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {forms.forms.map(form =>
                        <div className="col-md-3 col-12 col-sm-6 mr-tb-1"
                            onClick={() => onCardClicked(form)}
                            key={`form-${form._id}`}>
                            <div className="card bg-col mb-3 height100">
                                <div className="card-header">
                                    <span className="tooltip" style={{ fontSize: '0.8rem', float: 'left', marginRight: '0.5rem' }}>
                                        Created on: {(new Date(form.created)).toLocaleDateString()}
                                        {/* <div className="tooltipTop">
                                            <div className="tooltipArrow"></div>
                                            <div className="tooltipDate">
                                                Created on:{(new Date(form.created)).toLocaleDateString()}
                                            </div>
                                        </div> */}
                                    </span>
                                    <a onClick={(e) => btnClicked(e, 'popout', form._id)}>
                                        <ExternalLinkIcon style={{ height: '1rem', width: '1rem', fill: '#fff', cursor: 'pointer', margin: '0 .5rem', float: 'right' }} />
                                    </a>
                                </div>
                                <div className="card-body">
                                    <p className="card-text">

                                        <div style={{ fontSize: '1.25rem', paddingTop: '1rem' }}>{form.title}</div>
                                    </p>
                                </div>
                                <div className="card-footer bg-transparent">
                                    <a onClick={(e) => btnClicked(e, 'submission', form._id)}>
                                        <ShowIcon style={{ height: '1.5rem', width: '1.5rem', fill: '#002855', cursor: 'pointer', margin: '0 .5rem' }} />
                                    </a>
                                    <a onClick={(e) => btnClicked(e, 'edit', form._id)}>
                                        <EditIcon style={{ height: '1rem', width: '1rem', fill: '#002855', cursor: 'pointer', margin: '0 .5rem' }} />
                                    </a>
                                    {/* {checkRoleForDelete(form) && */}
                                    <a onClick={(e) => btnClicked(e, 'delete', form._id)}>
                                        <DeleteIcon style={{ height: '1.3rem', width: '1.3rem', fill: '#002855', cursor: 'pointer', margin: '0 .5rem' }} />
                                    </a>
                                    {/* } */}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            }

        </div>
    );
};
