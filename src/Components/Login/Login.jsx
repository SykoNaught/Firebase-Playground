import React, { useCallback, useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import firebase from '../../firebase/firebase' 
import { AuthContext } from '../../Auth'
import { Grid } from '@material-ui/core'



const Login = ({history}) => {
    const [state, setState] = useState({
        email: '',
        password: ''
    });
    
    const handleInputChange = (e) => {
        e.persist();
        const target = e.target
        const name = target.name
        const val = target.value
        setState({
            ...state,
            [name]: val,
        });
    }

    const handleSubmit = useCallback(async e => {
        e.preventDefault()
        setSubmitted(true)

        const {email, password} = e.target.elements
        var isValid = false
        if(email.value && password.value){
            isValid = true
        }

        if (isValid){
            try {
                await firebase
                .auth()
                .signInWithEmailAndPassword(email.value, password.value)
                history.push('/')
                
            } catch(e){
                console.log(e);
                if(e.code === "auth/user-not-found"){
                    setError("There is no user with this Email");
                }else if(e.code === "auth/invalid-email"){
                    setError("Email is formatted Incorrectly")
                }else{
                    setError(e.message);
                }
                
            }
        }
    }, [history]);
    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState(false)
    const { currentUser } = useContext(AuthContext)
    if (currentUser) {
        return <Redirect to="/" />
    }
  return (
      
    <div className="registration-form flex-center">
      <div>
        <center><h1>Sign In</h1></center>
        <div className="form-container">
          <form className="register-form" onSubmit={handleSubmit}>

          
          {error && <div className='error-message'>{error}</div>}
          <Grid container spacing={2} justify="space-between">
            <Grid container item xs={12}>
              <input
                id="email"
                className="form-field"
                type="text"
                placeholder="Email"
                name="email"
                value={state.email}
                onChange={handleInputChange} />

              {submitted && !state.email && <span className="error-span">Please enter an email address</span>}
            </Grid>
            <Grid container item xs={12}>
              <input
                id="password"
                className="form-field"
                type="password"
                placeholder="password"
                name="password"
                value={state.password}
                onChange={handleInputChange} />

              {submitted && !state.password && <span className="error-span">Please enter your Password</span>}
            </Grid>
            <Grid container item xs={12}>
              <button className="btn btn-primary btn-full" type="submit">
                Register
              </button>
            </Grid>
          </Grid>
          </form>
        </div>
        <div className="floating-text">
            <Link to='/signup'>
                Don't have an account? Sign Up Here.
            </Link>
        </div>
      </div>
    </div>
  );
};

export default Login