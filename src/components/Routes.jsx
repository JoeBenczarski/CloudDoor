import React from 'react'

import { Route, Switch } from 'react-router-dom'

import Dashboard from '../pages/Dashboard'
import RequestsPage from '../pages/RequestsPage'
import DoorsPage from '../pages/DoorsPage'
import UsersPage from '../pages/UsersPage'

const Routes = () => {
    return (
        <Switch>
            <Route path='/' exact component={Dashboard}/>
            <Route path='/requests' component={RequestsPage}/>
            <Route path='/doors' component={DoorsPage}/>users
            <Route path='/users' component={UsersPage}/>
        </Switch>
    )
}

export default Routes;
