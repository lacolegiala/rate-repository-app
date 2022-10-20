import React from 'react';
import AuthStorage from '../utils/authStorage';

const AuthStorageContext = React.createContext<AuthStorage>({} as AuthStorage);

export default AuthStorageContext;