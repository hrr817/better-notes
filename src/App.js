import { useDispatch, useSelector } from 'react-redux'
import { auth, selectAuthUser, selectLoading } from './redux/features/authSlice'
import { Flex, Spinner } from '@chakra-ui/react'
import Navbar from './components/Navbar'
function App() {
  const dispatch = useDispatch()
  const authUser = useSelector(selectAuthUser)
  const { authLoading } = useSelector(selectLoading)

  if(authUser.authenticated && !authUser.data) { // If user is authenticated and user data is not saved in redux
    dispatch(auth())
  }

  if(authLoading) return <Flex style={{ height: '100vh' }} background="blackAlpha.800" justifyContent="center" alignItems="center"> <Spinner color="white" size="xl" /> </Flex>

  return (
    <>
      <Navbar />
    </>
  );
}

export default App;
