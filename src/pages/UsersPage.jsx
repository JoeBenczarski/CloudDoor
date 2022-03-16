import React from 'react'

import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';

import userList from '../assets/JsonData/users-list.json'

const usersListColumns = [
    {
        dataField: 'id',
        text: 'ID',
        editable: false
    },
    {
        dataField: 'email',
        text: 'Email',
        editable: false

    },
    {
        dataField: 'group',
        text: 'Group',
        editable: true,
        editor: {
            type: Type.SELECT,
            options: [
                {
                    value: 'doorvk-auth-admins',
                    label: 'doorvk-auth-admins'
                },
                {
                    value: 'doorvk-auth-users',
                    label: 'doorvk-auth-users'
                }
            ]
        }
    },
    {
        dataField: 'isSuspended',
        text: "Suspended",
        editable: true,
        editor: {
            type: Type.SELECT,
            options: [
                {
                    value: 'True',
                    label: 'True'
                },
                {
                    value: 'False',
                    label: 'False'
                }
            ]
        }
    }
]

function beforeSaveCell(oldValue, newValue, row, column, done) {
    setTimeout(() => {
        if (window.confirm('Do you want to accept this change?')) {
            done(true);
        } else {
            done(false);
        }
    }, 0);
    return { async: true };
}

const RemoteCellEdit = (props) => {
    const cellEdit = {
        mode: 'dbclick',
        beforeSaveCell,
        blurToSave: true,
        errorMessage: props.errorMessage
    };
    return (
        <BootstrapTable
            remote={ { cellEdit: true } }
            keyField='id'
            data={ props.data }
            columns={ usersListColumns }
            cellEdit={ cellEditFactory(cellEdit) }
            onTableChange={ props.onTableChange }
        />
    );
}

class UsersPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            errorMessage: null
        }
    }

    componentDidMount() {
        const response = userList;
        this.setState({data: response});
    }

    handleTableChange(type, {data, cellEdit: { rowId, dataField, newValue } }) {
        setTimeout(async () => {
            let updatedRow = null;
            const result = data.map((row) => {
                if (row.id === rowId) {
                    let newRow = {...row};
                    newRow[dataField] = newValue;
                    updatedRow = newRow;
                    return newRow;
                }
                return row;
            });
            console.log(updatedRow);
            // update database with updatedRow
        }, 2000);
    }

    render() {
        return (
            <div>
                <h2 className="page-header">Users</h2>
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card__body">
                                <RemoteCellEdit
                                    data={ this.state.data }
                                    errorMessage={ this.state.errorMessage }
                                    onTableChange={ this.handleTableChange }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UsersPage
