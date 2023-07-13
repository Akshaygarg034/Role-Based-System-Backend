import React, {useEffect, useContext} from 'react';
import noteContext from '../context/notes/noteContext';
import Usercard from './Usercard';
import { useHistory } from 'react-router-dom';

function Admin(props) {
    const history =  useHistory();
    const context = useContext(noteContext);
    const { fetchallUsers, users } = context;

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
            fetchallUsers();
        }
        else {
            history.push('/login');
        }
        // eslint-disable-next-line
    }, [])
    
    return (
        <div>
            <h1 style={{textAlign:'center', marginBottom:'3%'}}>STUDENTS</h1>
            <div className="container">
                <div className='row'>
                    {users.map((user) => {
                        return <div key = {user._id} className='col-md-4 my-2'>
                            <Usercard user = {user}/>
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default Admin
