import React from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { selectAuthUser } from '../../redux/features/authSlice'
import { Textarea, IconButton, Box } from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'
import Loading from '../../components/Loading'

const Editor = ({ history, match }) => {

     const authUser = useSelector(selectAuthUser)
     const [text, setText] = React.useState('')

     const { id } = match.params

     React.useEffect(() => {
          if(authUser.authenticated && id) {
               axios.get(`http://localhost:9090/notes/${id}`, 
                    { headers: { "Authorization": `Bearer ${authUser.token}` },
               }).then(res => {
                    // console.log(res);
                    setText(res.data.note)
               })
               .catch(({response}) => console.log(response))
          }
     }, [authUser.authenticated, authUser.token, id, match.params])

     const editHandler = () => {
          if(!text) return 

          axios.post(`http://localhost:9090/notes/${id}/update`, {
                    note: text
               },
               { headers: { "Authorization": `Bearer ${authUser.token}` },
          }).then(res => {
               console.log(res);
               history.push("/")
          })
          .catch(({response}) => console.log(response))
     }

     const createHandler = () => {
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

     if(id && !text) return <Loading />

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
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    autoFocus
                    required
               />
               <span className="floating-bottom-right">
                    <IconButton
                         onClick={id? editHandler : createHandler}
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
