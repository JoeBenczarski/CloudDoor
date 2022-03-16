import React from 'react'

import { Route, Switch } from 'react-router-dom'

import Dashboard from '../pages/Dashboard'
import ApproveRequests from '../pages/ApproveRequests'
import CreateRequests from "../pages/CreateRequests";

const Routes = () => {
    return (
        <Switch>
            <Route path='/' exact component={ Dashboard }/>
            <Route path='/approveRequests' component={ ApproveRequests }/>
            <Route path='/createRequests' component={ CreateRequests }/>
        </Switch>
    )
}

export default Routes;
