import _ from 'lodash'
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Auth from '@aws-amplify/auth'
import TransitionGroup from 'react-transition-group/TransitionGroup'
import CSSTransition from 'react-transition-group/CSSTransition'
import { Grid, Cell } from 'styled-css-grid';

import requireAuth from '_hocs/requireAuth'

import TransitionWrapper from '_transitions/TransitionWrapper'

const TransitionGroupWrapper = React.lazy(() => import('_transitions/TransitionGroupWrapper'))
const Sidebar = React.lazy(() => import('_sidebar/Sidebar'))
const Dashboard = React.lazy(() => import('_miscellaneous/Dashboard'))
const Form = React.lazy(() => import('_inputs/Form'))
const Cards = React.lazy(() => import('_cards/Cards'))
const Charts = React.lazy(() => import('_charts/Charts'))
const TableScreen = React.lazy(() => import('_screens/TableScreen'))

const Main = ({
  location,
  history
}) => {
  return(
    <React.Fragment>
      <Sidebar location={location} history={history}/>
      <React.Suspense fallback={<div/>}>
        <TransitionGroupWrapper>
          <TransitionGroup>
            <CSSTransition
              key={`Main_${location.pathname}`}
              timeout={Number(TRANSITION_TIMEOUT)}
              classNames="fade"
              appear>

              <Switch location={location}>
                <Route
                  path="/"
                  exact={true}
                  render={props => (
                    <React.Suspense fallback={<div/>}>
                      <Dashboard {...props}/>
                    </React.Suspense>
                  )}/>
                <Route
                  path="/form"
                  exact={true}
                  render={props => (
                    <React.Suspense fallback={<div/>}>
                      <Form {...props}/>
                    </React.Suspense>
                  )}/>
                <Route
                  path="/table"
                  exact={true}
                  render={props => (
                    <React.Suspense fallback={<div/>}>
                      <TableScreen {...props}/>
                    </React.Suspense>
                  )}/>
                <Route
                  path="/cards"
                  exact={true}
                  render={props => (
                    <React.Suspense fallback={<div/>}>
                      <Cards {...props}/>
                    </React.Suspense>
                  )}/>
                <Route
                  path="/charts"
                  exact={true}
                  render={props => (
                    <React.Suspense fallback={<div/>}>
                      <Charts {...props}/>
                    </React.Suspense>
                  )}/>
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        </TransitionGroupWrapper>
      </React.Suspense>
    </React.Fragment>
  )
}

export default requireAuth(TransitionWrapper(Main))
