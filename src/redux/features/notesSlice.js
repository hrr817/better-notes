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
          updateNoteError: false,
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
          getCurrentNote: (state, action) => { state.loading.currentNoteLoading = true },
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
          // Create note
          createNote: state => { state.loading.createNoteLoading = true },
          createNoteSuccess: (state, action) => { 
               console.log(action.payload)
               state.userNotes = action.payload
               state.errors.createNoteError = null
               state.loading.createNoteLoading = false
          }, 
          createNoteFail: (state, action) => { 
               state.errors.createNoteError = action.payload
               state.loading.createNoteLoading = false
          }, 
          // Update Note
          updateNote: state => { state.loading.updateNoteLoading = true },
          updateNoteSuccess: (state) => { state.loading.updateNoteLoading = false }, 
          updateNoteFail: (state) => { state.loading.updateNoteLoading = false }, 
     },
})

export const { 
     setUserNotes, getUserNotes, clearUserNotes,
     setCurrentNote, getCurrentNote, clearCurrentNote,
     createNote, updateNote
} = notesSlice.actions

export const selectUserNotes = state => state.notes.userNotes
export const selectCurrentNote = state => state.notes.currentNote
export const selectNotesErrors = state => state.notes.errors
export const selectNotesLoading = state => state.notes.loading

export default notesSlice.reducer