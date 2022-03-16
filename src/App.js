import React from 'react';
import { AmplifyAuthenticator, AmplifySignIn } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import { Container } from 'react-bootstrap'

import PrivilegedLayout from './components/layout/PrivilegedLayout';
import NonPrivilegedLayout from './components/layout/NonPrivilegedLayout';

import './App.css';
import groupInfo from './../src/assets/JsonData/groups.json'

function renderPrivilegedLayout(user) {
    return (
        <Container className="App">
            <PrivilegedLayout user={user} />
        </Container>
    );
}

function renderNonPrivilegedLayout(user) {
    const name = user.attributes.given_name;
    return (
        <Container className="App">
            <NonPrivilegedLayout user={user} />
        </Container>
    );
}
function isUserPrivileged(groups) {
    let isUserPrivileged = (groups.includes(groupInfo.Admin["group-name"]) ||
                            groups.includes(groupInfo.Approver["group-name"]));
    return isUserPrivileged;
}
function renderSignedIn(user) {
    const groups = user.signInUserSession.accessToken.payload["cognito:groups"];
    return isUserPrivileged(groups) ?  renderPrivilegedLayout(user) : renderNonPrivilegedLayout(user);
}

function renderSignIn() {
    return (
        <AmplifyAuthenticator>
            <AmplifySignIn
                headerText="Sign in to your account"
                slot="sign-in"
                formFields={[
                    {
                        type: "username",
                        label: "Username *",
                        placeholder: "",
                        inputProps: { required: true, autocomplete: "username" },
                    },
                    {
                        type: "password",
                        label: "Password *",
                        placeholder: "",
                        inputProps: { required: true, autocomplete: "new-password" },
                    }
                ]}
                hideSignUp="true"
            />
        </AmplifyAuthenticator>
    );
}

export default function App() {
    const [authState, setAuthState] = React.useState();
    const [user, setUser] = React.useState();

    React.useEffect(() => {
        return onAuthUIStateChange((nextAuthState, authData) => {
            setAuthState(nextAuthState);
            setUser(authData)
        });
    }, []);

    if (authState === AuthState.SignedIn && user) {
        return renderSignedIn(user);
    } else {
        return renderSignIn();
    }
}
