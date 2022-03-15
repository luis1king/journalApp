import { db } from "../firebase/firebase-config"



export const loadNotes = async (uid) =>{

    //para obtener snapshot de la bbdd
const notesSnap = await db.collection(`${uid}/journal/notes`).get();
const notes = []; // si no hay nada en notesSnap, devolvemos un array vacio

//de aqui llamamos a cada nota que se encuentra dentro del snap
notesSnap.forEach( notesHijo => {
   notes.push({
       id: notesHijo.id,
       ...notesHijo.data()    //añadimos un nuevo elemento
   });                        //Y obtenemos un nuevo array con sus respectivo objeto
});

 //console.log(notes)
return notes;

}