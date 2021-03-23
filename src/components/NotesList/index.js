/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUserNotes, selectUserNotes, selectNotesLoading, setCurrentNote } from '../../redux/features/notesSlice'
import { Wrap, WrapItem, Box } from '@chakra-ui/react'
import Loading from '../Loading'

const NotesList = () => {
     const dispatch = useDispatch()
     const userNotes = useSelector(selectUserNotes)
     const { userNotesLoading } = useSelector(selectNotesLoading)

     const history = useHistory()

     console.log(userNotes)

     useEffect(() => {
          if(!userNotes.length) dispatch(getUserNotes())
     }, [])

     const clickHandler = (data) => {
          dispatch(setCurrentNote(data))
          history.push('/view/' + data._id)
     }

     if(userNotesLoading) return <Loading />

     if(!userNotes.length) return (
     <Box 
          p="4"
          margin="auto"
          mt="5"
          color="gray.400" 
          bg="blackAlpha.300" 
          width="80%"
          maxWidth="500px"
          borderRadius="10"
          textAlign="center"
          >
          You have not created any notes.
     </Box>)

     return (
          <Wrap 
          p="2"
          pb="2.5"
          m="2"
          ml="auto"
          mr="auto"
          w="100%"
          maxW="1100px"
          justify="center"
          spacing="4"
          >
          { userNotes.map(data => 
               <WrapItem 
               key={ data._id }
               p="1.5"
               pl="2.5"
               pr="2.5"
               w="100%"
               maxW="300px"
               h="auto"
               maxH="155px"
               overflow="hidden"
               whiteSpace="pre-line"
               textOverflow="revert"
               cursor="pointer"
               bg="white"
               borderRadius="12"
               onClick={() => clickHandler(data)}> 
               { data.note }
               </WrapItem> 
          )}
          </Wrap>
     )
}

export default NotesList
