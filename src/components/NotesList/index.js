import React from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectAuthUser } from '../../redux/features/authSlice'
import { Wrap, WrapItem, Box } from '@chakra-ui/react'
import Loading from '../Loading'

// import './style.css'

const NotesList = () => {
     const authUser = useSelector(selectAuthUser)
     const [notes, setNotes] = React.useState()

     const history = useHistory()

     React.useEffect(() => {     
          axios.get('http://localhost:9090/notes', { headers: { "Authorization": `Bearer ${authUser.token}` }})
          .then(res => {
               // console.log(res); 
               setNotes(res.data)
          })
          .catch(({ response }) => console.log(response))

     }, [])

     const clickHandler = (id) => {
          history.push('/viewer/' + id)
     }

     if(!notes) return <Loading />

     if(!notes.length) return (
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
          { notes.map(data => 
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
               onClick={() => clickHandler(data._id)}> 
               { data.note }
               </WrapItem> 
          )}
          </Wrap>
     )
}

export default NotesList
