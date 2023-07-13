import React from 'react';
import { useContext } from 'react';
import noteContext from '../context/notes/noteContext';
import { Link } from "react-router-dom";

function Usercard(props) {
    const context = useContext(noteContext);
    const { deleteUser } = context;
    const { user } = props;

    return (
        <div className="card" style={{ width: '18rem' }}>
            <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <p className="card-text">{user.role}</p>
                <div className="icons d-flex justify-content-end">
                    <i className="fa-solid fa-trash-can" onClick={() => {
                        deleteUser(user._id);
                        props.showAlert("User deleted successfully", "success")
                    }}></i>
                </div>
                <Link to={`/notes/${user._id}`} className="btn btn-primary">View Notes</Link>
            </div>
        </div>
    )
}

export default Usercard
