import React, { useState, useEffect } from 'react'
import axios from "axios"
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import checkAuth from '../auth/checkAuth';

const Update = () => {
  const user = useSelector(store => store.auth.user)
  const navigate = useNavigate()
  const { postId } = useParams()

  const [name, setName] = useState("")
  const [company, setCompany] = useState("")
  const [expiry_date, setExpiryDate] = useState('')

  useEffect(() => {
    axios.get(`https://medicalstore.mashupstack.com/api/medicine/` + postId, {
      headers: { 'Authorization': `Bearer ${user.token}` }
    })
      .then(response => {
        setName(response.data.name)
        setCompany(response.data.company)
        setExpiryDate(response.data.expiry_date)
      })
  }, [postId, user.token])

  const handleUpdate = (e) => {
    e.preventDefault()
    axios.post(`https://medicalstore.mashupstack.com/api/medicine/` + postId, {
      name: name,
      company: company,
      expiry_date: expiry_date
    }, {
      headers: { 'Authorization': `Bearer ${user.token}` }
    }).then((res) => {
      navigate("/inventory")
    })
  }

  return (

    <div className="container">
      <div className="row justify-content-center mt-3">
        <div className="col-md-6">
          <h1 className="text-center"><b>Edit Medicine</b></h1>
          <hr />
          <form onSubmit={handleUpdate} className="bg-light p-3 rounded">
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label"><b>Medicine</b></label>
              <input type="text" name="medicine" className="form-control" id="exampleInputEmail1"
                aria-describedby="emailHelp" placeholder="Medicine name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label"><b>Company</b></label>
              <input type="text" name="category" className="form-control" id="exampleInputPassword1"
                placeholder="Company name" value={company} onChange={(e) => setCompany(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label"><b>Expiry</b></label>
              <input type="date" name="expiry" className="form-control" id="exampleInputPassword1"
                placeholder="yyyy-mm-dd" value={expiry_date} onChange={(e) => setExpiryDate(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-outline-dark btn-sm"><b>Update</b></button>&nbsp;
            <Link to={'/inventory'} className='btn btn-outline-dark btn-sm'><b>Back</b></Link>
          </form>
        </div>
      </div>
    </div>
  )
}
export default checkAuth(Update)
