import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectRoot, indexForms } from "react-formio";
import Card from '../../components/common/Card';
import { push } from 'connected-react-router';

export default () => {
    const dispatch = useDispatch();
    const forms = useSelector(state => selectRoot('forms', state));
    const auth = useSelector(state => selectRoot('auth', state));

    useEffect(() => {
        // this lines fetches all the forms associated to the formio project.
        dispatch(indexForms('forms', 1, { limit: 999999 }))
    }, [dispatch]);

    const onCardClicked = (id) => {
        dispatch(push(`/form/${id}`));
    };
    const deleteFormClicked = (id) => {
        alert("called from card")
        // deleteFormIoForm(dispatch, form._id, fetchForms);
        dispatch(push(`/form/${id}/delete`));
    };
    const checkRoleForDelete = (form) => {
        if (form && auth && auth.user) {
            const roleToCheck = auth.roles.authenticated._id;

            if (auth.user.roles.includes(roleToCheck)) {
                const acc = form.access.filter(f => ['delete_all', 'delete_own'].includes(f.type))
                if (acc) {
                    return acc.find(r => r.roles.includes(roleToCheck))
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
    const onShowSubClick = (id) => {
        debugger;
        dispatch(push(`/form/${id}/submission`));
    };
    const onEditClick = (id) => {
        debugger;
        dispatch(push(`/form/${id}/edit`));
    };
    const onPopoutClicked = id => {
        window.open(`#/form/${id}`, '_blank');
    };
    return (
        <div>
            <h4> <b>Forms by Department</b> </h4>
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
                    {forms.forms.map(f => 
                        // <Card data={f} onShowSubClick={ShowClicked} onEditClick={onEditClick} showEditForm/>
                        <Card
                            data={f}
                            onDetailsClick={onCardClicked}
                            onDeleteClick={deleteFormClicked}
                            showDeleteForm={checkRoleForDelete(f)}
                            onShowSubClick={onShowSubClick}
                            onEditClick={onEditClick}
                            showSubmission
                            showEditForm
                            showPopout
                            onPopoutClicked={onPopoutClicked}
                        />            
                    )}
                </div>
            }

        </div>
    );
};
