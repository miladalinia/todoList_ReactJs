import React from 'react';

const AuthContext = React.createContext({
    authenticated : false,
    login : () => {},
    logout : () => {},
})

export default AuthContext;