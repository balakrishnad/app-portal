import React from 'react';

const defaultObj = {
    formId: '',
    formName: '',
    formType: null,
    department: '',
    description: '',
    reference: '',
    subDept: '',
};

export default ({ formFieldsChanged, type = 'form', formDetails = defaultObj }) => {
    const { formName, department, description, reference, formId, formType, subDept } = formDetails;

    let formOptions = [
        { value: 'form', text: 'One-page Form' },
        { value: 'wizard', text: 'Multi-page Form' }
    ];

    if (type === 'pdf') {
        formOptions = [
            { value: 'pdf', text: 'PDF Form' },
        ];
    }

    const onChange = (e) => {
        const { name, value } = e.target;

        if (formFieldsChanged) {
            formFieldsChanged(name, value);
        }
    };

    return (
        <>
            <div className='row'>
                <div className='col form-group'>
                    <label htmlFor='formName'>Form Name / Title</label>
                    <input type='text' className='form-control'
                        id='formName' name='formName'
                        placeholder='Enter Form Name / Title' onChange={onChange}
                        value={formName}
                    />
                </div>
                <div className='col form-group'>
                    <label htmlFor='formDesc'>Description</label>
                    <input type='text' className='form-control' id='formDesc'
                        name='description' placeholder='Enter Form Description'
                        value={description} onChange={onChange}
                    />
                </div>
            </div>
            <div className='row'>
                <div className='col form-group'>
                    <label htmlFor='dept'>Department</label>
                    <input type='text' className='form-control' id='dept'
                        name='department' placeholder='Enter Department'
                        value={department} onChange={onChange}
                    />
                </div>
                <div className='col form-group'>
                    <label htmlFor='refer'>Sub-Department</label>
                    <select className='form-control'
                        name='subDept' value={subDept}
                        placeholder='Select Sub-Department' onChange={onChange}>
                        <option></option>
                        <option>A</option>
                        <option>B</option>
                    </select>
                </div>
            </div>
            <div className='row'>
                <div className='col form-group'>
                    <label htmlFor='formDesc'>Form Type</label>
                    <select className='form-control' id='formType'
                        name='formType' value={formType}
                        onChange={onChange}
                    >
                        {formOptions.map(({ value, text }) => <option value={value}>{text}</option>)}
                    </select>
                </div>
                <div className='col form-group'>
                    <label htmlFor='refer'>Reference</label>
                    <input type='text' className='form-control' id='refer'
                        name='reference' placeholder='Enter Reference'
                        value={reference} onChange={onChange}
                    />
                </div>
            </div>
        </>
    );
};