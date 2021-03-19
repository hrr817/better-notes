import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showModal, removeModal } from '../../redux/features/modalSlice'
import { selectAuthUser, selectLoading, signOut } from '../../redux/features/authSlice'
import { Flex, Box, Heading, Spacer, Button, Menu, MenuGroup, MenuButton, Avatar, MenuList, MenuItem, MenuDivider, Spinner} from '@chakra-ui/react'
import SwitchForm from '../Forms/SwitchForm'

const Navbar = () => {
     const dispatch = useDispatch()
     const authUser = useSelector(selectAuthUser)
     const { signInLoading } = useSelector(selectLoading)

     const signInBtnHandler = () => {
          dispatch(showModal({ name: 'signInModal', component: <SwitchForm /> }))
     }

     // If user logged in, remove modal
     useEffect(() => { 
          if(authUser && authUser.data) {
               dispatch(removeModal('signInModal'))
          }
     }, [authUser, dispatch])

     return (
          <Flex bg="blackAlpha.800" alignItems="center">
               <Box p="6">
                    <Heading size="md" color="snow">Notes</Heading>
               </Box>
               <Spacer />
               { authUser && authUser.data ? 
                    <Menu>
                         <MenuButton p="3" color="white">
                              <Avatar mr="1.5" name={authUser.data.username} color="whiteAlpha.900" bg="whiteAlpha.500" src={authUser.data.avatarUrl}/>
                         </MenuButton>
                         <MenuList mr="3">
                              <MenuGroup title={authUser.data.username} fontSize="medium">
                                   <MenuItem>My Notes</MenuItem>
                                   <MenuItem>Account</MenuItem>
                              </MenuGroup>
                              <MenuDivider />
                              <MenuItem onClick={() => dispatch(signOut())}> Sign Out </MenuItem>
                         </MenuList>
                    </Menu>
               :
                    <Button p="4" m="4" bg="whiteAlpha.900" onClick={signInBtnHandler}>{ signInLoading? <Spinner /> : 'Sign In' }</Button>
               }
          </Flex>
     )
}

export default Navbar
