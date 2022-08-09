import React from 'react'
import Home from "./pages/home/Home";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";



const App = () => {
  return (
    <div>
      
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home/>}/>
           
            
          </Route>
     
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App