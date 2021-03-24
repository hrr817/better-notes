import { 
     _AUTH_SUCCESS, _AUTH_FAIL,
     _SIGN_IN_SUCCESS, _SIGN_IN_FAIL,
     _SIGN_UP_SUCCESS, _SIGN_UP_FAIL,
     _GET_USER_NOTES_SUCCESS, _GET_USER_NOTES_FAIL,
     _GET_CURRENT_NOTE_SUCCESS, _GET_CURRENT_NOTE_FAIL,
     _CREATE_NOTE_SUCCESS, _CREATE_NOTE_FAIL,
     _UPDATE_NOTE_SUCCESS, _UPDATE_NOTE_FAIL
} from '../constants'

export const authSuccess = payload => ({ type: _AUTH_SUCCESS, payload })
export const authFail = payload => ({ type: _AUTH_FAIL, payload })

export const signInSuccessAction = payload => ({ type: _SIGN_IN_SUCCESS, payload })
export const signInFailAction = payload => ({ type: _SIGN_IN_FAIL, payload })

export const signUpSuccessAction = payload => ({ type: _SIGN_UP_SUCCESS, payload })
export const signUpFailAction = payload => ({ type: _SIGN_UP_FAIL, payload })


export const getUserNotesSuccessAction = payload => ({ type: _GET_USER_NOTES_SUCCESS, payload })
export const getUserNotesFailAction = payload => ({ type: _GET_USER_NOTES_FAIL, payload })

export const getCurrentNoteSuccessAction = payload => ({ type: _GET_CURRENT_NOTE_SUCCESS, payload })
export const getCurrentNoteFailAction = payload => ({ type: _GET_CURRENT_NOTE_FAIL, payload })

export const createNoteSuccessAction = payload => ({ type: _CREATE_NOTE_SUCCESS, payload })
export const createNoteFailAction = payload => ({ type: _CREATE_NOTE_FAIL, payload })

export const updateNoteSuccessAction = payload => ({ type: _UPDATE_NOTE_SUCCESS, payload })
export const updateNoteFailAction = payload => ({ type: _UPDATE_NOTE_FAIL, payload })