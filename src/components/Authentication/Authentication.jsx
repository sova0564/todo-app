import style from './Authentication.module.css'
import { useState } from "react";
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import TodoPage from '../Todo/TodoPage'
import SignIn from './SignIn';


function Authentication() {

  const auth = getAuth();
  const navigate = useNavigate();

  const [state, setState] = useState({
    email: "",
    password: "",
    hasAccount: false,
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setState({ ...state, hasAccount: true });
    }
  }, []);


  function handleChange({ target: { value, id } }) {
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  }

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, state.email, state.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, state.email, state.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        setState({ ...state, hasAccount: true });
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/todo');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
    

    return (<div className={style.wrap}>
            <SignIn handleChange={handleChange} setState={setState} handleSignUp={handleSignUp} handleSignIn={handleSignIn} hasAccount={state.hasAccount}/>
    </div>)
}

export default Authentication;