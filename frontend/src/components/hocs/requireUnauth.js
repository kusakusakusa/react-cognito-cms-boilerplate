import React from 'react'
import Auth from '@aws-amplify/auth'

export default function requireUnauth(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        checkedAuthentication: true
      }
    }

    componentDidMount() {
      Auth.currentSession()
      .then(session => {
        this.props.history.push('/')
      })
      .catch(err => {
        this.setState({ checkedAuthentication: false })
      })
    }

    render() {
      if (this.state.checkedAuthentication) {
        return null
      }

      return <WrappedComponent {...this.props} />
    }
  };
}
