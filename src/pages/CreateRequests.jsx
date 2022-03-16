import React from 'react'

import { Auth } from "aws-amplify";
import { DataStore } from "@aws-amplify/datastore";
import { UnlockRequests } from "../models";
import {QrReader} from "react-qr-reader";
import {BrowserRouter, Route} from "react-router-dom";
import {AmplifySignOut} from "@aws-amplify/ui-react";

class CreateRequests extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            authUser: props.user,
            door: null
        }

        this.onQrReadResult = this.onQrReadResult.bind(this);
        this.onClickUnlock = this.onClickUnlock.bind(this);
        this.onClickCancel = this.onClickCancel.bind(this);
        this.renderUnlockView = this.renderUnlockView.bind(this);
        this.renderScanView = this.renderScanView.bind(this);
    }

    async componentDidMount() {
        const user = await Auth.currentAuthenticatedUser();
        this.setState({
            authUser: user
        });
    }

    onQrReadResult(result, error) {
        if (!!result) {
            this.setState({
                door: result?.text,
            });
        }
        if (!!error) {
            console.log(error);
        }
    }

    async onClickUnlock() {
        let door = this.state.door;
        let username = this.state.authUser.username;
        let awsTime = new Date().toISOString();
        console.log("Requested Door: ", door);
        console.log("Requester: ", username);
        console.log("Request Time: ", awsTime);
        await DataStore.save(
            new UnlockRequests({
                "serial_number": door,
                "request_user_id": username,
                "request_time": awsTime
            })
        );
    }

    onClickCancel() {
        this.setState({door: null});
    }

    renderUnlockView() {
        return (
            <div>
                <h2 className="page-header">Requests</h2>
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card__body">
                                <p>Door: {this.state.door}</p>
                                <button onClick={this.onClickUnlock}>Unlock</button>
                                <button onClick={this.onClickCancel}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    renderScanView() {
        return (
            <div>
                <h2 className="page-header">Requests</h2>
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card__body">
                                <p>Please scan a door to unlock it</p>
                                <QrReader
                                    onResult={ (result, error) => this.onQrReadResult(result, error)}
                                    style={{width: '25%'}}
                                />
                                <AmplifySignOut />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        if (this.state.door == null) {
            return this.renderScanView();
        } else {
            return this.renderUnlockView();
        }
    }
}

export default CreateRequests;
