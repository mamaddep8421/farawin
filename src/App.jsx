import { useState } from "react";
// import Login from "./Components/Login";
import Sing_Up from "./Components/Sing-Up";
import Login from "./Components/Login";
import Home from "./Components/Home";
import {Routes,Route} from "react-router-dom"
export default function App() {
  return (
    <div>
     <Routes>
     <Route path="/" element={<Home/>}/>
     <Route path="/register" element={<Sing_Up/>}/>
     <Route path="/login" element={<Login />}/>
     </Routes>
    </div>
  );
}