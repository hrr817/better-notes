/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectAuthUser } from '../../redux/features/authSlice'
import { getCurrentNote, selectCurrentNote, clearCurrentNote, selectNotesLoading } from '../../redux/features/notesSlice'
import Loading from '../../components/Loading'
import { IconButton, Box } from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons'

import './style.css'

const Viewer = ({ match }) => {
     const dispatch = useDispatch()
     const authUser = useSelector(selectAuthUser)
     const currentNote = useSelector(selectCurrentNote)
     const { currentNoteLoading } = useSelector(selectNotesLoading)

     const { id } = match.params

     useEffect(() => {
          if(!currentNote) dispatch(getCurrentNote(id))

          return () => dispatch(clearCurrentNote())
     }, [])

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
          <div style={{ padding: '0.5rem', maxWidth: '1000px', margin: 'auto' }}>
               <pre className="format-text">
                    { currentNote && currentNote.note }
               </pre>
               <span className="floating-bottom-right">
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
     )
}

export default Viewer
