import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { signIn, selectLoading, selectAuthErrors } from '../../../redux/features/authSlice'
import  { 
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Spacer,
  Link,
  Flex
} from '@chakra-ui/react'

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const SignIn = ({ changeForm }) => {
     const dispatch = useDispatch()
     const { signInLoading } = useSelector(selectLoading)
     const { signInError } = useSelector(selectAuthErrors)

     const { register, handleSubmit, errors } = useForm()

     const signInHandler = (data) => {
          dispatch(signIn(data))
     }

     return (
          <form onSubmit={handleSubmit(signInHandler)} >
          <ModalHeader> Sign In </ModalHeader>
          {signInError && <Flex color="whiteAlpha.900" bg="red.600" p="3" ml="5" mr="5" borderRadius="5"> { signInError.message } </Flex>}
          <ModalCloseButton size="lg" />
          <ModalBody pb={6}> 
               <FormControl id="email">
               <FormLabel>Email</FormLabel>
               <Input 
                    type="email"
                    name="email"
                    maxLength="20"
                    ref={register({ pattern: emailRegex, maxLength: 20, required: true})}
                    isInvalid={errors && !!errors.email}
                    disabled={signInLoading}
                    borderColor="blackAlpha.900"
                    errorBorderColor="red.400"
                    focusBorderColor="none"
                    autoFocus
               />
               </FormControl>

               <FormControl mt={4} id="password">
               <FormLabel>Password</FormLabel>
               <Input
                    type="Password"
                    name="password"
                    maxLength="15"
                    ref={register({ minLength: 8, maxLength: 15, required: true })}
                    isInvalid={errors && !!errors.password}
                    disabled={signInLoading}
                    borderColor="blackAlpha.900"
                    errorBorderColor="red.400"
                    focusBorderColor="none"
               />
               </FormControl>
          </ModalBody>

          <ModalFooter>
               <Link cursor="pointer" color="blackAlpha.700" fontWeight="bold" onClick={() => changeForm()}> Don't have an account...</Link>
               <Spacer/>
               <Input type="submit"
                    as={Button}
                    w="auto"
                    bg="blackAlpha.700"
                    color="whiteAlpha.800"
                    isLoading={signInLoading}
                    loadingText="Signing in"> Sign In </Input>
          </ModalFooter>
          </form>
     )
}

export default SignIn
