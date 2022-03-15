import React from 'react';
import { Sidebar } from './Sidebar';
import { NoteScreen } from '../notes/NoteScreen';
import { useSelector } from 'react-redux';
import { NothingSelected } from './NothingSelected';



export const JournalScreen = () => {

    const {active} = useSelector( state => state.notes );
    return (
        <div className="journal__main-content">
            
            <Sidebar />


            <main>
         {/*si la nota tiene algo seleccionado, mostramos note screen, sino la otra pag*/}
                {    
                    (active) ? (<NoteScreen />) : (<NothingSelected />)
                }
               
                

            </main>


        </div>
    )
}
