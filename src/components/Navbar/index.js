import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectNavbarProperties } from '../../redux/features/navbarSlice'
import { showModal, removeModal } from '../../redux/features/modalSlice'
import { selectAuthUser, signOut, selectAuthLoading } from '../../redux/features/authSlice'
import { Flex, Box, Heading, Spacer, Button, Menu, MenuGroup, MenuButton, Avatar, MenuList, MenuItem, MenuDivider, Spinner} from '@chakra-ui/react'
import SwitchForm from '../Forms/SwitchForm'

import './style.css'

const Navbar = () => {
     const dispatch = useDispatch()
     const authUser = useSelector(selectAuthUser)
     const { authLoading } = useSelector(selectAuthLoading)

     const { hide } = useSelector(selectNavbarProperties)

     const signInBtnHandler = () => {
          dispatch(showModal({ name: 'signInModal', component: <SwitchForm /> }))
     }

     // If user logged in, remove modal
     useEffect(() => { 
          if(authUser && authUser.data) {
               dispatch(removeModal('signInModal'))
          }
     }, [authUser, dispatch])

     const navbarProps =  hide ? { className: 'nav-hide'} : {}

     return (
          <Flex 
               position={'sticky'} 
               top="0"
               width="100%" 
               bg="#323232" 
               alignItems="center" 
               transition="transform 0.7s ease"
               zIndex="9999"
               {...navbarProps}
          >
               <Box p="6">
                    <Heading 
                         as={Link} 
                         to="/"
                         size="md" 
                         color="whiteAlpha.700"
                    >
                         Notes
                    </Heading>
               </Box>
               <Spacer />
               { authUser && authUser.data ? 
                    <Menu>
                         <MenuButton p="3" color="white">
                              <Avatar mr="1.5" name={authUser.data.username} color="whiteAlpha.900" bg="whiteAlpha.500" src={authUser.data.avatarUrl}/>
                         </MenuButton>
                         <MenuList mr="3">
                              <MenuGroup title={authUser.data.username} fontSize="medium" textTransform="capitalize">
                                   <MenuItem> Add something </MenuItem>
                                   <MenuItem as={Link} to={'/@' + authUser.data.username}>Account</MenuItem>
                              </MenuGroup>
                              <MenuDivider />
                              <MenuItem onClick={() => dispatch(signOut())}> Sign Out </MenuItem>
                         </MenuList>
                    </Menu>
               :
                    authLoading? <Spinner p="4" m="4" mr="6" color="whiteAlpha.900"/> : <Button p="4" m="4" bg="whiteAlpha.800" onClick={signInBtnHandler}> Sign In </Button>
               }
          </Flex>
     )
}

export default React.memo(Navbar)
