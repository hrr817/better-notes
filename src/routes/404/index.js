import React from 'react'
import { Box, Heading, Text } from '@chakra-ui/react'

const ContentNotFound = () => {
     return (
          <Box 
               p="4" m="4"
               bg="blackAlpha.300" 
               borderRadius="10" 
               textAlign="center"
          >
               <Heading color="red.500" >404</Heading>
               <Text color="whiteAlpha.600" >
                    Page not found :(
               </Text>
          </Box>
     )
}

export default ContentNotFound
