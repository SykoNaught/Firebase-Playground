import React, {useState} from 'react'
import './Loader.css'


const Loader = () => {
    const [state, setState] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });
    return (
        <div class="wrapper">
            <div class="loading circled">
                <span class="circle c1"></span>
                <span class="circle c2"></span>
                <span class="circle c3"></span>
                <span class="circle c4"></span>
            </div>
        </div>
    ) 
}

export default Loader