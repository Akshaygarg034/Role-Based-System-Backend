import React, {useEffect, useContext} from 'react';
import { useHistory } from 'react-router-dom';
import noteContext from '../context/notes/noteContext';
import NoteItem from './Noteitem';

function Note() {
    const context = useContext(noteContext);
    const { notes, getNotes} = context;
    const history = useHistory();

    useEffect(() => {
        if(localStorage.getItem('token')){
            getNotes();
        }
        else{
            history.push('/login')
        }
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <div className='row my-3'>
                <h2>Your Notes</h2>
                <div className="container">
                    {notes.length===0 && 'No Notes to display'}
                </div>
                {notes.map((note) => {
                    return <NoteItem key={note._id} note={note}/>;
                })}
            </div>
        </>
    )
}

export default Note
