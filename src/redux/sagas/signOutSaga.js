import { put } from 'redux-saga/effects'
import { 
     clearAuthAction,
     signOutSuccessAction, signOutFailAction,
     clearUserNotesAction, clearCurrentNoteAction
} from '../actions'

export function* signOutSaga() {
     try {
          yield put(clearUserNotesAction())
          yield put(clearCurrentNoteAction())
          yield put(clearAuthAction())
          yield put(signOutSuccessAction())
     } catch(err) {
          console.log(err)
          yield put(signOutFailAction(err))
     }
}