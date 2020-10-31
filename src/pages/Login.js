import React, { useContext, useState } from "react";
import { useHistory } from 'react-router-dom';
import { UserContext } from '../context/user';
//strapi function
import loginUser from '../strapi/loginUser';
import registerUser from '../strapi/registerUser';
// handle user


export default function Login() {
  const history = useHistory();

  // setup user context
  const { userLogin } = useContext(UserContext);

  // state values
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('default');
  const [isMember, setIsMember] = useState(true);

  let isEmpty = !email || !password || !username;

  const toggleMember = () => {
    setIsMember((prevMember) => {
      let isMember = !prevMember;
      isMember ? setUsername('default') : setUsername('');
      return isMember;
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response;

    if (isMember) {
      response = await loginUser({ email, password })
    }
    else {
      response = await registerUser({ email, password, username });
    }
    if (response) {
      const { jwt: token, user: { username } } = response.data;
      const newUser = { token, username };

      userLogin(newUser);
      history.push("/products");
    }
    else {
      // show alert
      console.log("error");
    }
  };

  return (
    <section className="form section">
      <h2 className="section-title">{isMember ? "sign in" : "register"}</h2>
      <form className="login-form">
        {!isMember && (
          <div className="form-control">
            <label htmlFor="username">username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
        )}
        <div className="form-control">
          <label htmlFor="email">email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="email">password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        {isEmpty && (
          <p className="form-empty">Please fill out all the fields</p>
        )}
        {!isEmpty && (
          <button
            type="submit"
            className="btn btn-block btn-primary"
            onClick={handleSubmit}
          >Submit</button>
        )}
        <p className="register-link">
          {isMember ? "need to register? " : "already a member? "}
          <button type="button" onClick={toggleMember}>click here</button>
        </p>
      </form>
    </section>
  )
}
