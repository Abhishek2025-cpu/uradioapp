import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import AllPropertiesInteractive from "./components/AllPropertiesInteractive";
import Booking from "./components/Booking";
import RoomCategories from "./components/RoomCategories";
import BookingCalendar from "./components/BookingCalendar";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/AllPropertiesInteractive" element={<AllPropertiesInteractive/>}/>
        <Route path="/booking" element={<Booking/>}/>
        <Route path="/Home" element={<Home/>}/>
        <Route path="/RoomCategories" element={<RoomCategories/>}/>
        <Route path="/BookingCalendar" element={<BookingCalendar/>}/>

   
      </Routes>
    </Router>
  );
}

export default App;
