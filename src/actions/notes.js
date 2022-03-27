import Swal from "sweetalert2";
import { db } from "../firebase/firebase-config";
import { types } from "../types/types";
import { loadNotes } from "./loadNotes";



export const activeNote = (id, note) => ({
    type: types.notesActive,
   payload:{
       id,
       ...note
   }
})

export const startNewNote = () =>{
    /**Con el sergundo parametro, getState podemos obtener el estado (funcionaria como use selector) */
    return async (dispatch, getState) => {
        
        const stateUid = getState().auth.uid;
        //const {uid} = getState().auth; Se puede usar destructuracion
        //console.log(stateUid)
        //funcion para crear la nota que queremos guardar

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()  //getTime sirve para grabar el momento exacto
        }

        /*para grabar en la bd de firestore, escribimos la dirección de la ruta en la cual quremos grabar la nueva nota */
        const doc = await db.collection(`${stateUid}/journal/notes`).add(newNote);
      //  console.log(doc)
      dispatch(activeNote(doc.id,newNote));
        dispatch(addNewNote(doc.id,newNote));
    }
}


export const addNewNote = ( id, note ) => ({
    type: types.notesAddNew,
    payload: {
        id, ...note
    }
})

export const setNotes = (notes) => ({
    type: types.notesLoad,
    payload: notes
})

export const startLoadingNotes =  (uid) =>{
    return async ( dispatch)=>{
        const notes = await loadNotes(uid); //esperamos una promise
        dispatch(setNotes(notes));
    }
}

export const startSaveNotes = (note) => {
    
    return async ( dispatch, getState) => {
        
        const {uid} = getState().auth;

        // console.log(uid)
        if (!note.url){ //nota.url no hay nada, eliminamos url(para que no salte error(nota.url es undefined, y no es valido para mandar a firebase))
            delete note.url;
        }
        
        
        const noteToFirestore = {...note};
        delete noteToFirestore.id; //eliminamos id porque aqui no se necesita
        //console.log(noteToFirestore)
        await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore);
        //esperamos que se actualice la nota en la bbdd

        dispatch(refreshNote(note.id, noteToFirestore));
        Swal.fire('Saved', note.title, 'success');
        
    }
}

//Apuntamos a la nota que queremos actualizar
export const refreshNote = (id, note) => ({
    type: types.noteUpdated,
    payload: {
        id, note:{
            id, ...note
        }
    }
})

//para borrar nota de la bbdd
export const startDelete = (id)=>{
    return async ( dispatch, getState ) =>{
        const uid = getState().auth.uid;
        await db.doc(`${uid}/journal/notes/${id}`).delete();
        dispatch(deleteNote(id));
    }
}

//para borrar la nota dentro de la app, es una accion sincrona
export const deleteNote = (id) => ({
type: types.notesDelete,
payload: id,
})

export const notesLogoutCleaning=() => ({
    type: types.notesLogoutCleaning,
    
})



