import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { baseURL } from '../../services'

const CompleteProfile = () => {

    const navigate = useNavigate()

    const [state, setState] = useState({
        first_name: '',
        last_name: '',
        password: '',
    })

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.id]: e.target.value
        })
    }

    const validatePassword = (password) => {
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return re.test(password);
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        // handle validation for empty fields and invalid email
        if(!state.first_name) {
            toast.error('First name is required')
            return
        }
        if(!state.last_name) {
            toast.error('Last name is required')
            return
        }
        if(!state.password) {
            toast.error('Password is required')
            return
        }
        if(!validatePassword(state.password)) {
            toast.error('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character')
            return
        }

        // send data to backend

        try {
            const url = baseURL + 'complete-profile/'
            const { data: res } = await axios.put(url, state,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access')}`
                }
            })
            toast.success('Registration Successful')
            navigate('/login')
        } catch (error) {
            if(error.response && error.response.status >= 400 && error.response.status <= 500) {
                
            }
        }
    }

  return (
    <div className="container">
        <div className="row">
            <div className="col-md-6 offset-md-3">
                <h1 className="text-center my-5">Complete Profile</h1>
                <div className="card">
                    <div className="card-body">
                        <form noValidate onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="first_name">First Name</label>
                                <input type="text" id="first_name" value={state.first_name} onChange={handleChange} className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="last_name">Last Name</label>
                                <input type="text" id="last_name" value={state.last_name} onChange={handleChange} className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password">Password</label>
                                <input type="password" id="password" value={state.password} onChange={handleChange} className="form-control" />
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

export default CompleteProfile
