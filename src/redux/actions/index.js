import { 
     _AUTH_SUCCESS, _AUTH_FAIL,
     _CLEAR_AUTH,
     _SIGN_IN_SUCCESS, _SIGN_IN_FAIL,
     _SIGN_OUT_SUCCESS, _SIGN_OUT_FAIL,
     _SIGN_UP_SUCCESS, _SIGN_UP_FAIL,
     _GET_USER_NOTES_SUCCESS, _GET_USER_NOTES_FAIL,
     _CLEAR_USER_NOTES,
     _GET_CURRENT_NOTE_SUCCESS, _GET_CURRENT_NOTE_FAIL,
     _CLEAR_CURRENT_NOTE,
     _CREATE_NOTE_SUCCESS, _CREATE_NOTE_FAIL,
     _UPDATE_NOTE_SUCCESS, _UPDATE_NOTE_FAIL,
     _DELETE_NOTE_SUCCESS, _DELETE_NOTE_FAIL,
} from '../constants'

export const authSuccessAction = payload => ({ type: _AUTH_SUCCESS, payload })
export const authFailAction = payload => ({ type: _AUTH_FAIL, payload })

export const clearAuthAction = () => ({ type: _CLEAR_AUTH })

export const signInSuccessAction = payload => ({ type: _SIGN_IN_SUCCESS, payload })
export const signInFailAction = payload => ({ type: _SIGN_IN_FAIL, payload })

export const signOutSuccessAction = payload => ({ type: _SIGN_OUT_SUCCESS, payload })
export const signOutFailAction = payload => ({ type: _SIGN_OUT_FAIL, payload })

export const signUpSuccessAction = payload => ({ type: _SIGN_UP_SUCCESS, payload })
export const signUpFailAction = payload => ({ type: _SIGN_UP_FAIL, payload })

export const getUserNotesSuccessAction = payload => ({ type: _GET_USER_NOTES_SUCCESS, payload })
export const getUserNotesFailAction = payload => ({ type: _GET_USER_NOTES_FAIL, payload })

export const clearUserNotesAction = () => ({ type: _CLEAR_USER_NOTES })

export const getCurrentNoteSuccessAction = payload => ({ type: _GET_CURRENT_NOTE_SUCCESS, payload })
export const getCurrentNoteFailAction = payload => ({ type: _GET_CURRENT_NOTE_FAIL, payload })

export const clearCurrentNoteAction = () => ({ type: _CLEAR_CURRENT_NOTE })

export const createNoteSuccessAction = payload => ({ type: _CREATE_NOTE_SUCCESS, payload })
export const createNoteFailAction = payload => ({ type: _CREATE_NOTE_FAIL, payload })

export const updateNoteSuccessAction = payload => ({ type: _UPDATE_NOTE_SUCCESS, payload })
export const updateNoteFailAction = payload => ({ type: _UPDATE_NOTE_FAIL, payload })

export const deleteNoteSuccessAction = payload => ({ type: _DELETE_NOTE_SUCCESS, payload })
export const deleteNoteFailAction = payload => ({ type: _DELETE_NOTE_FAIL, payload })