import { useSelector } from 'react-redux'
import { selectAuthUser } from '../../redux/features/authSlice'
import { Link } from 'react-router-dom'
import { Container, IconButton } from "@chakra-ui/react"
import { AddIcon } from '@chakra-ui/icons'

import NotesList from '../../components/NotesList'

const Home = () => {
  const authUser = useSelector(selectAuthUser)

  return (
    <>
      {authUser.authenticated && <NotesList />}
      {authUser.authenticated && 
        <span className="floating-bottom-right">
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
