import _ from 'lodash'
import { fromJS } from 'immutable'
import React from 'react'
import autobind from 'autobind-decorator'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { Box } from '@rebass/grid'
import Auth from '@aws-amplify/auth'
import PropTypes from 'prop-types'

import * as ContentLoaders from '_contentLoaders'
import TransitionWrapper from '_transitions/TransitionWrapper'
import ValidateField from '_services/ValidateField'
import ValidateFormObject from '_services/ValidateFormObject'

import withAlert from '_hocs/withAlert'

const TextField = React.lazy(() => import('_inputs/TextField'))
const ButtonWithLoader = React.lazy(() => import('_buttons/ButtonWithLoader'))

const Logo = styled.img`
  margin: auto;
  display: block;
  margin-bottom: 1rem;
`

class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoggingIn: false,
      checkedAuthentication: false,
      submittedFormBefore: false,
      formObject: fromJS({
        email: '',
        password: '',
      })
    }
  }

  async componentDidMount() {
    try {
      const session = await Auth.currentSession()
      this.props.history.push('/')
    } catch (err) {
      this.setState({ checkedAuthentication: true })
    }
  }

  render() {
    if (!this.state.checkedAuthentication) {
      return null
    }

    const { formObject, submittedFormBefore } = this.state
    const { updateAlert } = this.props

    return (
      <React.Fragment>

        <Logo src='https://t4.rbxcdn.com/2d5d9e7b8bb8d4524a7dfcf9c48c889c'/>

        <Box
          width={1/3}
          mx='auto'
          alignSelf='center'>
          <React.Suspense fallback={<ContentLoaders.InputField/>}>
            <TextField
              name="email"
              placeholder="Email"
              type="text"
              label="Email"
              error={ValidateField('login-email', formObject.get('email'), submittedFormBefore)}
              value={formObject.get('email')}
              onChange={this.onChangeEmail}/>
          </React.Suspense>
        </Box>

        <Box
          width={1/3}
          mx='auto'
          alignSelf='center'>
          <React.Suspense fallback={<ContentLoaders.InputField/>}>
            <TextField
              name="password"
              placeholder="Password"
              label="Password"
              type="password"
              error={ValidateField('login-password', formObject.get('password'), submittedFormBefore)}
              value={formObject.get('password')}
              onChange={this.onChangePassword}/>
          </React.Suspense>
        </Box>

        <Box
          width={1/3}
          mx='auto'
          alignSelf='center'
          css={{
            textAlign: 'center'
          }}>
          <React.Suspense fallback={<ContentLoaders.Button/>}>
            <ButtonWithLoader
              isLoading={this.state.isLoggingIn}
              text="Login"
              onClick={() => {
                if (!this.state.submittedFormBefore) {
                  this.setState({
                    submittedFormBefore: true,
                  }, this.login.bind(null, updateAlert))
                } else {
                  this.login(updateAlert)
                }
              }}/>
          </React.Suspense>
        </Box>
      </React.Fragment>
    )
  }

  @autobind
  async login(updateAlert) {
    this.setState({ isLoggingIn: true })

    const { formObject } = this.state

    if (ValidateFormObject('login', formObject)) {
      try {
        const user = await Auth.signIn(formObject.get('email'), formObject.get('password'))

        switch(user.challengeName) {
          case 'NEW_PASSWORD_REQUIRED':
            Auth.completeNewPassword(user, formObject.get('password'), user.challengeParam.requiredAttributes)
            .then(() => {
              this.setState({ isLoggingIn: false })
              this.props.history.push('/')
            })
            .catch(error => {
              this.setState({ isLoggingIn: false })
              updateAlert({
                variables: {
                  title: "Error",
                  body: `completeNewPassword error: ${JSON.stringify(error)}`,
                  actions: [
                    {
                      text: 'OK',
                      alertResponse: 'NEUTRAL',
                    }
                  ]
                }
              })
              console.log('completeNewPassword error', error)
            })
            break
          default:
          this.setState({ isLoggingIn: false })
            this.props.history.push("/")
        }
      } catch (err) {
        this.setState({ isLoggingIn: false })
        updateAlert({
          variables: {
            title: "Error",
            body: `login failed: ${JSON.stringify(err)}`,
            actions: [
              {
                text: 'も一度',
                alertResponse: 'NEUTRAL',
              }
            ]
          }
        })
        console.log('login failed:', JSON.stringify(err))
      }
    } else {
      this.setState({ isLoggingIn: false })
    }
  }

  @autobind
  onChangeEmail(e) {
    const email = e.target.value
    this.state.formObject.set('email', email)
    this.setState(({formObject}) => ({ formObject: formObject.set('email', email) }))
  }

  @autobind
  onChangePassword(e) {
    const password = e.target.value
    this.setState(({formObject}) => ({ formObject: formObject.set('password', password) }))
  }
}

Login.propTypes = {
  updateAlert: PropTypes.func.isRequired,
}

export default withRouter(TransitionWrapper(withAlert(Login)))
