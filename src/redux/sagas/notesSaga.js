import { put, call, select } from 'redux-saga/effects'
import axios from 'axios'
import { getUserNotesSuccessAction, getUserNotesFailAction } from '../actions'
import { selectAuthUser } from '../features/authSlice'

export function* notesSaga() {
     const { token } = yield select(selectAuthUser)
     const headers = { "Authorization": `Bearer ${token}` }

     try {
          const res = yield call(axios, 'http://localhost:9090/notes', { headers })
          console.log(res)
          yield put(getUserNotesSuccessAction(res.data))
     } catch(err) {
          console.log(err.response)
          yield put(getUserNotesFailAction(err.response.data))
     }
}