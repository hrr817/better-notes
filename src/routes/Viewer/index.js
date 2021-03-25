/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectAuthUser } from '../../redux/features/authSlice'
import { 
     getCurrentNote, selectCurrentNote, clearCurrentNote, 
     deleteNote, 
     selectNotesLoading,
     selectNotesSuccess,
     selectNotesErrors,
} from '../../redux/features/notesSlice'
import Loading from '../../components/Loading'
import { IconButton, Box } from '@chakra-ui/react'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'

import './style.css'
import LoadingOverlay from '../../components/LoadingOverlay';

const Viewer = ({ history, match }) => {
     const dispatch = useDispatch()
     const authUser = useSelector(selectAuthUser)
     const currentNote = useSelector(selectCurrentNote)
     const { currentNoteLoading, deleteNoteLoading } = useSelector(selectNotesLoading)
     const { deleteNoteSuccess } = useSelector(selectNotesSuccess)
     const { deleteNoteError } = useSelector(selectNotesErrors)

     const { id } = match.params

     useEffect(() => {
          if(!currentNote) dispatch(getCurrentNote(id))

          return () => dispatch(clearCurrentNote())
     }, [])

     useEffect(() => {
          if(deleteNoteSuccess) {
               setTimeout(() => history.push('/'), 200)
          }
     }, [deleteNoteSuccess])

     const deleteHandler = () => {
          if(!id) return

          dispatch(deleteNote({ id }))
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
          <div style={{position: 'relative', height: '100%'}}>
          {deleteNoteLoading && <LoadingOverlay />}
          <div style={{ maxWidth: '1000px', margin: 'auto' }} className="scrollbar">
               <pre className="format-text" style={{ padding: '0.5rem'}}>
                    { currentNote && currentNote.note }
               </pre>
               <span className="floating-bottom-right">
                    {id && <IconButton
                         onClick={deleteHandler}
                         mb="3"
                         mr="3"
                         size="lg"
                         aria-label="Delete"
                         colorScheme="red"
                         icon={<DeleteIcon />}
                         isRound
                    /> }
                    <IconButton
                         as={Link}
                         to={`/editor/${id}`}
                         mb="3"
                         mr="3"
                         size="lg"
                         aria-label="Edit Note"
                         colorScheme="blue"
                         icon={<EditIcon />}
                         isRound
                    />
               </span>
          </div>
          </div>
     )
}

export default Viewer
