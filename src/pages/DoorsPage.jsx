import React from 'react'
import BootstrapTable from 'react-bootstrap-table-next';

import { DataStore } from '@aws-amplify/datastore';
import { Doors } from '../models';

//import doorList from '../assets/JsonData/doors-list.json'

const doorColumns = [
    {
        dataField: 'id',
        text: 'ID'
    },
    {
        dataField: 'serial_number',
        text: 'Serial Number'
    },
    {
        dataField: 'allowed_unlock_group',
        text: 'Allowed Group'
    },
    {
        dataField: 'allowed_unlock_time_start',
        text: 'Start'
    },
    {
        dataField: 'allowed_unlock_time_end',
        text: 'End'
    }
]

const doorRowEvents = {
    onDoubleClick: (e, row, rowIndex) => {
        console.log(e);
        console.log(row);
        console.log(rowIndex);
    }
}

class DoorsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            doors: []
        }
    }

    async componentDidMount() {
        const response = await DataStore.query(Doors);
        this.setState({doors: response});
    }

    render() {
        return (
            <div>
                <h2 className="page-header">Doors</h2>
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card__body">
                                <BootstrapTable
                                    keyField='id'
                                    data={ this.state.doors }
                                    columns={ doorColumns }
                                    rowEvents={ doorRowEvents }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DoorsPage
