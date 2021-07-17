import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth';
import { JournalEntries } from './JournalEntries';
import Swal from 'sweetalert2';
import { startNewNote } from '../../actions/notes';

export const Sidebar = () => {
    const {name} = useSelector(state => state.auth)
    const dispatch = useDispatch();
    const handleLogout = ()=>{
        Swal.fire({
            title: 'Estas seguro que quieres cerrar la sesión',
            text: "Estas apunto de cerrar la sesion en Journal App",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, cerrar sesion!'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Listo!',
                'Tu sesion ah sido cerrada',
                'success'
                )
                dispatch(startLogout());
            }
          })
    }

    const handleAddNotes = ()=>{  
      dispatch(startNewNote());
    }
    
    return (
        <aside className='journal__sidebar'> 
            <div className='journal__sidebar-navbar'>
                <h3 className='mt-5'>
                <i className="far fa-moon"></i>
                    <span>{name}</span>
                </h3>
                <button className='btn' onClick={handleLogout}>Logout</button>
            </div>

            <div 
            className='journal__new-entry'
            onClick={handleAddNotes}
            >
                <i className='far fa-calendar-plus fa-5x'></i>
                <p> New Entry </p>
            </div>
            <JournalEntries/>       
        </aside>
    )
}
