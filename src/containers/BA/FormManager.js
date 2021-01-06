import React, { useState, useEffect } from 'react';
import { FormGrid, indexForms, selectRoot, selectError, Errors } from 'react-formio';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import SwitchButton from '../../components/common/SwitchButton';
import Card from '../../components/common/Card';
import { deleteFormIoForm } from '../../utils/formioUtils';
import './FormManager.scss'

import './FormManager.css';

export default () => {
    const dispatch = useDispatch();

    const forms = useSelector(state => selectRoot('forms', state));
    const errors = useSelector(state => selectError('forms', state));
    const auth = useSelector(state => selectRoot('auth', state));

    // const [curForms, setCurForms] = useState(null);
    const [searchText, setSearchText] = useState(null);
    const [isChecked, setisChecked] = useState(true);

    useEffect(() => {
        // if (forms && forms.forms && forms.forms.length === 0) {
        getForms(1);
        // }
    }, [dispatch]);

    // useEffect(() => {
    //     if (forms && forms.forms && forms.forms.length > 0) {
    //         setCurForms(forms);
    //     }
    // }, [forms]);

    const getForms = (page, query) => {
        dispatch(indexForms('forms', page, { limit: 999999, ...query }));
    };

    const fetchForms = (err) => {
        dispatch(indexForms('forms', 1, { limit: 999999 }));

        if (err) {
            alert(err);
        }
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

    const onAction = (form, action) => {
        switch (action) {
            case 'view':
                dispatch(push(`/form/${form._id}`));
                break;
            case 'submission':
                dispatch(push(`/form/${form._id}/submission`));
                break;
            case 'edit':
                dispatch(push(`/form/${form._id}/edit`));
                break;
            case 'delete':
                dispatch(push(`/form/${form._id}/delete`));
                break;
            default:
        }
    };

    const createNewFormClicked = () => {
        dispatch(push('/create'));
    };

    const onCardClicked = (id) => {
        dispatch(push(`/form/${id}`));
    };

    const deleteFormClicked = (id) => {
        deleteFormIoForm(dispatch, id, fetchForms);
    };

    const onChange = (e) => {
        setSearchText(e.target.value);
    };

    const searchClicked = () => {
        if (searchText !== '')
            getForms(1, { title__regex: `/${searchText}/i` });
        else
            getForms(1);
    };

    const checkboxChange = () => {
        setisChecked(!isChecked);
    };

    const onShowSubClick = (id) => {
        dispatch(push(`/form/${id}/submission`));
    };

    const onEditClick = (id) => {
        dispatch(push(`/form/${id}/edit`));
    };

    const onPopoutClicked = id => {
        window.open(`#/form/${id}`, '_blank');
    };

    return (
        <div style={{ color: 'rgb(0, 40, 85)' }}>
            <Errors errors={errors} />

            <div className='row'>
                <div className='col'>
                    <h4> <b>Form Manager</b> </h4>
                </div>
                <div className='col form-group'>
                    <button className='float-right'
                        style={{
                            backgroundColor: '#002855', color: '#fff',
                            fontWeight: 'normal', fontSize: '1rem',
                            padding: '0.5rem 0.75rem', borderRadius: '1.5rem'
                        }}
                        onClick={createNewFormClicked}>
                        Create New Form
                    </button>
                </div>
            </div>

            <div className='row'>
                <div className='col-6 form-group'>
                    <input type='text' className="searchText"
                        id='searchText' name='formName'
                        placeholder='Enter Search' onChange={onChange}
                        value={searchText}
                    />
                    <button className="searchBtn"
                        onClick={searchClicked}>
                        Search
                    </button>
                </div>
                <div className='col-6 form-group'>
                    <SwitchButton inpLabel="Switch View" onChange={checkboxChange} checked={isChecked} />
                </div>
            </div>

            <div id='form-manager'>
                {!isChecked ?
                    <FormGrid
                        forms={forms}
                        onAction={onAction}
                        getForms={getForms}
                    /> :
                    <div className="wrapper">
                        {forms.forms.map(form =>
                            <Card
                                data={form}
                                onDetailsClick={onCardClicked}
                                onDeleteClick={deleteFormClicked}
                                showDeleteForm={checkRoleForDelete(form)}
                                onShowSubClick={onShowSubClick}
                                onEditClick={onEditClick}
                                showSubmission
                                showEditForm
                                onPopoutClicked={onPopoutClicked}
                            />
                        )}
                    </div>
                    //<p style={{textAlign:'center',fontWeight:'bold',padding:'5rem',background:'#ccc',borderRadius:'1rem'}}>card layout will render here</p>
                }
            </div>
        </div>
    )
}
