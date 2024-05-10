import React from 'react'
import { Link } from "react-router-dom"
import { useSelector } from 'react-redux'

const Home = () => {
const user = useSelector(store => store.auth.user)
  return (
    <div className='container'>
      <div className="row justify-content-center">
        <div className="col-md-6 my-auto">
          <h1 className='text-center mt-3'><b>MedVault</b></h1>
          <hr />
          <div className='bg-light p-3 rounded'>
            {user ?
              <>
                <h5><b>Welcome {user.name}!</b></h5>
                <p><b>We're delighted to have you back with us. As a registered
                  member of MedVault, you now have access our features to meet your healthcare
                  needs. <br />
                  Thank you
                  for choosing us as your trusted healthcare partner <br />
                  <Link to={'inventory'} className='btn btn-outline-dark mt-2'><b>Explore!</b></Link></b></p>
              </>
              :
              <>
                <h5><b>Welcome to MedVault!</b></h5>
                <p><b>where managing your medications is effortless.<br />
                  Register securely, log in,
                  and access your personalized dashboard to add, update, and manage your medications
                  hassle-free.<br />
                  Simplify your medication management journey with us – sign up today!</b></p>
                <Link className='btn btn-outline-dark mt-2' to={'signup'}><b>Get Started!</b></Link></>
            }
          </div>
        </div>
      </div>

    </div>
  )
}

export default Home
