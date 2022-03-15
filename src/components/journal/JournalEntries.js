import React from 'react'
import { useSelector } from 'react-redux';
import { JournalEntry } from './JournalEntry';

export const JournalEntries = () => {

    const {notes} = useSelector( state => state.notes ); 
    //Seleccionams las notas guardadas de la bbdd

   //console.log(notes)
    return (
        <div className="journal__entries">
            
            {
                notes.map( nota => (
                    <JournalEntry key={ nota.id }
                    {...nota} />// le estamos pasando por props todo los elementos que incluye
                ))
            }

        </div>
    )
}
