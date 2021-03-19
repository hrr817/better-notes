import { takeLatest } from 'redux-saga/effects'

import { _AUTH, _SIGN_IN, _SIGN_UP } from './constants'

import { auth } from './authSaga.js'
import { signInSaga } from './signInSaga'
import { signUpSaga } from './signUpSaga'

export default function* rootSaga() {
     yield takeLatest(_AUTH, auth)
     yield takeLatest(_SIGN_IN, signInSaga)
     yield takeLatest(_SIGN_UP, signUpSaga)
}