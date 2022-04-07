import React, { useEffect, useState } from 'react';
import axios from 'axios'
import * as constants from './constantFile.js'

export const context = React.createContext({});

const ProviderA = (props) => {
    var [user, setUser] = useState(null);

    useEffect(() => {
        axios.get(`${constants.SERVER_URL}/getuser`, { withCredentials : true})
        .then((response) => {  setUser(response.data) }) }, []);
    return <context.Provider value={user}>{props.children}</context.Provider>;
}
export default ProviderA;