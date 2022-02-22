import React from 'react'

import Table from '../components/table/Table'

import { DataStore } from "@aws-amplify/datastore";
import { UnlockRequests } from "../models";

//import requestList from '../assets/JsonData/requests-list.json'

const requestTableHead = [
    'Id',
    'Serial Number',
    'Requester',
    'Request Time',
    'Approval Time',
    'Approver'
]

const renderHead = (item, index) => <th key={index}>{item}</th>

const renderBody = (item, index) => (
    <tr key={index}>
        <td>{item.id}</td>
        <td>{item.serial_number}</td>
        <td>{item.request_user_id}</td>
        <td>{item.request_time}</td>
        <td>{item.approval_time}</td>
        <td>{item.approval_user_id}</td>
    </tr>
)

class RequestsPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            unlockRequests: [],
        }
    }
    async componentDidMount() {
        const response = await DataStore.query(UnlockRequests);
        this.setState({unlockRequests: response })
    }

    render() {
        return (
            <div>
                <h2 className="page-header">Requests</h2>
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card__body">
                                <Table
                                    limit='10'
                                    headData={requestTableHead}
                                    renderHead={(item, index) => renderHead(item, index)}
                                    bodyData={this.state.unlockRequests}
                                    renderBody={(item, index) => renderBody(item, index)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RequestsPage
