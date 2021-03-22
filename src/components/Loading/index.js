import { Flex, Spinner } from '@chakra-ui/react' 

const Loading = () => (
     <Flex 
          justifyContent="center" 
          alignItems="center"
          height="80%"
     > 
          <Spinner color="white" size="xl" /> 
     </Flex>
)

export default Loading
