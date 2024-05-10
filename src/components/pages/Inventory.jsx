import React, { useState, useEffect } from 'react';
import axios from 'axios';
import checkAuth from '../auth/checkAuth';
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Modal from './CustomModal';

const Inventory = () => {
  const navigate = useNavigate()
  const user = useSelector(store => store.auth.user)
  const [medicine, setMedicine] = useState(null)
  const [loading, setLoading] = useState(true)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (user && user.token) {
      let url = 'https://medicalstore.mashupstack.com/api/medicine'
      if (searchKeyword) {
        const trimmedKeyword = searchKeyword.trim().toLowerCase();
        url = `https://medicalstore.mashupstack.com/api/medicine/search?keyword=${trimmedKeyword}`
      }
      axios.get(url, {
        headers: { 'Authorization': `Bearer ${user.token}` }
      })
        .then(res => {
          if (searchKeyword) {
            setMedicine(res.data.filter(item => item.name.toLowerCase().startsWith(searchKeyword.toLowerCase())));
          } else {
            setMedicine(res.data);
          }
          setLoading(false)
        })
        .catch(err => console.log(err));
    }
  }, [user, searchKeyword]);

  const handleSearch = (e) => {
    const inputValue = e.target.value.trim();
    const firstWord = inputValue.split(' ')[0];
    setSearchKeyword(firstWord);
  }

  const handleDelete = (itemId) => {
    setDeleteItemId(itemId); 
    setShowModal(true); 
  };

  const confirmDelete = () => {
    axios.delete(`https://medicalstore.mashupstack.com/api/medicine/${deleteItemId}`, {
      headers: { 'Authorization': `Bearer ${user.token}` }
    }).then((response) => {
      setMedicine(prevMedicine => prevMedicine.filter(item => item.id !== deleteItemId))
      setShowModal(false);
      navigate('/inventory')
    }).catch((error) => {
      console.error('Delete Error:', error)
    })
  }

  return (

    <div className='container'>
      <div className="row justify-content-center text-center mt-3">
        <div className="col">
          <h1><b>Manage Medicines</b></h1>
          <hr />
        </div>
      </div>
      <div className="row justify-content-center text-center">
        <div className="col-md-8">
          <form className='d-flex'>
            <input className="form-control me-2" type="search" placeholder="Search your medicine" aria-label="Search" value={searchKeyword} onChange={handleSearch} />
          </form>
        </div>
      </div>
      {loading ?
        <div className="row justify-content-center text-center mt-3">
          <div className="col">
            <p className='text-dark'><b>Loading...</b></p>
          </div>
        </div>
        :
        <div className="row justify-content-center mt-3">
          <div className="col-md-8 rounded">
            {medicine.length === 0 ? (
              <p className="text-dark text-center"><b>No medicine found!</b></p>
            ) :
            <div className="table-responsive">
              <table className="table table-light mt-2">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Medicine</th>
                    <th scope="col">Company</th>
                    <th scope="col">Expiry</th>
                    <th scope="col">You can</th>
                  </tr>
                </thead>
                {medicine.map((item, index) => (
                  <tbody key={item.id}>
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>{item.name}</td>
                      <td>{item.company}</td>
                      <td>{item.expiry_date}</td>
                      <td>
                        <Link to={`/${item.id}`} className="btn btn-sm btn-outline-dark" >View</Link>&nbsp;
                        <Link to={`/${item.id}/update`} className="btn btn-sm btn-outline-dark" >Edit</Link>&nbsp;
                        <Link onClick={() => handleDelete(item.id)} className="btn btn-sm btn-outline-dark" >Delete</Link>
                      </td>
                    </tr>
                  </tbody>
                ))
                }
              </table>
              </div>}
          </div>
        </div>
      }

      {/* Modal component for delete confirmation */}
      <Modal show={showModal} handleClose={() => setShowModal(false)} handleDelete={confirmDelete}>
        <div className="modal-header">
          <h5 className="modal-title">Confirm Delete</h5>
          <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowModal(false)}></button>
        </div>
        <div className="modal-body">
          <p>Are you sure you want to delete this item?</p>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
          <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
        </div>
      </Modal>

    </div>
  )
}

export default checkAuth(Inventory)
