import React from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { selectAuthUser } from '../../redux/features/authSlice'
import { Textarea, IconButton, Box } from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'

const Editor = ({ history }) => {

     const authUser = useSelector(selectAuthUser)
     const textareaRef = React.useRef()

     const submitHandler = () => {
          const text = textareaRef.current.value
          
          if(!text) return 

          axios.post('http://localhost:9090/notes/create', {
                    note: text,
                    author: {
                         id: authUser.data._id,
                         name: authUser.username,
                    }
               },
               { headers: { "Authorization": `Bearer ${authUser.token}` },
          }).then(res => {
               // console.log(res);
               history.push("/")
          })
          .catch(({response}) => console.log(response))
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

     return (
          <form style={{ padding: '0.5rem', height: "85vh"}}>
               <Textarea 
                    p="2"
                    color="whiteAlpha.800"
                    placeholder="Write something here"
                    max-width="100%"
                    height="100%"
                    border="none"
                    focusBorderColor="transparent"
                    resize="none"
                    ref={textareaRef}
                    autoFocus
                    required
               />
               <span className="floating-bottom-right">
                    <IconButton
                         onClick={submitHandler}
                         mb="3"
                         mr="3"
                         size="lg"
                         aria-label="Save Note"
                         colorScheme="blue"
                         icon={<CheckIcon />}
                         isRound
                    />
               </span>
          </form>
     )
}

export default Editor
