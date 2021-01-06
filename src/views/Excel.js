import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  saveForm, FormEdit
} from "react-formio";

import _ from 'lodash';
import XLSX from 'xlsx';
// import { make_cols } from '../ExcelReader/MakeColumn'

export const make_cols = refstr => {
	let o = [], C = XLSX.utils.decode_range(refstr).e.c + 1;
    for(var i = 0; i < C; ++i) o[i] = {name:XLSX.utils.encode_col(i), key:i}
	return o;
};

const ExcelToForm = class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFormCreated: false,
      file: {},
      data: [],
      cols: [],
      text: "eg"
    };
    this.handleFile = this.handleFile.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  exvar = {
    test: "Not updated"
  }

  //------Extracted from buttonClick

  commonAttri = {
    allowCalculateOverride: false,
    allowMultipleMasks: false,
    attributes: {},
    autofocus: false,
    calculateServer: false,
    calculateValue: "",
    clearOnHide: true,
    conditional: { show: null, when: null, eq: "", json: "" },
    customClass: "",
    customDefaultValue: "",
    dbIndex: false,
    defaultValue: null,
    description: "",
    disabled: false,
    encrypted: false,
    errorLabel: "",
    hidden: false,
    hideLabel: false,
    input: true,
    showCharCount: false,
    showWordCount: false,
    validateOn: "change",
    placeholder: "",
    prefix: "",
    properties: {},
    protected: false,
    redrawOn: "",
    refreshOn: "",
    modalEdit: false,
    multiple: false,
  };

  textfield = {
    case: "",
    customConditional: "",
    inputFormat: "plain",
    inputMask: "",
    inputType: "text",
    logic: [],
    mask: false,
    overlay: {
      height: "",
      left: "",
      page: "",
      style: "",
      top: "",
      width: "",
    },
    persistent: true,
    spellcheck: true,
    suffix: "",
    tabindex: "",
    tableView: true,
    tags: [],
    tooltip: "",
    type: "textfield",
    unique: false,
    widget: { type: "input" },
    validate: {
      custom: "",
      customMessage: "",
      customPrivate: false,
      json: "",
      maxLength: "",
      minLength: "",
      pattern: "",
      required: false,
      strictDateValidation: false,
      unique: false,
    },
  };

  numberField = {
    label: "Number",
    mask: false,
    spellcheck: true,
    tableView: false,
    delimiter: false,
    requireDecimal: false,
    inputFormat: "plain",
    key: "number",
    type: "number",
    suffix: "",
    multiple: false,
    unique: false,
    persistent: true,
    labelPosition: "top",
    tooltip: "",
    tabindex: "",
    widget: {
      type: "input"
    },
    validate: {
      required: false,
      custom: "",
      customPrivate: false,
      strictDateValidation: false,
      multiple: false,
      unique: false,
      min: "",
      max: "",
      step: "any",
      integer: ""
    },
    overlay: {
      style: "",
      left: "",
      top: "",
      width: "",
      height: ""
    },
    id: "esnywp"
  }



  radioGroup = {
    label: "Radio",
    optionsLabelPosition: "right",
    inline: false,
    tableView: false,
    widget: null,
    values: [
      {
        label: "Radio1",
        value: "radio1",
        shortcut: "D"
      },
      {
        label: "Radio2",
        value: "radio2",
        shortcut: "C"
      },
      {
        label: "Radio3",
        value: "radio3",
        shortcut: "G"
      }
    ],
    key: "radio",
    type: "radio",
    suffix: "",
    unique: false,
    persistent: true,
    labelPosition: "top",
    tooltip: "",
    tabindex: "",
    validate: {
      required: false,
      custom: "",
      customPrivate: false,
      strictDateValidation: false,
      multiple: false,
      unique: false
    },
    overlay: {
      style: "",
      left: "",
      top: "",
      width: "",
      height: ""
    },
    inputType: "radio",
    fieldSet: false,
    id: "e4kxfi"
  }

  button = {
    block: false,
    action: "submit",
    dataGridLabel: true,
    disableOnInvalid: true,
    leftIcon: "",
    widget: { type: "input" },
    overlay: {
      style: "",
      left: "",
      top: "",
      width: "",
      height: ""
    },
    persistent: false,
    rightIcon: "",
    size: "md",
    suffix: "",
    tabindex: "",
    tableView: false,
    theme: "primary",
    tooltip: "",
    type: "button",
    unique: false,
    validate: {
      custom: "",
      customPrivate: false,
      multiple: false,
      required: false,
      strictDateValidation: false,
      unique: false,
    }
  };

  checkbox = {
    label: "Checkbox",
    tableView: false,
    key: "checkbox1",
    type: "checkbox",
    suffix: "",
    defaultValue: null,
    protected: false,
    unique: false,
    persistent: true,
    labelPosition: "right",
    tooltip: "",
    tabindex: "",
    dbIndex: false,
    widget: null,
    validate: {
      required: false,
      custom: "",
      customPrivate: false,
      strictDateValidation: false,
      multiple: false,
      unique: false
    },
    conditional: {
      show: null,
      when: null,
      eq: ""
    },
    overlay: {
      style: "",
      left: "",
      top: "",
      width: "",
      height: ""
    },
    inputType: "checkbox",
    dataGridLabel: true,
    value: "",
    name: "",
    id: "ervmyfc"
  };

  select = {
    label: "Select",
    widget: "choicesjs",
    tableView: true,
    selectThreshold: 0.3,
    key: "select",
    type: "select",
    indexeddb: {
      filter: {}
    },
    customClass: "",
    suffix: "",
    multiple: false,
    defaultValue: null,
    protected: false,
    unique: false,
    persistent: true,
    refreshOn: "",
    redrawOn: "",
    labelPosition: "top",
    description: "",
    errorLabel: "",
    tooltip: "",
    tabindex: "",
    validate: {
      required: false,
      custom: "",
      customPrivate: false,
      strictDateValidation: false,
      multiple: false,
      unique: false
    },
    conditional: {
      show: null,
      when: null,
      eq: ""
    },
    overlay: {
      style: "",
      left: "",
      top: "",
      width: "",
      height: ""
    },
    clearOnRefresh: false,
    limit: 100,
    dataSrc: "values",
    valueProperty: "",
    lazyLoad: true,
    filter: "",
    searchEnabled: true,
    searchField: "",
    minSearch: 0,
    readOnlyValue: false,
    authenticate: false,
    template: "<span>{{ item.label }}</span>",
    selectFields: "",
    searchThreshold: 0.3,
    uniqueOptions: false,
    fuseOptions: {
      include: "score",
      threshold: 0.3
    },
    customOptions: {},
    id: "etk7cgo"
  }

  formComponents = []


  buttonClick = () => {
    this.setState({ isFormCreated: false });

    const form = {
      display: 'form',
      components: this.formComponents,
      title: this.state.text,
      name: _.camelCase(this.state.text),
      path: (_.camelCase(this.state.text)).toLowerCase(),
    };

    this.props.saveForm(form, this.cb);
  };

  cb = () => {
    this.setState({ isFormCreated: true });
  };

  textChanged = (e) => {
    this.setState({ text: e.target.value });
  };



  //ExcelReader block----------------------------------------

  handleChange(e) {
    console.log(this.select)
    const files = e.target.files;
    if (files && files[0]) this.setState({ file: files[0] });
  };

  handleFile() {
    /* Boilerplate to set up FileReader */
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;

    reader.onload = (e) => {
      /* Parse data */
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array', bookVBA: true });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws);
      /* Update state */
      this.setState({ data: data, cols: make_cols(ws['!ref']) }, () => {

        let components = []

        this.state.data.forEach(element => {
          console.log("ForEach Begin ",element.type)
          let uniqueID = Date.now()
          switch(element.type){
            case "TextField":
              components.push({
                ...this.commonAttri,
                ...this.textfield,
                id: "lbl" + uniqueID,
                key: "textField" + uniqueID,
                label: element.name,
                labelPosition: "top"
              })
              break
            case "number":

              break
            case "button":
              components.push({
                ...this.commonAttri,
                ...this.textfield,
                id: "btn" + uniqueID,
                key: "submit" + uniqueID,
                label: element.name,
                labelPosition: "top"
              })
              break
            case "Select":
              let splitData = element.values.split("||")
              let splitValues = []
              for (let k = 0; k < splitData.length; k++) {
                console.log(splitData[k])
                let Val = splitData[k].split("#")
                splitValues.push({ label: Val[0], value: Val[1] })
              }

              components.push({
                ...this.commonAttri,
                ...this.select,
                data: {
                  json: "",
                  url: "",
                  resource: "",
                  custom: "",
                  values: splitValues
                },
                id: "Select" + uniqueID,
                key: "Select" + uniqueID,
                label: element.name,
                labelPosition: "top",
              })
              break
          
          }
        });

        console.trace(components);
        this.formComponents = components
      });

    };

    if (rABS) {
      reader.readAsBinaryString(this.state.file);
    } else {
      reader.readAsArrayBuffer(this.state.file);
    };
  }

  //---------------------------------------------------------

  render() {
    //console.log(this.select.data)
    return (
      <div>
        <div>
          <label htmlFor="file">Upload an excel to Process Triggers</label>
          <br />
          <input type="file" className="form-control" id="file" onChange={this.handleChange} />
          <br />
          <input type='submit'
            value="Process Triggers"
            onClick={this.handleFile} />
        </div>

        {this.state.isFormCreated && <div> Form Created successfully... <br /><br /></div>}

        <h3> Forms </h3>
        <input type="text" onChange={this.textChanged} />
        <button onClick={this.buttonClick}> Create form </button>

        <br /><br />

      </div>
    );
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    saveForm: (form, cb) => {
      debugger;
      const newForm = {
        ...form,
        tags: ['common', 'byBA'],
      };

      dispatch(saveForm('form', newForm, (err, form) => {
        if (!err) {
          debugger;
          //   dispatch(push(`/form/${form._id}`))
        }
        debugger;
        console.trace(form);
      }));

      if (cb)
        cb();
    },
  }
};

export default connect(
  null,
  mapDispatchToProps
)(ExcelToForm);
