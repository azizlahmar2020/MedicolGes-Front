import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

import {BrowserRouter, Routes, Route} from 'react-router-dom'

import ChatBox from './components/ChatBoxPage/ChatBox'

function App() {

  return (
  <div>
    <BrowserRouter>
      <Routes>
      
        <Route path='/ChatBox' element={<ChatBox/>}></Route>


      </Routes>
    </BrowserRouter>
  </div>
  )
}

export default App
