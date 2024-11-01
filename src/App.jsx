import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { store } from './components/store/config';
import ChatBoxParticipant from './components/ChatBoxPage/ChatBoxPatient';
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
import CreateInstitutionForm from './components/institution/CreateInstitutionForm';
import UpdateInstitutionForm from './components/institution/UpdateInsitutionForm';
import SingleInstitutionDetail from './components/institution/SingleInstitutionDetail';
import CategoryDetailComponent from './components/category/CategoryDetailComponent';
import CreateCategory from './components/category/CreateCategory';
import UpdateCategoryComponent from './components/category/UpdateCategoryComponent';
import SubcategoryDetailComponent from './components/subcategory/SubcategoryDetailComponent';
import CreateSubcategoryComponent from './components/subcategory/CreateSubcategoryComponent';
import UpdateSubcategoryComponent from './components/subcategory/updatesubcategory'
import ChatWinDowBot from "./components/ChatBot/ChatWindow";

import './components/feedback/custom.css';
import ProfilePatient from './components/user/ProfilePatient';
import MembersForPatient from './components/user/MembersForPatient';
import EditPatientProfile from './components/user/editPatientProfile';
import FeedPatient from './components/feed/feedPatient';
import ShowProjBack from './components/project/showProjBack';
import EmailVerify from './components/user/EmailVerify';
import Converte from './components/ChatBot/Convert.jsx';
import Symptoms from './components/diagnosis/symptoms';
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
        <Route path='/self-diagnosis' element={<Symptoms />} />

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
          <Route path="/createInstitution" element={<CreateInstitutionForm />} />
          <Route path="/updateInstitution" element={<UpdateInstitutionForm />} />
          <Route path="/singleInstitution/:id" element={<SingleInstitutionDetail />} /> 
          <Route path="/CategoryDetail" element={<CategoryDetailComponent />} />
          <Route path="/CreateCategory" element={<CreateCategory />} />
          <Route path="/UpdateCategory" element={<UpdateCategoryComponent />} />
          <Route path="/SubcategoryDetail" element={<SubcategoryDetailComponent />} />
          <Route path="/CreateSubcategory" element={<CreateSubcategoryComponent />} />
          <Route path="/updatesubcategory" element={< UpdateSubcategoryComponent/>} />
          <Route path='/profilePatient' element={<ProfilePatient />} />
          <Route path='/membersPatient' element={<MembersForPatient />} />
          <Route path='/editPatientProfile/:id' element={<EditPatientProfile />} />
          <Route path='/feedPatient' element={<FeedPatient />} />
          <Route path='/showProjectback/:projectId' element={<ShowProjBack />} />
          <Route path="/auth/:id/verify-email/:token" element={<EmailVerify />} />
          <Route path='/ChatBoxParticipant/:idsession/:iduserselection' element={<ChatBoxParticipant />} />
          <Route path='/chatbot' element={<ChatWinDowBot />} />
          <Route path='/cnv' element={<Converte />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
