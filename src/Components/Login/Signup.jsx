import React, { useCallback, useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import ReactPasswordStrength from 'react-password-strength';
import firebase from '../../firebase/firebase' 
import { AuthContext } from '../../Auth'
import { Grid } from '@material-ui/core'


const SignUp = ({history}) => {
    const [state, setState] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [validEmail, setValidEmail] = useState(false)
    const [validPass, setValidPass] = useState(false)
    const [confirmPass, setConfirmPass] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState(false)
    const { currentUser } = useContext(AuthContext)

    const handlePassword = (e) => {
        const val = e.password
        const valid = e.isValid
        setState({
            ...state,
            password: val,
        });
        if (valid){
            setValidPass(true)
        }else{
            setValidPass(false)
        } 

        if (val === state.confirmPass & submitted){
            setConfirmPass(true)
        }else{
            setConfirmPass(false)
        }
    }
    const handleInputChange = (e) => {
        e.persist();
        const target = e.target
        const name = target.name
        const val = target.value
        setState({
            ...state,
            [name]: val,
        });
        if (name === 'email'){
            validateEmail(val)
        }
        if (name === 'confirmPassword'){
            if (val === state.password){
                setConfirmPass(true)
            }else{
                setConfirmPass(false)
            }
        }
    }
    function validateEmail(email) {
        const pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (pattern.test(email)) {
            setValidEmail(true)
        }else{
            setValidEmail(false)
        }
    }

    
    const handleSubmit = useCallback(async (validEmail, validPass, confirmPass, email, password, confirmPassword )  => {
        setSubmitted(true)
        
        if (confirmPassword.value === password.value){
            setConfirmPass(true)
        }else{
            setConfirmPass(false)
        }
        var isValid = false;
        if(email.value && password.value && confirmPassword.value && validEmail && validPass && confirmPass){
            isValid = true
        }else{
            isValid = false
        }
        if (isValid){
            try {
                await firebase
                .auth()
                .createUserWithEmailAndPassword(email.value, password.value)
                history.push('/')
                
            } catch(e){
                console.log(e); 
                setError(e.message);  
            }

        }
        
    }, [history]);
    
    if (currentUser) {
        return <Redirect to="/" />
    }
  return (
      
    <div className="registration-form flex-center">
        <div>
            <center><h1>Sign Up</h1></center>
            <div className="form-container">
                <form className="register-form" 
                    onSubmit={e => {
                        e.preventDefault(); 
                        handleSubmit(validEmail, validPass, confirmPass, e.target.email, e.target.password, e.target.confirmPassword)
                    }}
                >
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
                            {submitted && state.email && !validEmail && <span className="error-span">Please enter a valid email address</span>}

                        </Grid>
                        <Grid container item xs={12}>
                            <ReactPasswordStrength
                                minLength={6}
                                minScore={1}
                                scoreWords={['weak', 'weak', 'okay', 'good', 'strong']}
                                changeCallback={handlePassword}
                                className="form-field"
                                inputProps={{ name: "password", autoComplete: "off", id: "password", placeholder:"Password", value:""  }} />

                            {submitted && !state.password && <span className="error-span">Please enter a Password</span>}
                            {submitted && state.password && !validPass && <span className="error-span">Password is too weak</span>}

                        </Grid>
                        <Grid container item xs={12}>
                            <input
                                id="confirm-password"
                                className="form-field"
                                type="password"
                                placeholder="Confirm Password"
                                name="confirmPassword"
                                value={state.confirmPassword}
                                onChange={handleInputChange} />

                            {submitted && !state.confirmPassword && <span className="error-span">Please confirm your Password</span>}
                            {submitted && state.confirmPassword && !confirmPass && <span className="error-span">Passwords do not match</span>}
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
                <Link to='/login'>
                    Already have an account? Sign In Here.
                </Link>
            </div>
        </div>
    </div>
  );
};

export default SignUp