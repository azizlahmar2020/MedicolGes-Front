import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { store } from './components/store/config';

import Submissions from './components/feedback/submission';
import Signup from './components/user/Signup';
import Login from './components/user/Login';
import Dashboard from './components/backend/Dashboard';
import HomePage from './components/user/HomePage';
import ShowUsers from './components/user/ShowUsers';
import UpdateUsers from './components/user/UpdateUsers';
import UserProfiles from './components/user/userprofiles';
import MyProfile from './components/user/MyProfile';
import ShowProjects from './components/project/showProjects';
import CreateProjectt from './components/project/createProjectt';
import UpdateProject from './components/project/updateProject';
import HomeProject from './components/project/homeProject';
import ShowProject from './components/project/showProject';
import Index from './components/template/index';
import HomeSub from './components/template/homeSubadmin';
import HomeParticipant from './components/template/homeParticipant';
import ChatBox from './components/ChatBoxPage/ChatBox';
import ProjectsFront from './components/project/projectsFront';
import CreateForm from './components/pages/FormCreationPage/CreateForm';
import ListForm from './components/pages/FormListingPage/FormListing';
import FormResponse from './components/pages/FormResponsePage/FormResponse';
import FeedbackForm from './components/feedback/form';
import AboutUs from './components/pages/aboutus';
import Feed from './components/feed/feed';
import ResetPasswordPage from './components/user/ResetPassword';
import ForgotPassword from './components/user/ForgotPassword';
import EditProfile from './components/user/EditProfile';
import MediNews from './components/pages/medinews';
import HomeVideo from './components/VideoChat/HomeVideo';
import Room from './components/VideoChat/Room';
import Rdv from './components/Rdv/ShowRdv';
import RdvPatient from './components/Rdv/showRdvPatient';

import './components/feedback/custom.css';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/register/:role' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/homepage' element={<HomePage />} />
          <Route path='/showUsers' element={<ShowUsers />} />
          <Route path='/updateUser/:id' element={<UpdateUsers />} />
          <Route path='/listprofiles' element={<UserProfiles />} />
          <Route path='/myprofile' element={<MyProfile />} />
          <Route path='/showProjects' element={<ShowProjects />} />
          <Route path='/createProjectt' element={<CreateProjectt />} />
          <Route path='/updateProject/:projectId' element={<UpdateProject />} />
          <Route path='/homeprojects' element={<HomeProject />} />
          <Route path='/showProject/:projectId' element={<ShowProject />} />
          <Route path='/index' element={<Index />} />
          <Route path='/homesub' element={<HomeSub />} />
          <Route path='/homeparticipant' element={<HomeParticipant />} />
          <Route path='/ChatBox/:idsession/:iduserselection' element={<ChatBox />} />
          <Route path='/projectfront' element={<ProjectsFront />} />
          <Route path='/create-form' element={<CreateForm />} />
          <Route path='/list-form' element={<ListForm />} />
          <Route path='/form-response/:id' element={<FormResponse />} />
          <Route path='/feedback' element={<FeedbackForm />} />
          <Route path='/submissions' element={<Submissions />} />
          <Route path='/submission/:id' element={<Submissions />} />
          <Route path='/aboutus' element={<AboutUs />} />
          <Route path='/updateProfile/:id' element={<UpdateUsers />} />
          <Route path='/reset-password' element={<ResetPasswordPage />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/editProfile/:id' element={<EditProfile />} />
          <Route path='/medinews/:pageNumber' element={<MediNews />} />
          <Route path='/feed' element={<Feed />} />
          <Route path='/Video' element={<HomeVideo />} />
          <Route path='/room/:roomID' element={<Room />} />
          <Route path='/rdv' element={<Rdv />} />
          <Route path='/rdvPatient' element={<RdvPatient />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
