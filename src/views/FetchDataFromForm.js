import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectRoot, indexForms, getSubmissions, resetSubmissions } from "react-formio";

import { Bar } from 'react-chartjs-2';

import _ from 'lodash';

export default () => {
    const dispatch = useDispatch();
    const { forms } = useSelector(state => selectRoot('forms', state));

    const { submissions } = useSelector(state => selectRoot('submissions', state));

    const [stForms, setStForms] = useState([]);
    const [stFields, setStFields] = useState([]);
    const [selFormId, setSelFormId] = useState('-1');
    const [selFields, setSelFields] = useState([]);

    const [data, setData] = useState([]);

    useEffect(() => {
        dispatch(indexForms('forms', 1, { limit: 999999 }));
    }, [dispatch]);

    useEffect(() => {
        if (forms.length > 0) {
            const stForms = forms.map(f => {
                const form = _.cloneDeep(f);
                delete form.components;
                delete form.access;
                delete form.submissionAccess;

                const fields = [];

                const nestedComponents = (children) => {
                    children.forEach(child => {
                        if (child.input && child.type !== 'button') {
                            fields.push({
                                id: child.id,
                                key: child.key,
                                label: child.label,
                                type: child.type,
                            })
                        }

                        if (child.columns) {
                            nestedComponents(child.columns);
                        }

                        if (child.components) {
                            nestedComponents(child.components);
                        }
                    });
                };

                nestedComponents(f.components);

                form.components = fields;

                return form;
            })

            setStForms(stForms);
        }
    }, [forms]);

    useEffect(() => {
        if (submissions.length > 0) {
            const sub = submissions.map(s => ({ ...s.data, _id: s._id }));

            setData(sub);
        }

    }, [submissions]);

    useEffect(() => {
        if (selFormId !== '-1') {
            setStFields((stForms.find(s => s._id === selFormId)).components);
        }
    }, [selFormId]);

    const onChange = (e) => {
        setSelFormId(e.target.value);
        dispatch(resetSubmissions('submissions'));
    };

    const fetchData = () => {
        const params = {
            limit: 999999,
        }

        if (selFields.length > 0) {
            params.select = selFields.join(',');
        }

        dispatch(getSubmissions('submissions', 1, params, selFormId));
    };

    const fieldSelected = e => {
        debugger;
        const fields = [...selFields];

        if (e.target.checked) {
            fields.push(`data.${e.target.title}`);
        } else {
            const ind = fields.lastIndexOf(`data.${e.target.title}`);
            if (ind > -1)
                fields.splice(ind, 1);
        }

        setSelFields(fields);
        // console.log(stFields);
    };

    return (
        <div>
            <h3> Forms </h3>
            <br />
            <select onChange={onChange} value={selFormId}>
                <option value="-1" label="-- Select --" />
                {stForms.map(f => <option value={f._id}>{f.title}</option>)}
            </select>
            <button onClick={fetchData} style={{ marginLeft: '2rem' }}>Fetch Data</button>
            <br />
            <br />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {stFields.map(f => <div key={`chk-${f.id}`}>
                    <input type="checkbox" id={f.id} value={f.id} title={f.key} onChange={fieldSelected} />
                    <label htmlFor={f.id} style={{ paddingLeft: '0.2rem' }}>{f.label}</label>
                </div>)}
            </div>

            <br />
            {data && data.length > 0 && <Bar
                data={{
                    // labels: ['January', 'February', 'March',
                    //     'April', 'May'],
                    labels: data.map(d => d.textField),
                    datasets: [
                        {
                            label: 'Number',
                            backgroundColor: 'rgba(75,192,192,1)',
                            borderColor: 'rgba(0,0,0,1)',
                            // borderWidth: 2,
                            // data: [65, 59, 80, 101, 56]
                            data: data.map(d => d.number)
                        }
                    ]
                }}
                options={{
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                max: 10,
                            }
                        }]
                    },
                    // title: {
                    //     display: true,
                    //     text: 'Average Rainfall per month',
                    //     fontSize: 20
                    // },
                    legend: {
                        display: true,
                        position: 'right'
                    }
                }}
                width={100}
                height={25}
            />}


            {/* <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {stForms && stForms.map(f => {
                    return <div style={{
                        height: '7rem', flex: '0 0 16.66%',
                        margin: '1rem', borderRadius: '5%',
                        backgroundColor: 'rgb(41, 157, 175)',
                        textAlign: 'center', color: '#fff',
                        fontSize: '1.25rem', fontWeight: 'bold',
                        paddingTop: '2rem'
                    }}>
                        {f.title}
                    </div>
                })}
            </div> */}
        </div>
    );
}