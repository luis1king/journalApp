import React, { useEffect,useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { activeNote, startDelete } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {
    const dispatch = useDispatch();

    //podemos renombrar con los :
    //seleccinamos la nota activa
    const {active:note} = useSelector( state => state.notes );
    const [formValues, handleInputChange, reset] = useForm(note);
    /*el useForm maneja su propio estado, por tanto no se actualiza las notas 
    Por tanto, tenmos que modificar el useForm*/

    const {body,title, id} = formValues;//extraemos la info 
    //console.log(formValues);

    //useRef, selecciona el valor mutable, y no renderiza todo el componente si el valor cambia
    const activeId = useRef(note.id) //apunta al valor de la nota seleccionada

    //ojo con el bucle que puede crear el hook
    /*Tenemos que comparar, la nota active.id con la nota de use selector  */

    useEffect(() => {
        /*Si el note.id es diferente al active.note.current,
        entoces se resetea el formulario, y manda nueva nota*/
      if(note.id !== activeId.current){
          reset ( note ) ; //se resetea
          activeId.current = note.id // nueva nota seleccionada
      }
    }, [ note , reset ]) // mandamos las dependecias

    useEffect(() => {// se dispara cuando hay cambio en (formValues)
                        //es decir en el tttle y/o body
      
     dispatch(activeNote(formValues.id,{...formValues}));
      
    }, [formValues,dispatch]);

    const handleDelete=()=>{
        dispatch(startDelete(id))
    }
    

    return (
        <div className="notes__main-content">
            
            <NotesAppBar />

            <div className="notes__content">

                <input 
                    type="text"
                    name="title"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                    value={title} //aplicamos la info para que se muestre
                    onChange={ handleInputChange }
                />

                <textarea
                    name="body"
                    placeholder="What happened today"
                    className="notes__textarea"
                    value={body} //aplicamos la info para que se muestre
                    onChange={ handleInputChange }
                ></textarea>

                { //si note.url existe, mostramos el siguiente codigo
                    (note.url) 
                    &&
                    <div className="notes__image">
                    <img 
                        src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg"
                        alt="imagen"
                    />
                </div>
            }


            </div>
        
            <button onClick={handleDelete} className='btn btn-danger'>
            Delete</button>

        </div>
    )
}
