import Swal from "sweetalert2";
import { db } from "../firebase/firebase-config";
import { fileUpload } from "../helpers/fileUpload";
import { loadNotes } from "../helpers/loadNotes";
import { Toast } from "../helpers/toast";
import { types } from "../types/types";


//como es una instruccion asincrona vamos a ocupar retornar un callback
export const startNewNote = () => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid;

    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
    };

    const doc = await db.collection(`${uid}/journal/notes`).add(newNote);

    dispatch(activeNote(doc.id, newNote));
    dispatch( addNewNote( doc.id, newNote ))

  };
};
export const addNewNote = (id,note)=>({
  type: types.notesAddNew,
  payload:{
    id,
    ...note
  } 
});
export const activeNote = (id, note) => ({
  type: types.notesActive,
  payload: {
    id,
    ...note,
  },
});

export const startLoadingNotes = (uid) => {
  return async (dispatch) => {
    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  };
};

export const setNotes = (notes) => ({
  type: types.notesLoad,
  payload: notes,
});

export const startSaveNote = ( note )=>{
  return async (dispatch, getState)=>{

    const { uid } = getState().auth;

    if(!note.url){
      delete note.url;
    }

    const noteToFirestore = {...note}; //<- creamos una copia para no manipular la nota original que nos llega por parametro.
    delete noteToFirestore.id;

    await db.doc(`/${uid}/journal/notes/${note.id}`).update(noteToFirestore);
    dispatch( refreshNote( note.id, noteToFirestore ) )
    Swal.fire('Saved',note.title,'success');
  }
}

export const refreshNote = ( id, note )=>({
  type: types.notesUpdated,
  payload:{
    id,
    note:{
      id,
      ...note
    }
  }
});

export const startUploading = ( file )=>{
  return async ( dispatch,  getState )=>{
    const { active : activeNote } = getState().notes;
    
    Toast.fire({
      icon: 'success',
      title: 'Uploading ...'
    })
    
    const fileUrl = await fileUpload( file );

    activeNote.url = fileUrl
    dispatch( startSaveNote( activeNote ) )
 
    Toast.close();
  }
}

export const startDeleting = ( id )=>{
  return async ( dispatch, getState ) => {
    const uid = getState();
    await db.doc(`${ uid.auth.uid }/journal/notes/${ id }`).delete();
    dispatch( deleteNote( id ) )
  }
}

export const deleteNote = (id)=>({
  type: types.notesDelete,
  payload: id
})

export const noteLogout = ()=>({
  type: types.notesLogoutCleaning,
});