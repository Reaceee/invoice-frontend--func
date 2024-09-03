import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { baseURL } from '../../services'

const Register = () => {
    const navigate = useNavigate()

    const [state, setState] = useState({
        email: ''
    })
    const [errors, setErrors] = useState({});

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.id]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        // handle validation for empty fields and invalid email
        

        // send data to backend

        try {
            const url = baseURL + 'register/'
            const response = await axios.post(url, state)
            toast.success('Registration Successful')
            navigate('/login')
        } catch (error) {
            if(error.response && error.response.status >= 400 && error.response.status <= 500) {
                const { email} = error.response.data
                setErrors({email})
                toast.error(error.response.data.detail)
            }
        }
    }

  return (
    <div className="container">
        <div className="row">
            <div className="col-md-6 offset-md-3">
                <h1 className="text-center my-5">Register</h1>
                <div className="card">
                    <div className="card-body">
                        <form noValidate onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" value={state.email} onChange={handleChange} className="form-control" />
                                {errors.email && <div className="alert alert-danger">{errors.email}</div>}
                            </div>
                            {/* Submit button */}
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Register
