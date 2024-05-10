import React, { useState, useEffect } from 'react'
import { useParams, Link } from "react-router-dom"
import axios from "axios";
import { useSelector } from 'react-redux'

const View = () => {
    const user = useSelector(store => store.auth.user)
    const { postId } = useParams()
    const [item, setItem] = useState([])

    useEffect(() => {
        axios.get('https://medicalstore.mashupstack.com/api/medicine/' + postId, {
            headers: { 'Authorization': `Bearer ${user.token}` }
        }).then(res => setItem(res.data))
            .catch(err => console.log(err));
    }, [user.token, postId]);
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-3 mt-5 bg-gradient p-3 rounded">
                    {item ?
                        <ul className="list-group">
                        <li className="list-group-item text-white bg-dark text-center" aria-current="true"><b>{item.name}</b></li>
                        <li className="list-group-item">Company name: {item.company}</li>
                        <li className="list-group-item">Expiry:{item.expiry_date}</li>
                        <Link to={'/inventory'} className='btn btn-sm btn-dark'>Back</Link>
                      </ul>
                        : "Loading..."
                    }

                </div>
            </div>
        </div>
    )
}

export default View
