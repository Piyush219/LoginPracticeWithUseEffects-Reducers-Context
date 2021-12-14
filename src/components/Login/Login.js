import React, { useState, useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import Input from "../UI/input/Input";

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
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
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

    // setEnteredEmail(event.target.value);
    //setFormIsValid(
      //     enteredEmail.includes("@") && enteredPassword.trim().length > 6 && enteredCollegeName.trim().length>0
      //   )
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type:'USER_PASSWORD', val: event.target.value})

    // setEnteredPassword(event.target.value);

    // setFormIsValid(
    //   event.target.value.trim().length > 6 && enteredEmail.includes('@')
    
    // );
    // setFormIsValid(
    //   emailState.isValid && event.target.value.trim().length > 6 && enteredCollegeName.trim().length > 1
    // )
  };

  const collegeNameHandler = (event) => {
    setEnteredCollegeName(event.target.value);

    // setFormIsValid(
    //     event.target.value.trim().length > 1 && emailState.value.includes('@') && passwordState.isPasswordValid
      
    //   );
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
        
        <Input id="email" label="E-Mail" type="email" isValid={emailIsValid} value={emailState.value}
         onChange={emailChangeHandler}
         onBlur={validateEmailHandler} />
          
        <Input id="password" label="Password" type="password" isValid={passowardIsValid} value={passwordState.value}
         onChange={passwordChangeHandler}
         onBlur={validatePasswordHandler} />

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
