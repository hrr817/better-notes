import { put, call } from 'redux-saga/effects'
import axios from 'axios'
import { signUpSuccessAction, signUpFailAction} from './actions'

export function* signUpSaga({ payload }) {
     const { username, email, password } = payload
     try {
          const res = yield call(axios.post, 'http://localhost:9090/signup', { username, email, password })
          yield put(signUpSuccessAction(res.data))
     } catch(err) {
          yield put(signUpFailAction(err.response.data))
     }
}