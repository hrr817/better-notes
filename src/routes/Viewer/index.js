/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectAuthUser } from '../../redux/features/authSlice'
import { showNavbar, hideNavbar } from '../../redux/features/navbarSlice'
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

import LoadingOverlay from '../../components/LoadingOverlay';
import './style.css'

import { useScrollHook } from '../../customHooks/useScrollHook'

const Viewer = ({ history, match }) => {
     
     const dispatch = useDispatch()
     const authUser = useSelector(selectAuthUser)
     
     const currentNote = useSelector(selectCurrentNote)
     const { currentNoteLoading, deleteNoteLoading } = useSelector(selectNotesLoading)
     const { deleteNoteSuccess } = useSelector(selectNotesSuccess)
     const { currentNoteError, deleteNoteError } = useSelector(selectNotesErrors)

     const { id } = match.params
     const [scrollInfo, onScrollHandler] = useScrollHook({ threshold: 20 })

     useEffect(() => {
          scrollInfo.scrolledDown? dispatch(showNavbar()) : dispatch(hideNavbar())
     }, [scrollInfo.scrolledDown])
     
     useEffect(() => {
          if(!currentNote) dispatch(getCurrentNote(id))
          
          return () => dispatch(clearCurrentNote())
     }, [])

     useEffect(() => {
          if(!currentNote) dispatch(getCurrentNote(id))
     }, [authUser.authenticated])
     
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

     if(currentNoteError) return (
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
               {currentNoteError.message}
          </Box>
     )

     const showButtons = authUser.authenticated && !currentNoteError && (currentNote && currentNote.author.id === authUser.data._id)

     return (
          <div
               className={`main-container${scrollInfo.scrolledDown? ' full-view' : ' scrollbar'}`}
               onScroll={onScrollHandler}
          >
               {deleteNoteLoading && <LoadingOverlay />}
               <div>
                    <pre className="format-text" style={{ padding: '0.5rem', height: '100%' }}>
                         { currentNote && currentNote.note }
                    </pre>
                    {showButtons && <span className={`floating-bottom-right${scrollInfo.scrolledDown? ' hide-down' : ''}`}>
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
                    </span>}
               </div>
          </div>
     )
}

export default Viewer
