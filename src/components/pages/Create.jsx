import React,{useState} from 'react'
import { useNavigate,Link } from 'react-router-dom'
import axios from 'axios'
import checkAuth from '../auth/checkAuth'
import { useSelector } from 'react-redux'

const Create = () => {
  const user = useSelector(store=> store.auth.user)
  const navigate=useNavigate()
  const [name, setName] = useState("")
  const [company,setCompany]=useState("")
  const [expiry_date,setExpiry_date]=useState("")

  const  handleSubmit=(e)=>{
    e.preventDefault();
    if(name==="" || company===""){
      alert( "Please fill out all fields" )
    }else{
      axios.post('https://medicalstore.mashupstack.com/api/medicine',{name:name,company:company,expiry_date:expiry_date},{
        headers: { 'Authorization': `Bearer ${user.token}` }
      }).then(() =>{
        navigate('/inventory')
      })
    }
  }
  return (
    <div className="container">
      <div className="row justify-content-center mt-3">
        <div className="col-md-6">
          <h1 className="text-center"><b>Add Medicine</b></h1>
          <hr />
          <form  className="bg-light p-3 rounded" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label"><b>Medicine</b></label>
              <input type="text" name="name" className="form-control" id="exampleInputEmail1"
                aria-describedby="emailHelp" placeholder="Medicine name" required value={name} onInput={(e)=>setName(e.target.value)}/>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label"><b>Company</b></label>
              <input type="text" name="Company name" className="form-control" id="exampleInputPassword1"
                placeholder="Medicine category" required value={company} onInput={(e)=>setCompany(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label"><b>Expiry</b></label>
              <input type="date" name="expiry" className="form-control" id="exampleInputPassword1"
                placeholder="yyyy-mm-dd" required value={expiry_date} onInput={(e)=>setExpiry_date(e.target.value)}/>
            </div>
            <button type="submit" className="btn btn-outline-dark btn-sm"><b>Submit</b></button>&nbsp;
            <Link to={'/'} className="btn btn-outline-dark btn-sm"><b>Back</b></Link>
          </form>
        </div>
      </div>
    </div>
  )
}

export default checkAuth(Create)
