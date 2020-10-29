import React from "react";
import loading from '../assets/loading.gif'

export default function Login() {

  return (
    <div className="loading">
      <h2>Loading...</h2>
      <img src={loading} alt="Loading gif" />
    </div>
  )
}
