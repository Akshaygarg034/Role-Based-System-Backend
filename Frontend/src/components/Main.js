import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function Main() {
    const history =  useHistory();

    const findRole = async() => {
        const response2 = await fetch('http://localhost:5000/api/auth/getrole', {
            method: 'POST',
            headers: {
                'auth-token': localStorage.getItem('token')
            },
        });
        const role = await response2.text();
        if (role === "student") history.push('/student');
        else if (role === "admin") history.push('/admin');
        else if (role === "superadmin") history.push('/superadmin');
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            findRole();
        }
        else {
            history.push('/login');
        }
        // eslint-disable-next-line
    }, [])

    return (<></>)
}

export default Main
