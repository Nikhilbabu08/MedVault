import React from 'react'

const About = () => {
  return (
    <div className='container'>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className='text-center mt-3'><b>About MedVault</b></h1>
          <hr />
          <div className='bg-light p-3 rounded'>
            <span><b>Welcome to MedVault, your trusted online platform for managing your medicine inventory with ease and security.<br />
              <span className='text-decoration-underline'>Our Mission</span><br />Our mission at MedVault is to simplify the management of medicine inventory for individuals, ensuring they have easy access to their medication information anytime, anywhere.<br />
              <span className='text-decoration-underline'>Key Features</span><br />
              <span>Medicine Management</span>
              <ul>
                <li>Add New Medicine: Easily add new medications to your inventory with detailed information such as name, company, and expiry date.</li>
                <li>Edit Medicine Details: Update medication information, including name, company, and expiry date, as needed.</li>
                <li>Delete Medicine: Remove medications from your inventory securely when they are no longer needed.</li>
              </ul>
              <span>Secure Registration and Login</span>
              <ul>
                <li>Secure Registration: Create your account confidently, knowing your personal information is protected through encryption and secure protocols.</li>
                <li>Encrypted Login: Log in securely to your MedVault account using encrypted authentication methods, ensuring the confidentiality of your credentials.</li>
              </ul>
            </b></span>
          </div>
        </div>
      </div>

    </div>
  )
}

export default About
