import React, {useEffect, useState} from 'react'

import './layout.css'

import Routes from '../Routes'

import { BrowserRouter, Route } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'

import ThemeAction from '../../redux/actions/ThemeAction'
import { AmplifySignOut } from "@aws-amplify/ui-react";
import { QrReader } from 'react-qr-reader';

import {UnlockRequests} from "../../models";
import {DataStore} from "@aws-amplify/datastore";

const NonPrivilegedLayout = (props) => {
    const themeReducer = useSelector(state => state.ThemeReducer);
    const dispatch = useDispatch();
    const [data, setData] = useState(null);
    const [user, setUser] = useState(props.user);

    useEffect(() => {
        const themeClass = localStorage.getItem('themeMode', 'theme-mode-light');
        const colorClass = localStorage.getItem('colorMode', 'theme-mode-light');
        dispatch(ThemeAction.setMode(themeClass));
        dispatch(ThemeAction.setColor(colorClass));
    }, [dispatch])

    function onQrReadResult(result, error) {
        if (!!result) {
            setData(result?.text);
        }
        if (!!error) {
            console.log(error);
        }
    }

    async function onClickUnlock() {
        let door = data;
        let username = user.username;
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

    function onClickCancel() {
        setData(null);
    }

    function renderUnlockView(data) {
        return (
            <BrowserRouter>
                <Route render={(props) => (
                    <div className={`layout ${themeReducer.mode} ${themeReducer.color}`}>
                        <div className="layout__content">
                            <div className="layout__content-main">
                                <p>Door: {data}</p>
                                <button onClick={onClickUnlock}>Unlock</button>
                                <button onClick={onClickCancel}>Cancel</button>
                                <AmplifySignOut />
                            </div>
                        </div>
                    </div>
                )}/>
            </BrowserRouter>
        );
    }

    function renderScanView(data) {
        return (
            <BrowserRouter>
                <Route render={(props) => (
                    <div className={`layout ${themeReducer.mode} ${themeReducer.color}`}>
                        <div className="layout__content">
                            <div className="layout__content-main">
                                <p>{user.attributes.given_name}, Please scan a door to unlock it</p>
                                <QrReader
                                    onResult={ (result, error) => onQrReadResult(result, error)}
                                    style={{width: '25%'}}
                                />
                                <AmplifySignOut />
                            </div>
                        </div>
                    </div>
                )}/>
            </BrowserRouter>
        );
    }

    if (data == null) {
        return renderScanView(data);
    } else {
        return renderUnlockView(data);
    }
}

export default NonPrivilegedLayout;
