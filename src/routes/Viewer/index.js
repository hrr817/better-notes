import React from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { selectAuthUser } from '../../redux/features/authSlice'
import Loading from '../../components/Loading'
import { IconButton, Box } from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons'

import './style.css'

const Viewer = ({ history, match }) => {
     const authUser = useSelector(selectAuthUser)
     const [noteData, setNoteData] = React.useState()

     React.useEffect(() => {
          const { id } = match.params
          if(authUser.authenticated && id) {
               axios.get(`http://localhost:9090/notes/${id}`, 
                    { headers: { "Authorization": `Bearer ${authUser.token}` },
               }).then(res => {
                    // console.log(res);
                    setNoteData(res.data)
               })
               .catch(({response}) => console.log(response))
          }
     }, [authUser.authenticated, authUser.token, match.params])

     const buttonHandler = () => {
          history.push('/editor')
     }

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

     if(!noteData) return <Loading />

     return (
          <div style={{ padding: '0.5rem', maxWidth: '1000px', margin: 'auto' }}>
               <pre className="format-text">
                    { noteData.note }
               </pre>
               <span className="floating-bottom-right">
                    <IconButton
                         onClick={buttonHandler}
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
