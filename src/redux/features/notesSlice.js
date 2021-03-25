import { createSlice } from '@reduxjs/toolkit'

const initialState = {
     userNotes: [],
     currentNote: null,
     loading: {
          userNotesLoading: false,
          currentNoteLoading: false,
          createNoteLoading: false,
          updateNoteLoading: false,
          deleteNoteLoading: false
     },
     success: {
          userNotesSuccess: false,
          currentNoteSuccess: false,
          createNoteSuccess: false,
          updateNoteSuccess: false,
          deleteNoteSuccess: false,
     },
     errors: {
          userNotesError: false,
          currentNoteError: false,
          createNoteError: false,
          updateNoteError: false,
          deleteNoteError: false,
     },
}

const notesSlice = createSlice({
     name: 'notes',
     initialState,
     reducers: {
          // User notes 
          getUserNotes: state => { state.loading.userNotesLoading = true },
          setUserNotes: (state, action) => { state.userNotes = action.payload },
          getUserNotesSuccess: (state, action) => {
               state.success.userNotesSuccess =  true
               state.loading.userNotesLoading = false
               state.errors.userNotesError =  null
               state.userNotes = action.payload
          },
          getUserNotesFail: (state, action) => {
               state.success.userNotesSuccess =  false
               state.loading.userNotesLoading = false
               state.errors.userNotesError = action.payload
               state.userNotes = null
          },
          clearUserNotes: state => { state.userNotes = [] },
          // Current note
          getCurrentNote: state => { state.loading.currentNoteLoading = true },
          setCurrentNote: (state, action) => { state.currentNote = action.payload },
          getCurrentNoteSuccess: (state, action) => {
               state.success.currentNoteSuccess = true
               state.loading.currentNoteLoading = false
               state.errors.currentNoteError =  null
               state.currentNote = action.payload
          },
          getCurrentNoteFail: (state, action) => {
               state.success.currentNoteSuccess = false
               state.loading.currentNoteLoading = false
               state.errors.createNoteError = action.payload
               state.currentNote = null
          },
          clearCurrentNote: state => { 
               state.currentNote = null
               state.success = initialState.success 
               state.errors = initialState.errors 
          },
          // Create note
          createNote: state => { state.loading.createNoteLoading = true },
          createNoteSuccess: (state, action) => {               
               state.userNotes = action.payload

               state.success.createNoteSuccess =  true
               state.errors.createNoteError = null
               state.loading.createNoteLoading = false
          }, 
          createNoteFail: (state, action) => {     
               state.success.currentNoteSuccess =  false
               state.errors.createNoteError = action.payload
               state.loading.createNoteLoading = false
          }, 
          // Update Note
          updateNote: state => { state.loading.updateNoteLoading = true },
          updateNoteSuccess: (state, action) => { 
               state.success.updateNoteSuccess =  true
               state.userNotes = action.payload
               state.errors.updateNoteError = false
               state.loading.updateNoteLoading = false 
          }, 
          updateNoteFail: (state, action) => {
               state.success.updateNoteSuccess =  false
               state.errors.updateNoteError = action.payload
               state.loading.updateNoteLoading = false 
          }, 
          // Delete Note
          deleteNote: state => { state.loading.deleteNoteLoading = true },
          deleteNoteSuccess: (state, action) => { 
               state.success.deleteNoteSuccess = true
               state.userNotes = action.payload
               state.errors.deleteNoteError = false
               state.loading.deleteNoteLoading = false 
          }, 
          deleteNoteFail: (state, action) => {
               state.success.deleteNoteSuccess = false
               state.errors.deleteNoteError = action.payload
               state.loading.deleteNoteLoading = false 
          }, 
     },
})

export const { 
     setUserNotes, getUserNotes, clearUserNotes,
     setCurrentNote, getCurrentNote, clearCurrentNote,
     createNote, updateNote, deleteNote
} = notesSlice.actions

export const selectUserNotes = state => state.notes.userNotes
export const selectCurrentNote = state => state.notes.currentNote
export const selectNotesSuccess = state => state.notes.success
export const selectNotesErrors = state => state.notes.errors
export const selectNotesLoading = state => state.notes.loading

export default notesSlice.reducer