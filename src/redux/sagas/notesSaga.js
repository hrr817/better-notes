import { put, call, select } from 'redux-saga/effects'
import axios from 'axios'
import { 
     getUserNotesSuccessAction, getUserNotesFailAction, 
     getCurrentNoteSuccessAction, getCurrentNoteFailAction,
     createNoteSuccessAction, createNoteFailAction,
     updateNoteSuccessAction, updateNoteFailAction,
     deleteNoteSuccessAction, deleteNoteFailAction
} from '../actions'
import { selectAuthUser } from '../features/authSlice'

export function* getUserNotesSaga() {
     const { token } = yield select(selectAuthUser)
     const headers = { "Authorization": `Bearer ${token}` }

     try {
          const res = yield call(axios, 'http://localhost:9090/notes', { headers })
          // console.log(res)
          yield put(getUserNotesSuccessAction(res.data))
     } catch(err) {
          console.log(err.response)
          yield put(getUserNotesFailAction(err.response.data))
     }
}

export function* getCurrentNoteSaga({ payload }) {
     const { token } = yield select(selectAuthUser)
     const headers = { "Authorization": `Bearer ${token}` }

     try {
          const res = yield call(axios, `http://localhost:9090/notes/${payload}`, { headers })
          // console.log(res)
          yield put(getCurrentNoteSuccessAction(res.data))
     } catch(err) {
          console.log(err.response)
          yield put(getCurrentNoteFailAction(err.response.data))
     }
}

export function* createNoteSaga({ payload }) {
     const { token } = yield select(selectAuthUser)
     const headers = { "Authorization": `Bearer ${token}` }

     try {
          const res = yield call(axios.post, `http://localhost:9090/notes/create`, payload, { headers })
          // console.log(res)
          yield put(createNoteSuccessAction(res.data.notes))
     } catch(err) {
          console.log(err.response)
          yield put(createNoteFailAction(err.response.data))
     }
}


export function* updateNoteSaga({ payload }) {
     const { token } = yield select(selectAuthUser)
     const headers = { "Authorization": `Bearer ${token}` }

     try {
          const res = yield call(axios.post, `http://localhost:9090/notes/${payload.id}/update`, payload.data, { headers })
          console.log(res)
          yield put(updateNoteSuccessAction(res.data.notes))
     } catch(err) {
          console.log(err.response)
          yield put(updateNoteFailAction(err.response.data))
     }
}

export function* deleteNoteSaga({ payload }) {
     const { token } = yield select(selectAuthUser)
     const headers = { "Authorization": `Bearer ${token}` }

     try {
          const res = yield call(axios.post, `http://localhost:9090/notes/${payload.id}/delete`, {}, { headers })
          // console.log(res)
          yield put(deleteNoteSuccessAction(res.data.notes))
     } catch(err) {
          console.log(err.response)
          yield put(deleteNoteFailAction(err.response.data))
     }
}