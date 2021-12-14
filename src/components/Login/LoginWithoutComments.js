import React, { useState, useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

// Outside because we won't need any data generated inside of the component function, So this can be created outside the component function.
// Any data required by this function will be passed to this function by react automatically

const emailReducer = (state, action) =>{
  if(action.type === 'USER_INPUT'){
    return {value: action.val, isValid: action.val.includes('@')}
  }
  if(action.type === 'INPUT_BLUR'){
    return { value: state.value, isValid: state.value.includes('@')}
  }
  return { value: '', isValid: false };
};           

const passwordReducer = (state, action) => {
  if(action.type === 'USER_PASSWORD'){
    return {value: action.val, isPasswordValid: action.val.trim().length > 6}
  }
  if(action.type === 'PASSWORD_BLUR'){
    return { value: state.value, isPasswordValid : state.value.trim().length > 6}
  }
  return { value: '', isPasswordValid: false };
}


const Login = (props) => {
  const [enteredCollegeName, setEnteredCollegeName] = useState("");
  const [collegeNameIsValid, setCollegeNameIsValid] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {value: '', isValid: null});    // Setting initial state here

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {value: '', isPasswordValid: null})

  const {isValid: emailIsValid} = emailState;
  const {isPasswordValid: passowardIsValid} = passwordState;

  useEffect(() => {
    //console.log('EFFECT RUNNING')
    const identifier = setTimeout(() => {
      console.log('Checking Validity')
      setFormIsValid(
        emailIsValid && passowardIsValid
      );
    }, 500);

    return () => {
      console.log('CLEANUP');
      clearTimeout(identifier);
    };
  }, [emailIsValid, passowardIsValid]); //[enteredEmail, enteredPassword, enteredCollegeName]

  const emailChangeHandler = (event) => {

    dispatchEmail({type:'USER_INPUT', val: event.target.value})
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type:'USER_PASSWORD', val: event.target.value})

  };

  const collegeNameHandler = (event) => {
    setEnteredCollegeName(event.target.value);
  };

  const validateEmailHandler = () => {
    
    dispatchEmail({type:'INPUT_BLUR'});
    // setEmailIsValid(emailState.isValid);    //.includes("@")
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type:'PASSWORD_BLUR'})
    // setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const validateCollegeHandler = () => {
    setCollegeNameIsValid(enteredCollegeName.trim().length > 0);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value, enteredCollegeName);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isPasswordValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
          <div
            className={`${classes.control} ${
              collegeNameIsValid === false ? classes.invalid : ""
            }`}
          >
            <label htmlFor="clg">College Name:</label>
            <input
              type="text"
              id="clg"
              value={enteredCollegeName}
              onChange={collegeNameHandler}
              onBlur={validateCollegeHandler}
            />
          </div>
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;