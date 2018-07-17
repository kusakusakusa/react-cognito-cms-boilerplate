import _ from 'lodash'
import React from 'react'
import { connect } from 'react-redux'
import autobind from 'autobind-decorator'

import {
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUser,
  CookieStorage
} from "amazon-cognito-identity-js"

import { AnimationWrapper } from '_animationWrappers'
import { TextField } from '_inputs'
import { Button } from '_buttons'

// actions
import { loginAdminUser } from '_actions/authentications'

// utils
import validate from '_utils/validations'

class _Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      in: true,
      submittedFormBefore: false,
      formObject: {
        email: "",
        password: "",
      },
      formErrors: {
        email: "",
        password: ""
      }
    }
  }

  componentWillUnmount() {
    this.setState({in: false})
  }

  render() {
    const { formObject, formErrors } = this.state
    return (~
      %AnimationWrapper(
        classNames="fade"
        shouldShow={this.state.in}
        render={() => {
          return (~
            %main.grid-container
              .grid-x.grid-margin-x
                .cell.auto
                .cell.small-10
                  %TextField(
                    name="email"
                    placeholder="Email"
                    type="text"
                    label="Email"
                    error={formErrors.email}
                    value={formObject.email}
                    onChange={this.onChangeEmail})

                  %TextField(
                    name="password"
                    placeholder="Password"
                    label="Password"
                    type="password"
                    error={formErrors.password}
                    value={formObject.password}
                    onChange={this.onChangePassword})

                  %Button(
                    className="button"
                    text="Login"
                    onClick={() => {
                      if (this.validateForm()) {
                        if (!this.state.submittedFormBefore) {
                          this.setState({
                            submittedFormBefore: true,
                          }, this.login)
                        } else {
                          this.login()
                        }
                      }
                    }})
                .cell.auto
          ~)
        }})
    ~)
  }

  @autobind
  login() {
    const { formObject } = this.state
    this.props.loginAdminUser(formObject.email, formObject.password)
  }

  @autobind
  onChangeEmail(e) {
    this.updateForm('email', e.target.value)
  }

  @autobind
  onChangePassword(e) {
    this.updateForm('password', e.target.value)
  }

  // form methods
  @autobind
  updateForm(fieldName, fieldValue) {
    let newState = {
      formObject: {
          ...this.state.formObject,
          [fieldName]: fieldValue
        }
    }
    if (this.state.submittedFormBefore) {
      newState["formErrors"] = {
        ...this.state.formErrors,
        [fieldName]: validate(fieldName, fieldValue)
      }
      
    }
    this.setState(newState)
  }

  @autobind
  validateForm() {
    const { formObject } = this.state
    const formErrors = _.cloneDeep(this.state.formErrors)

    let isValid = true
    for (let key of Object.keys(formErrors)) {
      let message = validate(key, formObject[key])
      formErrors[key] = message
      if (message) {
        isValid = false
      }
    }

    this.setState({formErrors})

    return isValid
  }
}

function mapStateToProps({ isLoading }) {
  return { isLoading }
}

const Login = connect(mapStateToProps, { loginAdminUser })(_Login)

export { Login }
