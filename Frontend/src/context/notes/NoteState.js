import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
    const host = 'http://localhost:5000';
    const InitialNotes = [];
    const [notes, setNotes] = useState(InitialNotes);
    const [users, setUsers] = useState([]);
    const [opennotes, setOpenNotes] = useState([]);

    // Get User Notes
    const getNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchusernotes`, {
            method: 'GET',
            headers: {
                'auth-token': localStorage.getItem('token')
            },
        });
        const json = await response.json();
        setNotes(json);
    }
    // Add a Note
    const addNote = async (title, description) => {
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description})
        });
        const note = await response.json();
        setNotes(notes.concat(note));
    }
    // Delete a Note
    const deleteNote = async (id) => {
        await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        const newNotes = opennotes.filter((note) => { return note._id !== id });
        setOpenNotes(newNotes);
    }

    // Edit a Note
    const editNote = async (id, title, description) => {
        await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description})
        });
        let newNotes = JSON.parse(JSON.stringify(opennotes));
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                element.title = title;
                element.description = description;
                break;
            }

        }
        setOpenNotes(newNotes);
    }

    // Fetch All Users
    const fetchallUsers = async () => {
        const response = await fetch(`${host}/api/auth/fetchall`, {
            method: 'POST',
            headers: {
                'auth-token': localStorage.getItem('token')
            },
        });
        const json = await response.json();
        setUsers(json);
    }

    // Delete User
    const deleteUser = async (id) => {
        await fetch(`${host}/api/auth//deleteuser/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        const new_users = users.filter((user) => { return user._id !== id });
        setUsers(new_users);
    }

    // Open user Notes
    const openNotes = async (id) => {
        const response = await fetch(`${host}/api/notes/fetchnotesbyid/${id}`, {
             method: 'POST',
             headers: {
                 'auth-token': localStorage.getItem('token')
             },
         });
         const new_open_notes = await response.json();
         setOpenNotes(new_open_notes);
     }
    
    return (
        <noteContext.Provider value={{ notes, users, opennotes, addNote, deleteNote, editNote, getNotes, fetchallUsers, deleteUser, openNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}
export default NoteState;