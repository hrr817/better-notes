/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAuthUser } from '../../redux/features/authSlice'
import { 
     getCurrentNote, selectCurrentNote, clearCurrentNote, 
     createNote, updateNote,     
     selectNotesLoading,
     selectNotesSuccess,
     selectNotesErrors,
} from '../../redux/features/notesSlice'
import { Textarea, IconButton, Box } from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'
import Loading from '../../components/Loading'
import LoadingOverlay from '../../components/LoadingOverlay';

const Editor = ({ history, match }) => {
     const { id } = match.params
     const dispatch = useDispatch()

     const authUser = useSelector(selectAuthUser)
     const currentNote = useSelector(selectCurrentNote)
     const { currentNoteLoading, createNoteLoading, updateNoteLoading } = useSelector(selectNotesLoading)
     const { createNoteSuccess, updateNoteSuccess } = useSelector(selectNotesSuccess)
     const { currentNoteError, updateNoteError } = useSelector(selectNotesErrors)

     const [text, setText] = React.useState('')

     useEffect(() => {
          if(id && !currentNote) dispatch(getCurrentNote(id))

          return () => dispatch(clearCurrentNote())
     }, [])

     useEffect(() => {
          if(currentNote) setText(currentNote.note)
     }, [currentNote])

     useEffect(() => {
          if(createNoteSuccess) {
               setTimeout(() => history.push('/'), 200)
          }

          if(updateNoteSuccess) {
               setTimeout(() => history.push('/view/' + id), 200)
          }
     }, [createNoteSuccess, updateNoteSuccess])
     
     const createHandler = () => {
          if(!text) return 

          const newNote = {
               note: text,
               author: {
                    id: authUser.data._id,
                    name: authUser.data.username,
               }
          }

          dispatch(createNote(newNote))
     }

     const updateHandler = () => {
          if(!text) return 

          const temp = {
               id,
               data: {
                    note: text
               }
          }

          dispatch(updateNote(temp))
     }

     if(currentNoteLoading) return <Loading />

     if(!authUser.authenticated) return (
     <Box 
          p="4"
          margin="auto"
          mt="5"
          color="red.400" 
          bg="blackAlpha.300" 
          width="80%"
          maxWidth="500px"
          borderRadius="10"
          textAlign="center"
          >
          Please sign in first.
     </Box>)

     return (
          <div style={{ height: '100%', position: 'relative' }}>
          {
               (createNoteLoading || updateNoteLoading) &&  <LoadingOverlay />
          }
          <form style={{ height: '100%', position: 'relative'}}>
               <Textarea 
                    className="scrollbar"
                    p="2"
                    color="whiteAlpha.800"
                    placeholder="Write something here"
                    max-width="100%"
                    height="100%"
                    border="none"
                    focusBorderColor="transparent"
                    resize="none"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    disabled={createNoteLoading || updateNoteLoading}
                    autoFocus
                    required
               />
               <span className="floating-bottom-right">
                    <IconButton
                         onClick={id? updateHandler : createHandler}
                         mb="3"
                         mr="3"
                         size="lg"
                         aria-label={id? 'Save' : 'Create'}
                         colorScheme="blue"
                         icon={<CheckIcon />}
                         isRound
                    />
               </span>
          </form>
          </div>
     )
}

export default Editor
