import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    selectRoot, indexForms
} from "react-formio";

const Home = class extends Component {
    componentDidMount() {
        this.props.getForms();
    }

    render() {
        const { forms } = this.props;

        return (
            <div>
                <h4> <b>Forms</b> </h4>

                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {forms.forms.map(f => {
                        return <div style={{
                            height: '7rem', flex: '0 0 25%',
                            margin: '1rem',
                            backgroundColor: 'rgb(219 224 224)',
                            textAlign: 'center', borderRadius: '0.5rem',
                            fontSize: '1.25rem',
                            paddingTop: '2rem',
                            border: '2px solid #062948'
                        }}>
                            {f.title}
                        </div>
                    })}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        forms: selectRoot('forms', state),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getForms: (page = 1, query = {}) => dispatch(indexForms('forms', page, { limit: 999999 })),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)
