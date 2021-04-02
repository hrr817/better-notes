import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectAuthUser } from '../../redux/features/authSlice'
import { showNavbar, hideNavbar } from '../../redux/features/navbarSlice'
import { Link } from 'react-router-dom'
import { IconButton } from "@chakra-ui/react"
import { AddIcon } from '@chakra-ui/icons'

import { useScrollHook } from '../../customHooks/useScrollHook'

import NotesList from '../../components/NotesList'

const Home = () => {
  const dispatch = useDispatch()
  const authUser = useSelector(selectAuthUser)

  const [scrollInfo] = useScrollHook({ threshold: 5 })

  useEffect(() => {
      scrollInfo.scrolledDown? dispatch(showNavbar()) : dispatch(hideNavbar())
  }, [dispatch, scrollInfo.scrolledDown])

  return (
    <>
      {authUser.authenticated && <NotesList />}
      {authUser.authenticated && 
        <span className={`floating-bottom-right${scrollInfo.scrolledDown? ' hide-down' : ''}`}>
          <IconButton
            as={Link}
            to="/editor"
            mr="3"
            mb="3"
            size="lg" 
            colorScheme="blue"
            aria-label="Create Note"
            icon={<AddIcon />}
            isRound
          />
        </span>
      }
    </>
  );
}

export default Home
