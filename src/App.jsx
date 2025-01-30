import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Body from './Body'
import './App.css'
import Login from './components/body/Login'
import SignUp from './components/body/SignUp'
import Connections from './components/body/Connections'
import Profile from './components/body/Profile'
import appStore from './utils/appStore'
import { Provider } from 'react-redux';
import Feed from './components/body/Feed'
import Requests from './components/body/Requests'
import Homepage from './components/body/Homepage'
import GoogleCallback from './components/body/GoogleCallback'
import Chat from './components/body/Chat'


function App() {

  return (
    <>
      {/* Routing  */}
      <Provider store ={appStore}>
      <BrowserRouter basename='/'>
      <Routes>
        <Route path='/' element={<Body/>}>
        <Route index element={<Homepage />} /> 
          {/* Children Routes */}
         <Route path='/home' element={<Homepage/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/feed' element ={<Feed/>}/>
          <Route path ='/signup' element={<SignUp/>}/>
          <Route path='/connections'element={<Connections/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/requests' element={<Requests/>}/>
          <Route path='/chat/:targetUserId' element  ={<Chat/>}/>
        </Route>
      </Routes>
      </BrowserRouter>
      </Provider>

    </>
  )
}

export default App
