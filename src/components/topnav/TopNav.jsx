import React from 'react'
import { Link } from 'react-router-dom'
import {AmplifySignOut} from "@aws-amplify/ui-react";

import './topnav.css'

import Dropdown from '../dropdown/Dropdown'
import ThemeMenu from '../thememenu/ThemeMenu'

import user_menu from '../../assets/JsonData/user_menus.json'


const renderUserToggle = (user) => (
    <div className="topnav__right-user">
        <div className="topnav__right-user__name">
            {user.display_name}
        </div>
    </div>
)

const renderUserMenu =(item, index) => (
    <Link to='/' key={index}>
        <div className="notification-item">
            <i className={item.icon}></i>
            <AmplifySignOut/>
        </div>
    </Link>
)

const Topnav = (props) => {
    const user = {
        display_name: props.username
    }
    return (
        <div className='topnav'>
            <div className="topnav__search">
            </div>
            <div className="topnav__right">
                <div className="topnav__right-item">
                    {/* dropdown here */}
                    <Dropdown
                        customToggle={() => renderUserToggle(user)}
                        contentData={user_menu}
                        renderItems={(item, index) => renderUserMenu(item, index)}
                    />
                </div>
                <div className="topnav__right-item">
                    <ThemeMenu/>
                </div>
            </div>
        </div>
    )
}

export default Topnav
