import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { signUp, selectAuthLoading, selectAuthErrors } from '../../../redux/features/authSlice'
import  { 
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  Flex,
  FormLabel,
  Input,
  Spacer,
  Link
} from '@chakra-ui/react'

const usernameRegex = /^[a-zA-Z0-9]+$/
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const SignUp = ({ changeForm }) => {
     const dispatch = useDispatch()
     const { signUpLoading } = useSelector(selectAuthLoading)
     const { signUpError } = useSelector(selectAuthErrors)

     const { register, handleSubmit, errors } = useForm()

     const [passwordMatchError, setPasswordMatchError] = useState(false)

     const signUpHandler = (data) => {
          if(data.password !== data.passwordRepeat) return setPasswordMatchError(true)

          setPasswordMatchError(false)
          dispatch(signUp(data))
     }

     return (
          <form onSubmit={handleSubmit(signUpHandler)}>
          <ModalHeader> Sign Up </ModalHeader>
          {signUpError && <Flex color="whiteAlpha.900" bg="red.600" p="3" ml="5" mr="5" borderRadius="5"> { signUpError.reason } </Flex>}
          <ModalCloseButton size="lg" />
          <ModalBody pb={6}> 
               <FormControl>
               <FormLabel>Username</FormLabel>
               <Input 
                    type="text"
                    name="username"
                    maxLength="15"
                    ref={register({ pattern: usernameRegex, maxLength: 15, required: true})}
                    isInvalid={(errors && !!errors.username) || (signUpError && signUpError.reason && signUpError.reason.includes('Username'))}
                    disabled={signUpLoading}
                    borderColor="blackAlpha.900"
                    errorBorderColor="red.400"
                    focusBorderColor="none"
                    autoFocus
               />
               </FormControl>

               <FormControl mt={4}>
               <FormLabel>Email</FormLabel>
               <Input 
                    type="email"
                    name="email"
                    maxLength="20"
                    ref={register({ pattern: emailRegex, maxLength: 20, required: true})}
                    isInvalid={(errors && !!errors.email) || (signUpError && signUpError.reason && signUpError.reason.includes('Email'))}
                    disabled={signUpLoading}
                    borderColor="blackAlpha.900"
                    errorBorderColor="red.400"
                    focusBorderColor="none"
               />
               </FormControl>

               <Flex alignItems="center">
               <FormControl mt={4} mr="5">
               <FormLabel>Password</FormLabel>
               <Input
                    type="Password"
                    name="password"
                    ref={register({ minLength: 8, maxLength: 15, required: true })}
                    isInvalid={errors && !!errors.password}
                    disabled={signUpLoading}
                    borderColor="blackAlpha.900"
                    errorBorderColor="red.400"
                    focusBorderColor="none"
               />
               </FormControl>

               <Spacer/>

               <FormControl mt={4}>
               <FormLabel>Repeat</FormLabel>
               <Input
                    type="Password"
                    name="passwordRepeat"
                    ref={register({ minLength: 8, required: true })}
                    isInvalid={(errors && errors.passwordRepeat) || passwordMatchError}
                    disabled={signUpLoading}
                    borderColor="blackAlpha.900"
                    errorBorderColor="red.400"
                    focusBorderColor="none"
               />
               </FormControl>
               </Flex>
          </ModalBody>

          <ModalFooter>
               <Link cursor="pointer" color="blackAlpha.700" fontWeight="bold" onClick={() => changeForm()}> I already have an account... </Link>
               <Spacer/>
               <Input type="submit"
                    as={Button}
                    w="auto"
                    bg="blackAlpha.700"
                    color="whiteAlpha.800"
                    isLoading={signUpLoading}
                    disabled={signUpLoading}
                    loadingText="Signing up"> Sign Up </Input>
          </ModalFooter>
          </form>
     )
}

export default SignUp
