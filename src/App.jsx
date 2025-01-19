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

function App() {

  return (
    <>
      <h1 className='text-3xl text-center'>Hello Welcome to Dev-Tinder</h1>
      {/* Routing  */}
      <Provider store ={appStore}>
      <BrowserRouter basename='/'>
      <Routes>
        <Route path='/' element={<Body/>}>
          {/* Children Routes */}
          <Route path='/login' element={<Login/>}/>
          <Route path='/home' element ={<Feed/>}/>
          <Route path ='/signup' element={<SignUp/>}/>
          <Route path='/connections'element={<Connections/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/requests' element={<Requests/>}/>
        </Route>
      </Routes>
      </BrowserRouter>
      </Provider>

    </>
  )
}

export default App
