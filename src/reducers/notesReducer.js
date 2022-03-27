import { types } from "../types/types";


const initialState = {
    notes:[],
    active: null
}

export const notesReducer = (state = initialState, action) =>{
        switch(action.type){

            case types.notesActive: 
            return{
                ...state,
                active: {...action.payload}

            }

            case  types.notesAddNew:
                return {
                    ...state,
                    notes: [ action.payload, ...state.notes ]
                }
    

            case types.notesLoad :
                return{
                    ...state,
                    notes: [...action.payload]
                }

                
            case types.noteUpdated :
                return{
                    ...state,//delvolvemos estado anterior
                    // modificamos la nota qu se encuentra dentro de notes
                    /* Si la nota.id es exactamente igual a su action.payload.id 
                    Entonces retornamos la nota del payload, en caso contrario devolvemos la nota 
                    como estaba*/
                    notes: state.notes.map(
                        note => note.id === action.payload.id
                        ? action.payload.note : note
                    )
                }

                case types.notesDelete:
                    return{
                        ...state,
                        active: null,
                        //la nota a borrar no puede ser activa
                        notes: state.notes.filter(note => note.id !== action.payload)
                        //retorna todas las notas menos la que seleccinamos para borrar
                          }

                case types.notesLogoutCleaning:
                    return{
                        ...state,
                        active: null,
                        notes:[]
                    }          


            default: return state;
        }
}

