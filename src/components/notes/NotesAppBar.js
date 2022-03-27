import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startSaveNotes } from '../../actions/notes';
import moment from 'moment';

export const NotesAppBar = () => {

    const dispatch = useDispatch();
    const {active}= useSelector( state => state.notes );
    
    //guardar nota
    const handleSave = () => {
        dispatch(startSaveNotes(active))
       //console.log(active)
    }

    const {date} = active;
    console.log(date)
    const noteDate = moment(date);

    return (
        <div className="notes__appbar">
            <span>{noteDate.format('LL')}</span>

            <div>

                <button className="btn"
                        onClick={handleSave}>
                   Save
                </button>
            </div>
        </div>
    )
}
