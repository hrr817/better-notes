import React from 'react'
import { Box, Heading, Text } from '@chakra-ui/react'

const ContentNotFound = () => {
     return (
          <Box 
               p="4" m="4"
               color="red.400" 
               bg="blackAlpha.300" 
               borderRadius="10" 
               textAlign="center"
          >
               <Heading>404</Heading>
               <Text>
                    Page not found :(
               </Text>
          </Box>
     )
}

export default ContentNotFound
