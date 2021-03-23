import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'

// Saga
import rootSaga from './sagas'

// Reducers
import modalsReducer from './features/modalSlice'
import authReducer from './features/authSlice'
import usersReducer from './features/usersSlice'
import notesReducer from './features/notesSlice'

const sagaMiddleware = createSagaMiddleware()

export default configureStore({
     reducer: { 
          auth: authReducer,
          users: usersReducer,
          notes: notesReducer,
          modals: modalsReducer,
     },
     middleware: [sagaMiddleware],
})

sagaMiddleware.run(rootSaga)