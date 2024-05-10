import React from 'react'

const Contact = () => {
  return (
    <div className="container">
        <div className="row justify-content-center">
            <div className="col-md-6">
            <h1 className="mt-3 text-center"><b>Contact us</b></h1>
          <hr />
          <form action="/" method="post" className="bg-light p-3 rounded">
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label"><b>Full Name</b></label>
                <input type="text" name="name" className="form-control" id="exampleInputPassword1" placeholder="Your name"/>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label"><b>Email</b></label>
                <input type="email" name="email" className="form-control" id="exampleInputPassword1"
                  placeholder="email"/>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleFormControlTextarea1" className="form-label">Message</label>
                <textarea className="form-control" id="exampleFormControlTextarea1 text-dark" rows="3"></textarea>
              </div>
              <button type="submit" className="btn btn-outline-dark"><b>Submit</b></button>
        </form>
            </div>
        </div>
    </div>
  )
}

export default Contact
