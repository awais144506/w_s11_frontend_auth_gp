import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
export default function Cereals() {
  const [cereals, setCereals] = useState([])
  const navigate = useNavigate()
  const logout = () => {
    localStorage.removeItem("token")
    navigate("/")
  }
  useEffect(() => {
    const token = localStorage.getItem("token")
    if(!token)
    {
      navigate("/")
    }
    else
    {
      try{
        const fetchCereals =async () =>{
            const response = await axios.get(
              "/api/cereals",
              {headers:{Authorization:token}}
            )
            setCereals(response.data)
        }
        fetchCereals()
      }
      catch(error)
      {
        if(error?.response?.data?.message ==401) logout()
      }
    }
  }, [])
  return (
    <div className="container">
      <h3>Cereals List <button onClick={logout}>Logout</button></h3>
      {cereals.length > 0 ? (
        <div>
          {cereals.map((cereal) => (
            <div key={cereal.id} style={{ marginBottom: '20px' }} className="cereal">
              <h4>{cereal.name}</h4>
              <p>Brand: {cereal.brand}</p>
              <p>Sugar content: {cereal.sugarContent}</p>
              <p>{cereal.history}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No cereals found.</p>
      )}
    </div>
  )
}
