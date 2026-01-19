import { BrowserRouter, Routes, Route } from "react-router-dom"

import Header from "./components/Header"
import Footer from "./components/footer"

// Pages
import Home from "./pages/Home"
import Contact from "./pages/Contact"
import About from "./pages/About"
import Project from "./pages/Project"

import React from 'react'

const App = () => {
  return (
    <BrowserRouter>
    <Header />
    <Routes>

    <Route path = "/" element = {<Home/>} />
    <Route path = "/project" element = {<Project/>} />
    <Route path = "/contact" element = {<Contact/>} />
    <Route path = "/about" element = {<About/>} />

    </Routes>
    <Footer />
    </BrowserRouter>
  )
}

export default App

