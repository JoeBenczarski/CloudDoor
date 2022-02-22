import React from 'react'

import Table from '../components/table/Table'

import { DataStore } from '@aws-amplify/datastore';
import { Doors } from '../models';

//import doorList from '../assets/JsonData/doors-list.json'

const doorTableHead = [
    'Id',
    'Serial Number',
    'Allowed Group',
    'Allowed Start',
    'Allowed End'
]

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

    renderHead(item, index) {
        return (
            <th key={index}>{item}</th>
        );
    }

    renderBody(item, index) {
        return (
            <tr key={index}>
                <td>{item.id}</td>
                <td>{item.serial_number}</td>
                <td>{item.allowed_unlock_group}</td>
                <td>{item.allowed_unlock_time_start}</td>
                <td>{item.allowed_unlock_time_end}</td>
            </tr>
        );
    }

    render() {
        return (
            <div>
                <h2 className="page-header">Doors</h2>
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card__body">
                                <Table
                                    limit='1000'
                                    headData={doorTableHead}
                                    renderHead={(item, index) => this.renderHead(item, index)}
                                    bodyData={this.state.doors}
                                    renderBody={(item, index) => this.renderBody(item, index)}
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
