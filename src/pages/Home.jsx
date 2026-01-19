import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="content d-flex flex-column align-items-center">
        <h1 className='text-white'>MUHAMMAD GHULAM ALI</h1>
        <p className='text-white text-center'>Aspiring Data Scientist | Business Analyst | Data Analyst | Web Developer</p>
        <Link to = "/project" className='btn btn-primary mt-5'>View my portfolio</Link>
    </div>
  )
}

export default Home
