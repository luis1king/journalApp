import React from 'react';
import moment from 'moment';//nos permite extraer el date y convertir en formatos de fechas
import { useDispatch } from 'react-redux';
import { activeNote } from '../../actions/notes';


//recibimos las props y las desestructuramos
export const JournalEntry = ({id,date,title,body,url}) => {
    // console.log(id,date,title,body,url)

    const dispatch = useDispatch();
    const noteDate = moment(date);
    
    const handleEntryClick = () => {
        dispatch(activeNote(id, {date,title,body,url}));
    }
   // console.log(id)

    return (
        <div className="journal__entry pointer" onClick={handleEntryClick}>
            
          {  //si el url existe (difereente de undefined), entonces muestra la img
                url &&
              <div 
                className="journal__entry-picture"
                style={{
                    backgroundSize: 'cover',
                    backgroundImage: `url(${url})`// el url que debeb mostar si hay una img, si no hay url es undefined
                }}
            ></div>
            }

            <div className="journal__entry-body">
                <p className="journal__entry-title">
                   {title}
                </p>
                <p className="journal__entry-content">R
                  {body}
                </p>
            </div>

            <div className="journal__entry-date-box">
                <span>{noteDate.format('dddd')}</span>
                <h4>{noteDate.format('l')}</h4>
            </div>

        </div>
    )
}
