import { Link } from "react-router-dom"

import React from 'react'

const Header = () => {
  return (
    <nav className="fixed-top d-flex flex-column flex-md-row align-items-center justify-content-between py-3 px-2-md-3 px-md-5">
      <h1 className="fw-bold text-primary">Muhammad Ghulam Ali</h1>
    <div className="links d-flex gap-3">
      <Link className="text-white text-decoration-none" to= "/">Home</Link>
      <Link className="text-white text-decoration-none" to= "/project">Projects</Link>
      <Link className="text-white text-decoration-none" to= "/contact">Contact</Link>
      <Link className="text-white text-decoration-none" to= "/about">About</Link>
    </div>
    </nav>
  )
}

export default Header

