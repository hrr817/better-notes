import React from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store'
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react'

import Loading from './components/Loading'
import Modals from './components/Modals'
import Home from './routes/Home'
import Profile from './routes/Profile'
import Editor from './routes/Editor'
import Viewer from './routes/Viewer'
import ContentNotFound from './routes/404'
import './styles/main.css'

import Navbar from './components/Navbar'

import { auth, selectAuthUser, selectAuthLoading } from './redux/features/authSlice'

const Routes = () => {

  const dispatch = useDispatch()
  const authUser = useSelector(selectAuthUser)
  const { authLoading } = useSelector(selectAuthLoading)

  if(authUser.authenticated && !authUser.data) { // If user is authenticated and user data is not saved in redux
    dispatch(auth())
  }
  
  if(authLoading) return <Loading />

  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path="/" component={Home} exact/>
        <Route path="/@:username" component={Profile} exact/>
        <Route path="/editor" component={Editor} exact/>
        <Route path="/editor/:id" component={Editor} exact/>
        <Route path="/view/:id" component={Viewer} exact/>
        <Route path="*" component={ContentNotFound} exact/>
      </Switch>
    </BrowserRouter>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider>
        <Routes />
        <Modals />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
