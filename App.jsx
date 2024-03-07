// App.js

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
    <div>
      <BrowserRouter>
        <Routes>
          
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
    </div>
  );
}

export default App;
