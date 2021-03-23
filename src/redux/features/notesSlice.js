import { createSlice } from '@reduxjs/toolkit'

const initialState = {
     userNotes: [],
     currentNote: null,
     loading: {
          userNotesLoading: false,
          currentNoteLoading: false,
          createNoteLoading: false,
          updateNoteLoading: false
     },
     errors: {
          userNotesError: false,
          currentNoteError: false,
          createNoteError: false,
          updateNoteError: false
     }
}

const notesSlice = createSlice({
     name: 'notes',
     initialState,
     reducers: {
          // User notes 
          getUserNotes: state => { state.loading.userNotesLoading = true },
          setUserNotes: (state, action) => { state.userNotes = action.payload },
          getUserNotesSuccess: (state, action) => {
               state.loading.userNotesLoading = false
               state.errors.userNotesError =  null
               state.userNotes = action.payload
          },
          getUserNotesFail: (state, action) => {
               state.loading.userNotesLoading = false
               state.errors.userNotesError = action.payload
               state.userNotes = null
          },
          clearUserNotes: state => { state.userNotes = null },
          // Current note
          getCurrentNote: state => { state.loading.currentNoteLoading = true },
          setCurrentNote: (state, action) => { state.currentNote = action.payload },
          getCurrentNoteSuccess: (state, action) => {
               state.loading.currentNoteLoading = false
               state.errors.currentNoteError =  null
               state.currentNote = action.payload
          },
          getCurrentNoteFail: (state, action) => {
               state.loading.currentNoteLoading = false
               state.errors.createNoteError =  null
               state.errors.createNoteError = action.payload
               state.currentNote = null
          },
          clearCurrentNote: state => { state.currentNote = null },
     },
})

export const { 
     setUserNotes, getUserNotes, clearUserNotes,
     setCurrentNote, getCurrentNote, clearCurrentNote,
} = notesSlice.actions

export const selectUserNotes = state => state.notes.userNotes
export const selectCurrentNote = state => state.notes.currentNote
export const selectNotesErrors = state => state.notes.errors
export const selectNotesLoading = state => state.notes.loading

export default notesSlice.reducer