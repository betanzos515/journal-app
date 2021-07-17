import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote, startDeleting } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {
    
    const dispatch = useDispatch();

    const { active:note } = useSelector(state => state.notes);
    const activeId = useRef(note.id);
    
    const [ formValues, handleInputChange,reset] = useForm(note);
    
    useEffect(() => {
        if(note.id !== activeId.current){
            reset(note);
            activeId.current = note.id;
        }
    }, [reset,note]);

    useEffect(() => {
        dispatch(activeNote(formValues.id, {...formValues}));
    }, [formValues,dispatch])

    const handleDelete = ()=>{
        dispatch( startDeleting( note.id ) )
    }

    const { body, title } = formValues;

    return (
        <div className='notes__main-content'>
            <NotesAppBar/>

            <div className='notes__content'>
                <input 
                    type="text"
                    placeholder='Some awesome title'
                    className='notes__title-input'
                    value={title}
                    name='title'
                    onChange={handleInputChange}
                />
                <textarea 
                    placeholder='what happen today'
                    className='notes__textarea'
                    value={body}
                    name='body'
                    onChange={handleInputChange}
                ></textarea>
                
                {
                    note.url && 
                    <div className='notes__image'>
                        <img src={note.url}  alt='imagen'/>
                    </div>
                }
            </div>
            <button 
                className='btn btn-danger'
                style={{color:'black'}}
                onClick={handleDelete}
            >
                    Delete
            </button>
        </div>
    )
}
