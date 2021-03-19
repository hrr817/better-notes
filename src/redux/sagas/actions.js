import { 
     _AUTH_SUCCESS, _AUTH_FAIL,
     _SIGN_IN_SUCCESS, _SIGN_IN_FAIL,
     _SIGN_UP_SUCCESS, _SIGN_UP_FAIL
} from './constants'

export const authSuccess = payload => ({ type: _AUTH_SUCCESS, payload })
export const authFail = payload => ({ type: _AUTH_FAIL, payload })

export const signInSuccessAction = payload => ({ type: _SIGN_IN_SUCCESS, payload })
export const signInFailAction = payload => ({ type: _SIGN_IN_FAIL, payload })

export const signUpSuccessAction = payload => ({ type: _SIGN_UP_SUCCESS, payload })
export const signUpFailAction = payload => ({ type: _SIGN_UP_FAIL, payload })