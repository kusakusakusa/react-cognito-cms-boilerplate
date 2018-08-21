import React from 'react'
import autobind from 'autobind-decorator'
import Loadable from 'react-loadable'

const TextField = Loadable({
  loader: () => import('_inputs/TextField'),
  loading: () => <div></div>,
})
const SelectField = Loadable({
  loader: () => import('_inputs/SelectField'),
  loading: () => <div></div>,
})

class Form extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      formObject: {
        fieldWithNoError: "",
        fieldWithError: "",
        selectFieldWithNoError: "",
      },
      formErrors: {
        fieldWithNoError: "",
        fieldWithError: "",
        selectFieldWithNoError: "",
      }
    }
  }

  render() {
    const { formObject, formErrors } = this.state

    return (
      <div>
        <TextField
          name="fieldWithNoError"
          placeholder="FieldWithNoError"
          type="text"
          label="FIELDWITHNOERROR"
          value={formObject.fieldWithNoError}
          error={formErrors.fieldWithNoError}
          onChange={this.onChangeFieldWithNoError}/>

        <TextField
          name="fieldWithError"
          placeholder="FieldWithError"
          type="text"
          label="FIELDWITHERROR"
          value={formObject.fieldWithError}
          error={'fieldWithError'}
          onChange={this.onChangeFieldWithError}/>

        <SelectField
          name="selectFieldWithNoError"
          placeholder="SelectFieldWithNoError"
          type="text"
          label="SELECTFIELDWITHNOERROR"
          value={formObject.selectFieldWithNoError}
          error={formErrors.selectFieldWithNoError}
          options={this.getOptions()}
          onChange={this.onChangeSelectFieldWithNoError}/>
      </div>
    )
  }

  getOptions() {
    return [
      {label: "label1", value: 1},
      {label: "label2", value: 2},
      {label: "label3", value: 3},
    ]
  }

  @autobind
  onChangeFieldWithNoError(e) {
    this.setState({
      formObject: {
        ...this.state.formObject,
        fieldWithNoError: e.target.value
      }
    })
  }

  @autobind
  onChangeFieldWithError(e) {
    this.setState({
      formObject: {
        ...this.state.formObject,
        fieldWithError: e.target.value
      }
    })
  }

  @autobind
  onChangeSelectFieldWithNoError(selectedOptionValue) {
    this.setState({
      formObject: {
        ...this.state.formObject,
        selectFieldWithNoError: selectedOptionValue
      }
    })
  }
}

export default Form
