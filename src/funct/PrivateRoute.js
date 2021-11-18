import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from './firebaseConfig';

function PrivateRouter({ component: Component, ...rest }) {
    const currentUser = useAuth();

    if (currentUser === null) {
        return (
            <h2>
                <Redirect to='/login' />{' '}
            </h2>
        );
    }
    return <Route {...rest} render={(props) => <Component {...props} />} />;
}

export default PrivateRouter;
