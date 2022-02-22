import React from 'react'

import ReactModal from 'react-modal'

import BootstrapTable from 'react-bootstrap-table-next';

import Table from '../components/table/Table'

import userList from '../assets/JsonData/users-list.json'

const userTableHead = [
    'Id',
    'Email',
    'Group'
]

ReactModal.setAppElement('#root');

class UsersPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            currIndex: null
        }

        this.handleModalSubmit = this.handleModalSubmit.bind(this);
        this.handleModalCancel = this.handleModalCancel.bind(this);
    }

    onClickRowModify(index) {
        this.setState({showModal: true, currIndex: index});
    }

    handleModalSubmit () {
        this.setState({ showModal: false, currIndex: null });
        console.log("Submitting changes");
    }

    handleModalCancel () {
        this.setState({ showModal: false, currIndex: null });
        console.log("Cancelled changes");
    }

    renderHead(item, index) {
        return (
            <th key={index}>{item}</th>
        )
    }

    renderBody(item, index) {
        return (
            <tr key={index}>
                <td>{item.id}</td>
                <td>{item.email}</td>
                <td>{item.group}</td>
                <td>
                    <button onClick={() => this.onClickRowModify(index)}>Modify</button>
                </td>
            </tr>
        )
    }

    render() {
        return (
            <div>
                <h2 className="page-header">Users</h2>
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card__body">
                                <Table
                                    limit='10'
                                    headData={userTableHead}
                                    renderHead={(item, index) => this.renderHead(item, index)}
                                    bodyData={userList}
                                    renderBody={(item, index) => this.renderBody(item, index)}
                                />
                                <ReactModal
                                    isOpen={this.state.showModal}
                                    contentLabel="Minimal Modal Example"
                                >
                                    <div>
                                        <input readOnly type="text" defaultValue={this.state.currIndex ? userList[this.state.currIndex].email : "email"}/>
                                        <input type="text" defaultValue={this.state.currIndex ? userList[this.state.currIndex].group : "group"}/>
                                        <button onClick={this.handleModalSubmit}>Submit</button>
                                        <button onClick={this.handleModalCancel}>Cancel</button>
                                    </div>
                                </ReactModal>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UsersPage
