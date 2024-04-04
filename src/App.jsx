import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Provider } from 'react-redux'; // Import the Provider component
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {store  } from './components/store/config'; // Import the entire config object
import Submissions from './components/feedback/submission';
import Signup from './components/user/Signup'
import Login from './components/user/Login'
import Dashboard from './components/backend/Dashboard'
import HomePage from './components/user/HomePage'
import ShowUsers from './components/user/ShowUsers'
import UpdateUsers from './components/user/UpdateUsers'
import UserProfiles from './components/user/userprofiles'
import MyProfile from './components/user/MyProfile'
import ShowProjects from './components/project/showProjects';
import CreateProjectt from './components/project/createProjectt';
import UpdateProject from './components/project/updateProject';  
import HomeProject from './components/project/homeProject';  
import ShowProject from './components/project/showProject';
import Index from './components/template/index'
import HomeSub from './components/template/homeSubadmin'
import HomeParticipant from './components/template/homeParticipant'
import ChatBox from './components/ChatBoxPage/ChatBox'
import ProjectsFront from './components/project/projectsFront'
import CreateForm from './components/pages/FormCreationPage/CreateForm'
import ListForm from './components/pages/FormListingPage/FormListing'
import FormResponse from './components/pages/FormResponsePage/FormResponse';
import FeedbackForm from './components/feedback/form';
import AboutUs from './components/pages/aboutus'; // Import the AboutUs component

import './components/feedback/custom.css'
import ResetPasswordPage from './components/user/ResetPassword';
import ForgotPassword from './components/user/ForgotPassword';
import EditProfile from './components/user/EditProfile';

import CreateInstitutionForm from './components/institution/CreateInstitutionForm';
import UpdateInstitutionForm from './components/institution/UpdateInsitutionForm';
import SingleInstitutionDetail from './components/institution/SingleInstitutionDetail';
import CategoryDetailComponent from './components/category/CategoryDetailComponent';
import CreateCategory from './components/category/CreateCategory';
import UpdateCategoryComponent from './components/category/UpdateCategoryComponent';
import SubcategoryDetailComponent from './components/subcategory/SubcategoryDetailComponent';
import CreateSubcategoryComponent from './components/subcategory/CreateSubcategoryComponent';
import UpdateSubcategoryComponent from './components/subcategory/updatesubcategory'


function App() {
  return (
    <Provider store={store}> {/* Wrap your entire app with the Provider */}
      <BrowserRouter>
        <Routes>
          {/* Define your routes */}
          <Route path='/register/:role' element={<Signup/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/dashboard' element={<Dashboard/>}></Route>
          <Route path='/homepage' element={<HomePage/>}></Route>
          <Route path='/showUsers' element={<ShowUsers/>}></Route>
          <Route path='/listprofiles' element={<UserProfiles/>}></Route>
          <Route path='/myprofile' element={<MyProfile />} />
          <Route path='/showProjects' element={<ShowProjects/>}></Route>
          <Route path='/createProjectt' element={<CreateProjectt/>}></Route>
          <Route path='/updateProject/:projectId' element={<UpdateProject />} /> 
          <Route path='/homeprojects' element={<HomeProject />} /> 
          <Route path="/showProject/:projectId" element={<ShowProject />} />
          <Route path='/index' element={<Index />} />  
          <Route path='/homesub' element={<HomeSub />} />  
          <Route path='/homeparticipant' element={<HomeParticipant />} />  
          <Route path='/ChatBox/:idsession/:iduserselection' element={<ChatBox/>}></Route>
          <Route path='/createProjectt' element={<CreateProjectt />} />  
          <Route path='/projectfront' element={<ProjectsFront />} /> 
          <Route path='/create-form' element={<CreateForm />} /> 
          <Route path='/list-form' element={<ListForm />} /> 
          <Route path='/form-response/:id' element={<FormResponse />} /> 
          <Route path="/feedback" element={<FeedbackForm />} />
          <Route path="/submissions" element={<Submissions />} />
            <Route path="/submission/:id" element={<Submissions />} />
            <Route path='/aboutus' element={<AboutUs />} />
          <Route path='/updateProfile/:id' element={<UpdateUsers/>}/>
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/forgot-password" element={<ForgotPassword/>} />
          <Route path='/editProfile/:id' element={<EditProfile/>}/>
          <Route path="/createInstitution" element={<CreateInstitutionForm />} />
          <Route path="/updateInstitution" element={<UpdateInstitutionForm />} />
          <Route path="/singleInstitution" element={<SingleInstitutionDetail />} />
          <Route path="/CategoryDetail" element={<CategoryDetailComponent />} />
          <Route path="/CreateCategory" element={<CreateCategory />} />
          <Route path="/UpdateCategory" element={<UpdateCategoryComponent />} />
          <Route path="/SubcategoryDetail" element={<SubcategoryDetailComponent />} />
          <Route path="/CreateSubcategory" element={<CreateSubcategoryComponent />} />
          <Route path="/updatesubcategory" element={< UpdateSubcategoryComponent/>} />

        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
