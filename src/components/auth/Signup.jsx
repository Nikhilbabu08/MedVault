import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'


const Signup = () => {
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password_confirmation, setPassword_confirmation] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('https://medicalstore.mashupstack.com/api/register', {
      name: name,
      email: email,
      password: password,
      password_confirmation: password_confirmation
    })
      .then((res) => {
        setErrorMsg('')
        navigate('/login')
      }).catch(error => {
        if (error.response.data.errors) {
          setErrorMsg(Object.values(error.response.data.errors).join(' '));
        } else {
          setErrorMsg('Failed to connect to api');
        }
      })
  }

  return (
    <div className='container'>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="mt-3 text-center"><b>Signup</b></h1>
          <hr />
          <form onSubmit={handleSubmit} className="bg-light p-3 rounded">
            {errorMsg ? <div className="alert alert-danger">{errorMsg}</div> : ''}
            <div className="mb-3">
              <label htmlFor="exampleInputName" className="form-label"><b>User Name</b></label>
              <input value={name} onInput={(e) => setName(e.target.value)} type="text" name="name" className="form-control" aria-describedby="emailHelp"
                placeholder="Enter a username" />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail" className="form-label"><b>Email</b></label>
              <input value={email} onInput={(e) => setEmail(e.target.value)} type="email" name="email" className="form-control" placeholder="Email" />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label"><b>Password</b></label>
              <input value={password} onInput={(e) => setPassword(e.target.value)} type="password" name="password" className="form-control"
                placeholder="Password" />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword2" className="form-label"><b>Confirm Password</b></label>
              <input value={password_confirmation} onInput={(e) => setPassword_confirmation(e.target.value)} type="password" name="password" className="form-control"
                placeholder="Confirm Password" />
            </div>
            <p><Link to={'/login'}
              className="link-dark link-underline link-underline-opacity-0 link-underline-opacity-75-hover"><b>Already have
                account?</b></Link></p>
            <button type="submit" className="btn btn-outline-dark"><b>Signup</b></button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup
