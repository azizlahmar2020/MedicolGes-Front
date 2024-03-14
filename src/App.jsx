import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './components/user/Signup'
import {BrowserRouter, Routes, Route, Form} from 'react-router-dom'
import Login from './components/user/Login'
import Dashboard from './components/backend/Dashboard'
import HomePage from './components/user/HomePage'
import ShowUsers from './components/user/ShowUsers'
import UpdateUsers from './components/user/UpdateUsers'
import UserProfiles from './components/user/userprofiles'
import FormBuilderComponent from './components/form/FormBuilder';
import FormList from './components/form/FormList'
import MyProfile from './components/user/MyProfile'
import ShowProjects from './components/project/showProjects';
import CreateProjectt from './components/project/createProjectt';
import UpdateProject from './components/project/updateProject';  // Import the UpdateProject component
import HomeProject from './components/project/homeProject';  // Import the HomeProject component
import ShowProject from './components/project/showProject';
import Index from './components/template/index'
import HomeSub from './components/template/homeSubadmin'
import HomeParticipant from './components/template/homeParticipant'
import ChatBox from './components/ChatBoxPage/ChatBox'
import ProjectsFront from './components/project/projectsFront'


function App() {

  return (
  <div>
    <BrowserRouter>
      <Routes>
        <Route path='/register/:role'element={<Signup/>}></Route>
        <Route path='/login'element={<Login/>}></Route>
        <Route path='/dashboard'element={<Dashboard/>}></Route>
        <Route path='/homepage'element={<HomePage/>}></Route>
        <Route path='/showUsers' element={<ShowUsers/>}></Route>
        <Route path='/updateUser/:id' element={<UpdateUsers/>}></Route>
        <Route path='/listprofiles' element={<UserProfiles/>}></Route>
        <Route path='/formBuilder' element={<FormBuilderComponent />} />
        <Route path='/showform' element={<FormList />} />
        <Route path='/myprofile' element={<MyProfile />} />
        <Route path='/showProjects' element={<ShowProjects/>}></Route>
        <Route path='/createProjectt' element={<CreateProjectt/>}></Route>
        <Route path='/updateProject/:projectId' element={<UpdateProject />} />  {/* Add this line */}
        <Route path='/homeprojects' element={<HomeProject />} />  {/* Add this line for the HomeProject */}
        <Route path="/showProject/:projectId" element={<ShowProject />} />
        <Route path='/index' element={<Index />} />  {/* Add this line for the HomeProject */}
        <Route path='/homesub' element={<HomeSub />} />  {/* Add this line for the HomeProject */}
        <Route path='/homeparticipant' element={<HomeParticipant />} />  {/* Add this line for the HomeProject */}
        <Route path='/ChatBox/:idsession/:iduserselection' element={<ChatBox/>}></Route>
        <Route path='/createProjectt' element={<CreateProjectt />} />  {/* Add this line for the HomeProject */}
        <Route path='/projectfront' element={<ProjectsFront />} />  {/* Add this line for the HomeProject */}


      </Routes>
    </BrowserRouter>
  </div>
  )
}

export default App
