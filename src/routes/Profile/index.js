import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectAuthUser } from '../../redux/features/authSlice'
import { Avatar, Container, Flex, Spinner, Box, Spacer, Link, IconButton } from '@chakra-ui/react'
import { ChatIcon, NotAllowedIcon, AddIcon } from '@chakra-ui/icons'
import axios from 'axios'

const dummyData = {
     id: 0,
     username: '',
     email: '',
     gender: '',
     found: false,
     error: false,
}

const Profile = ({ match }) => {
     const { token } = useSelector(selectAuthUser)
     const { username } = match.params

     const [loading, setLoading] = useState(true)
     const [width, setWidth] = useState(window.screen.width)

     useEffect(() => {
          function changeWidth() {
               setWidth(window.screen.width)
          }
          window.addEventListener('resize', changeWidth)

          return () => {
               window.removeEventListener('resize', changeWidth)
          }
     }, [])
     
     useEffect(() => {
          (async () => {
               try {
                    const res = await axios(`http://localhost:9090/user/${username}`, {headers: {
                         authorization: `Bearer ${token}`
                    }})

                    const { data } = res

                    setUserData({
                         id: data._id,
                         username: data.username,
                         email: data.email,
                         gender: data.gender,
                         found: true,
                         error: false,
                    })
                    setLoading(false)
               } catch({ response }) {
                    if(response.status === 401) {
                         setUserData(prevData => ({
                              ...prevData,
                              found: true,
                              error: true
                         }))
                    }

                    if(response.status === 404) {
                         setUserData(prevData => ({
                              ...prevData,
                              found: false,
                              error: true
                         }))
                    }
                    setLoading(false)
               }
          })()
     }, [token, username])


     
     const [userData, setUserData] = useState(dummyData)
     
     if(loading) return <Flex style={{ height: '100vh' }} background="blackAlpha.800" justifyContent="center" alignItems="center"> <Spinner color="white" size="xl" /> </Flex>

     if(userData && userData.error && userData.found) return (
          <Box 
               p="4"
               margin="auto"
               mt="5"
               color="green.400" 
               bg="blackAlpha.300" 
               width="80%"
               maxWidth="500px"
               borderRadius="10"
               textAlign="center"
          >
                    Please login to view <Link href={`/@${username}`} color="whiteAlpha.800"> { username }</Link> profile.
          </Box>
     )

     if(userData && userData.error && !userData.found) return (
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
               Could not found <Link href={`/@${username}`} color="whiteAlpha.800"> { username }</Link> username.
          </Box>
     )

     return ( 
          <Box 
               p="6" 
               margin="auto"
               bg="blackAlpha.300" 
               mt={width > 768? 4 : 0}
               width={width > 768? "700px" : "100%"}
               borderRadius={width > 768? 5 : 0}
          >
               <Container centerContent>
                    <Avatar size="2xl" name={userData && userData.username}/>
               </Container>
               <Flex alignItems="center" pt="4" pb="2">
                    <Box color="whiteAlpha.800"> Username </Box>
                    <Spacer />
                    <Box color="yellowgreen" textTransform="capitalize"> { userData.username } </Box>
               </Flex>
               <Flex alignItems="center" pb="2">
                    <Box color="whiteAlpha.800"> Gender </Box>
                    <Spacer />
                    <Box color="yellowgreen" textTransform="capitalize"> { userData.gender || 'Unknown' } </Box>
               </Flex>
               <Flex alignItems="center" pb="2">
                    <Box color="whiteAlpha.800"> Email </Box>
                    <Spacer />
                    <Box color="yellowgreen"> { userData.email } </Box>
               </Flex>
               <Flex alignItems="center" justifyContent="center" mt="4">
                    <IconButton icon={<NotAllowedIcon />} aria-label="Block" colorScheme="red" mr="4"/>
                    <IconButton icon={<ChatIcon />} aria-label="Message" colorScheme="green" mr="4"/>
                    <IconButton icon={<AddIcon />} size="md" aria-label="Follow" colorScheme="pink"/>
               </Flex>
          </Box>    
     )
}
export default Profile
