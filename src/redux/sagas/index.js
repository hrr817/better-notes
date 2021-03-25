import { takeLatest } from 'redux-saga/effects'

import { 
     _AUTH, _SIGN_IN, _SIGN_UP, _GET_USER_NOTES, _GET_CURRENT_NOTE, _CREATE_NOTE, _UPDATE_NOTE, _SIGN_OUT,
     _DELETE_NOTE,
} from '../constants'

import { auth } from './authSaga.js'
import { signInSaga } from './signInSaga'
import { signOutSaga } from './signOutSaga'
import { signUpSaga } from './signUpSaga'
import { 
     getUserNotesSaga, getCurrentNoteSaga,
     createNoteSaga, updateNoteSaga,
     deleteNoteSaga
} from './notesSaga'

export default function* rootSaga() {
     yield takeLatest(_AUTH, auth)
     yield takeLatest(_SIGN_IN, signInSaga)
     yield takeLatest(_SIGN_UP, signUpSaga)
     yield takeLatest(_SIGN_OUT, signOutSaga)
     yield takeLatest(_GET_USER_NOTES, getUserNotesSaga)
     yield takeLatest(_GET_CURRENT_NOTE, getCurrentNoteSaga)
     yield takeLatest(_CREATE_NOTE, createNoteSaga)
     yield takeLatest(_UPDATE_NOTE, updateNoteSaga)
     yield takeLatest(_DELETE_NOTE, deleteNoteSaga)
}