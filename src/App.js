import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { selectRoot } from 'react-formio';
import Header from './components/Header';
import { Home, Login, Chart, FetchDataFromForm, ExcelToForm } from './views';
import { Forms, FormsByDept, Excel, FormManager, FormManagerCard } from './containers';

import ExcelToForm2 from './views/ExcelToForm2';
import { Form, Edit, Submission, Create, CreatePDF } from './containers/Forms/Form/index';

const App = class extends Component {
    constructor(props) {
        super(props);

        this.state = {
            auth: props.auth
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (JSON.stringify(nextProps.auth) !== JSON.stringify(prevState.auth)) {
            return {
                auth: nextProps.auth,
            }
        }

        return null;
    }

    render() {
        const { auth } = this.state;

        return (

            <div style={{ color: 'rgb(0, 40, 85)' }}>
               <Header auth={auth} />

                <div id="main" style={{ width: '90.7%', margin: '2rem auto' }}>
                    <Route exact path="/"
                        render={() => {
                            if (!auth.authenticated)
                                return <Login />;
                            else
                                return <Home />;
                        }}
                    />

                    <Route path="/home" component={Home} />

                    <Route path="/forms" component={Forms} />
                    <Route path="/formsbydept" component={FormsByDept} />

                    <Route path="/create" component={Create} />
                    <Route path="/createpdf" component={CreatePDF} />

                    <Route exact path="/form/:formid/edit" component={Edit} />
                    <Route exact path="/form/:formid/submission/:submissionid/view" component={Form} />
                    <Route exact path="/form/:formid/submission/:submissionid/edit" component={Form} />
                    <Route exact path="/form/:formid/submission" component={Submission} />
                    <Route exact path="/form/:formid" component={Form} />

                    <Route path="/excel" component={Excel} />
                    <Route path="/manager" component={FormManager} />
                    <Route path="/cardmanager" component={FormManagerCard} />

                    <Route path="/login" component={Login} />

                    <Route path="/chart" component={Chart} />
                    <Route path="/fetchData" component={FetchDataFromForm} />
                    <Route path="/exceltoform" component={ExcelToForm} />
                    <Route path="/ex" component={ExcelToForm2} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: selectRoot('auth', state),
    };
};

export default withRouter(connect(
    mapStateToProps,
    null
)(App));
