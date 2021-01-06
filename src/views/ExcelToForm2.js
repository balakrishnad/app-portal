import React, { Component } from 'react';

import { connect } from 'react-redux';
import { saveForm } from "react-formio";

import _ from 'lodash';
import XLSX from 'xlsx';

export const make_cols = refstr => {
  let o = [], C = XLSX.utils.decode_range(refstr).e.c + 1;
  for (var i = 0; i < C; ++i) o[i] = { name: XLSX.utils.encode_col(i), key: i }
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
    //this.buttonClick = this.buttonClick.bind(this);
  }

  formComponents = []

  exvar = {
    test: "Not updated"
  }

  commonAttri = {
  }

  textfield = {
    type: "textfield",
  }

  numberField = {
    type: "number",
  }

  radioGroup = {
    type: "radio",
  }

  button = {
    type: "button"
  }

  checkbox = {
    type: "checkbox",
  }

  select = {
    type: "select",
  }

  textArea = {
    type: "textarea",
  }

  password = {
    type: "password",
  }

  selectBoxes = {
    type: "selectboxes",
  }

  addComponents = (parent, leftcomponents, rightcomponents) => {

    let columns = []

    columns.push(({
      components: leftcomponents,
      "width": 6,
      "offset": 0,
      "push": 0,
      "pull": 0,
      "size": "md"
    }))

    columns.push(({
      components: rightcomponents,
      "width": 6,
      "offset": 0,
      "push": 0,
      "pull": 0,
      "size": "md"
    }))

    parent.push(({
      type: "columns",
      label: "Columns",
      columns: columns,
      key: "Columns",
      input: "false",
      tableView: "false"
    }))

  }

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

    debugger;
    this.setState({ isFormCreated: false });

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
      debugger;
      this.setState({ data: data, cols: make_cols(ws['!ref']) }, () => {

        let components = []
        console.log("Length: ", this.state.data.length)
        let counter = 0
        let firsttableftcomponents = []
        let firsttabrightcomponents = []
        let secondtableftcomponents = []
        let secondtabrightcomponents = []
        let thirdtableftcomponents = []
        let thirdrightcomponents = []
        let fourthtableftcomponents = []
        let fourthtabrightcomponents = []
        let outsideleftcomponents = []
        let outsiderightcomponents = []
        let tabs = []
        let firstTabs = []
        let secondTabs = []
        let thirdTabs = []
        let fourthTabs = []
        let item = []
        let firstTabCount = 0;
        let secondTabCount = 0;
        let thirdTabCount = 0;
        let fourthTabCount = 0;
        let outsideTabCount = 0;

        this.state.data.forEach(element => {
          let uniqueID = counter++

          switch (element.type) {
            case "TextField":
              item = {
                ...this.commonAttri,
                ...this.textfield,
                id: "lbl" + uniqueID,
                key: "textField" + uniqueID,
                label: element.name || "textField" + uniqueID,
                labelPosition: "top",
                placeholder: element.placeholder
              }
              break
            case "TextArea":
              item = {
                ...this.commonAttri,
                ...this.textArea,
                id: "txtArea" + uniqueID,
                key: "txtArea" + uniqueID,
                label: element.name || "txtArea" + uniqueID,
                labelPosition: "top",
                placeholder: element.placeholder
              }
              break
            case "Number":
              item = {
                ...this.commonAttri,
                ...this.numberField,
                id: "lblNum" + uniqueID,
                key: "number" + uniqueID,
                label: element.name || "number" + uniqueID,
                labelPosition: "top",
                placeholder: element.placeholder
              }
              break
            case "Password":
              item = {
                ...this.commonAttri,
                ...this.password,
                id: "lblPwd" + uniqueID,
                key: "pwd" + uniqueID,
                label: element.name || "pwd" + uniqueID,
                labelPosition: "top",
                placeholder: element.placeholder
              }
              break
            case "Checkbox":
              item = {
                ...this.commonAttri,
                ...this.checkbox,
                id: "lblChk" + uniqueID,
                key: "chk" + uniqueID,
                label: element.name || "chk" + uniqueID,
                labelPosition: "top",
                value: element.values,
                placeholder: element.placeholder
              }
              break
            case "Button":
              item = {
                ...this.commonAttri,
                ...this.button,
                id: "btn" + uniqueID,
                key: "btn" + uniqueID,
                label: element.name || "btn" + uniqueID,
                labelPosition: "top",
                placeholder: element.placeholder
              }
              break
            case "Select":
              if (element.values !== "") {
                let splitData = element.values.split("#")
                let splitValues = []
                for (let k = 0; k < splitData.length; k++) {
                  console.log(splitData[k])
                  let Val = splitData[k]
                  splitValues.push({ label: Val, value: Val, shortcut: "" })
                }

                item = {
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
                  label: element.name || "Select" + uniqueID,
                  labelPosition: "top",
                  placeholder: element.placeholder
                }
                if (element.orientation === "Horizontal") {
                  item = {
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
                    label: element.name || "Select" + uniqueID,
                    labelPosition: "top",
                    placeholder: element.placeholder,
                    inline: true
                  }
                }
              }
              break

            case "SelectBoxes":
              if (element.values !== "") {
                let splitSelectBoxData = element.values.split("#")
                let splitSelectBoxValues = []
                for (let k = 0; k < splitSelectBoxData.length; k++) {
                  console.log(splitSelectBoxData[k])
                  let Val = splitSelectBoxData[k]
                  splitSelectBoxValues.push({ label: Val, value: Val })
                }

                item = {
                  ...this.commonAttri,
                  ...this.selectBoxes,
                  values: splitSelectBoxValues,
                  id: "SelectBox" + uniqueID,
                  key: "SelectBox" + uniqueID,
                  label: element.name || "SelectBox" + uniqueID,
                  labelPosition: "top",
                  placeholder: element.placeholder
                }
                if (element.orientation === "Horizontal") {
                  item = {
                    ...this.commonAttri,
                    ...this.selectBoxes,
                    values: splitSelectBoxValues,
                    id: "SelectBox" + uniqueID,
                    key: "SelectBox" + uniqueID,
                    label: element.name || "SelectBox" + uniqueID,
                    labelPosition: "top",
                    placeholder: element.placeholder,
                    inline: true
                  }
                }
              }
              break

            case "Radio":
              if (element.values !== "") {
                let splitRadioButtonsData = element.values.split("#")
                let splitRadioButtonsValues = []
                for (let k = 0; k < splitRadioButtonsData.length; k++) {
                  console.log(splitRadioButtonsData[k])
                  let Val = splitRadioButtonsData[k]
                  splitRadioButtonsValues.push({ label: Val, value: Val, shortcut: "" })
                }
                item = {
                  ...this.commonAttri,
                  ...this.radioGroup,
                  values: splitRadioButtonsValues,
                  id: "radio" + uniqueID,
                  key: "radioButtons" + uniqueID,
                  label: element.name || "radioButtons" + uniqueID,
                  labelPosition: "top",
                }

                if (element.orientation === "Horizontal") {
                  item = {
                    ...this.commonAttri,
                    ...this.radioGroup,
                    values: splitRadioButtonsValues,
                    id: "radio" + uniqueID,
                    key: "radioButtons" + uniqueID,
                    label: element.name || "radioButtons" + uniqueID,
                    labelPosition: "top",
                    inline: true
                  }
                }
              }
              break;
            default:
              break;
          }

          switch (element.tabs) {
            case "First":
              firstTabCount++;
              if (firstTabCount % 2 !== 0) {
                firsttableftcomponents.push(item)
              }
              else {
                firsttabrightcomponents.push(item)
              }
              break
            case "Second":
              secondTabCount++;
              if (secondTabCount % 2 !== 0) {
                secondtableftcomponents.push(item)
              }
              else {
                secondtabrightcomponents.push(item)
              }
              break
            case "Third":
              thirdTabCount++;
              if (thirdTabCount % 2 !== 0) {
                thirdtableftcomponents.push(item)
              }
              else {
                thirdrightcomponents.push(item)
              }
              break
            case "Fourth":
              fourthTabCount++;
              if (fourthTabCount % 2 !== 0) {
                fourthtableftcomponents.push(item)
              }
              else {
                fourthtabrightcomponents.push(item)
              }
              break
            default:
              outsideTabCount++;
              if (outsideTabCount % 2 !== 0) {
                outsideleftcomponents.push(item)
              }
              else {
                outsiderightcomponents.push(item)
              }
          }
        });

        if (firstTabCount > 0) {
          this.addComponents(firstTabs, firsttableftcomponents, firsttabrightcomponents)

          tabs.push(({
            label: "Tab 1",
            key: "tab1",
            components: firstTabs
          }))
        }

        if (secondTabCount > 0) {
          this.addComponents(secondTabs, secondtableftcomponents, secondtabrightcomponents)

          tabs.push(({
            label: "Tab 2",
            key: "tab2",
            components: secondTabs
          }))
        }

        if (thirdTabCount > 0) {
          this.addComponents(thirdTabs, thirdtableftcomponents, thirdrightcomponents)

          tabs.push(({
            label: "Tab 3",
            key: "tab3",
            components: thirdTabs
          }))
        }

        if (fourthTabCount > 0) {
          this.addComponents(fourthTabs, fourthtableftcomponents, fourthtabrightcomponents)

          tabs.push(({
            label: "Tab 4",
            key: "tab4",
            components: fourthTabs
          }))
        }

        this.addComponents(components, outsideleftcomponents, outsiderightcomponents)

        components.push(({
          type: "tabs",
          key: "tabs1",
          Label: "Tabs",
          input: false,
          components: tabs
        }))

        components.push({
          ...this.commonAttri,
          ...this.button,
          id: "btnSubmit",
          key: "submit",
          label: "Submit",
          labelPosition: "top"
        })
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

  buttonClick = () => {
    this.setState({ isFormCreated: false });

    const form = {
      display: 'form',
      components: this.formComponents,
      title: this.state.text,
      name: _.camelCase(this.state.text),
      path: (_.camelCase(this.state.text)).toLowerCase(),
    };

    debugger;
    console.log(JSON.stringify(this.formComponents));

    this.props.saveForm(form, this.cb);
  };

  createForm() {
    this.handleFile();
    this.buttonClick();
  }

  render() {
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
      const newForm = {
        ...form,
        tags: ['common', 'byBA'],
      };

      dispatch(saveForm('form', newForm, (err, form) => {
        if (!err) {
          //   dispatch(push(`/form/${form._id}`))
        }
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
