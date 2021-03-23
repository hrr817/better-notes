import { put, call } from 'redux-saga/effects'
import axios from 'axios'
import { signInSuccessAction, signInFailAction } from '../actions'

export function* signInSaga({ payload }) {
     const { email, password } = payload

     try {
          const res = yield call(axios.post, 'http://localhost:9090/signIn', { email, password })
          yield put(signInSuccessAction(res.data))
     } catch(err) {
          yield put(signInFailAction(err.response.data))
     }
}