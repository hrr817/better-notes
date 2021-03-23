import { takeLatest } from 'redux-saga/effects'

import { _AUTH, _SIGN_IN, _SIGN_UP, _GET_USER_NOTES } from '../constants'

import { auth } from './authSaga.js'
import { signInSaga } from './signInSaga'
import { signUpSaga } from './signUpSaga'
import { notesSaga } from './notesSaga'

export default function* rootSaga() {
     yield takeLatest(_AUTH, auth)
     yield takeLatest(_SIGN_IN, signInSaga)
     yield takeLatest(_SIGN_UP, signUpSaga)
     yield takeLatest(_GET_USER_NOTES, notesSaga)
}