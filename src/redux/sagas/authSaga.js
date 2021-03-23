import { put, call, select } from 'redux-saga/effects'
import axios from 'axios'
import { authSuccess, authFail } from '../actions'
import { selectAuthUser } from '../features/authSlice'

export function* auth() {
     const { token } = yield select(selectAuthUser)
     const headers = { "Authorization": `Bearer ${token}` }

     try {
          const res = yield call(axios, 'http://localhost:9090/auth', { headers })
          yield put(authSuccess(res.data))
     } catch(err) {
          yield put(authFail(err.response.data))
     }
}