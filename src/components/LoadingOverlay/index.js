import { Spinner } from '@chakra-ui/react' 
import './style.css'

const LoadingOverlay = () => (
     <div className="loading-overlay"> 
          <Spinner color="white" size="xl" /> 
     </div>
)

export default LoadingOverlay
