import React from 'react'
import SignIn from '../SignIn'
import SignUp from '../SignUp'

const SwitchForm = ({ showSignUp = false }) => {
     const [bool, setBool] = React.useState(showSignUp)
     const changeForm = React.useCallback(() => setBool(bool => !bool), [setBool])

     return bool? <SignUp changeForm={changeForm}/> : <SignIn changeForm={changeForm}/>
}

export default SwitchForm
