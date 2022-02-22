import React from 'react';
import './App.css';
import {AmplifyAuthenticator, AmplifySignIn, AmplifySignOut} from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import {Container} from 'react-bootstrap'
import AdminLayout from './components/adminlayout/AdminLayout'

function renderSignedInAdmin(user) {
    return (
        <Container className="App">
            <AdminLayout username="Admin" />
        </Container>
    );
}

function renderSignedInUser(user) {
    return (
        <div className="App">
            <h2>Scan a door to unlock it</h2>
            <AmplifySignOut />
        </div>
    );
}

function renderSignedIn(user) {
    const group_names = {
        'admin': 'doorvk-auth-admins',
        'user': 'doorvk-auth-users'
    }
    // the array of groups that the user belongs to
    const group = user.signInUserSession.accessToken.payload["cognito:groups"][0];
    return group === group_names.admin ?  renderSignedInAdmin(user) : renderSignedInUser(user);
}

function renderSignIn() {
    return (
        <AmplifyAuthenticator>
            <AmplifySignIn
                headerText="Sign in to your account"
                slot="sign-in"
                formFields={[
                    {
                        type: "email",
                        label: "Email Address *",
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
    }
    else {
        return renderSignIn();
    }
}
