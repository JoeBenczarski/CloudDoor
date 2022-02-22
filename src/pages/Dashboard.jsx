import React from 'react'

import { Link } from 'react-router-dom'

import Table from '../components/table/Table'

import Badge from '../components/badge/Badge'

const recentUnlockActivity = {
    header: [
        "id",
        "user",
        "time",
        "status"
    ],
    body: [
        {
            request_id: "OD1711",
            user_id: "john",
            request_timestamp: "1642976854",
            status: "pending"
        },
        {
            request_id: "OD1712",
            user_id: "frank",
            request_timestamp: 1642976847,
            status: "pending"
        },
        {
            request_id: "OD1713",
            user_id: "anthony",
            request_timestamp: 1642976840,
            status: "pending"
        },
        {
            request_id: "OD1714",
            user_id: "frank",
            request_timestamp: 1642976822,
            status: "approved"
        },
        {
            request_id: "OD1715",
            user_id: "anthony",
            request_timestamp: 1642976810,
            status: "approved"
        }
    ]
}

const requestStatus = {
    "pending": "warning",
    "approved": "success"
}

const renderUnlockRequestHead = (item, index) => (
    <th key={index}>{item}</th>
)

const renderUnlockRequestBody = (item, index) => (
    <tr key={index}>
        <td>{item.request_id}</td>
        <td>{item.user_id}</td>
        <td>{new Intl.DateTimeFormat('en-US',{   year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(item.request_timestamp)}</td>
        <td>
            <Badge type={requestStatus[item.status]} content={item.status}/>
        </td>
    </tr>
)

const Dashboard = () => {

    return (
        <div>
            <h2 className="page-header">Dashboard</h2>
            <div className="row">
                <div className="col-8">
                    <div className="card">
                        <div className="card__header">
                            <h3>Recent Requests</h3>
                        </div>
                        <div className="card__body">
                            <Table
                                headData={recentUnlockActivity.header}
                                renderHead={(item, index) => renderUnlockRequestHead(item, index)}
                                bodyData={recentUnlockActivity.body}
                                renderBody={(item, index) => renderUnlockRequestBody(item, index)}
                            />
                        </div>
                        <div className="card__footer">
                            <Link to='/'>view all</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
