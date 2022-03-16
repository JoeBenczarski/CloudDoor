import React from 'react'

import { Auth } from "aws-amplify";
import { DataStore } from "@aws-amplify/datastore";
import { UnlockRequests } from "../models";
import BootstrapTable from "react-bootstrap-table-next";

const requestsColumns = [
    {
        dataField: 'id',
        text: 'ID'
    },
    {
        dataField: 'serial_number',
        text: 'Serial Number'
    },
    {
        dataField: 'request_user_id',
        text: 'Requester'
    },
    {
        dataField: 'request_time',
        text: 'Request Time'
    },
    {
        dataField: 'approval_time',
        text: 'Approval Time'
    },
    {
        dataField: 'approval_user_id',
        text: 'Approver'
    }
];

class ApproveRequests extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            requests: [],
            expanded: [],
            authUser: props.user,
            currRow: null
        }

        this.handleCancel = this.handleCancel.bind(this);
        this.handleApprove = this.handleApprove.bind(this);
        this.closeExpandedRow = this.closeExpandedRow.bind(this);
        this.handleOnExpand = this.handleOnExpand.bind(this);
    }

    handleCancel() {
        this.closeExpandedRow();
    }

    async handleApprove() {
        let awsTime = new Date().toISOString();
        const userId = this.state.authUser.username;
        await DataStore.save(
            UnlockRequests.copyOf(this.state.currRow, updated => {
                updated.approval_time = awsTime;
                updated.approval_user_id = userId;
            })
        );
        this.closeExpandedRow();
    }

    closeExpandedRow() {
        this.setState({
            expanded: [],
            currRow: null
        });
    }

    handleOnExpand(row, isExpand, rowIndex, e) {
        if (isExpand) {
            this.setState(() => ({
                expanded: [row.id],
                currRow: row
            }));
        } else {
            this.setState(() => ({
                expanded: [],
                currRow: null
            }));
        }
    }

    async componentDidMount() {
        const response = await DataStore.query(UnlockRequests);
        const user = await Auth.currentAuthenticatedUser();
        this.setState({
            requests: response,
            authUser: user
        });
    }

    render() {
        const expandRow = {
            renderer: row => (
                <div>
                    <p>Request: {row.id}</p>
                    <button onClick={this.handleCancel}>Cancel</button>
                    <br/>
                    <button onClick={this.handleApprove}>Approve</button>
                </div>
            ),
            expanded: this.state.expanded,
            onExpand: this.handleOnExpand
        };
        return (
            <div>
                <h2 className="page-header">Requests</h2>
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card__body">
                                <BootstrapTable
                                    keyField='id'
                                    data={ this.state.requests }
                                    columns={ requestsColumns }
                                    expandRow={ expandRow }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ApproveRequests
