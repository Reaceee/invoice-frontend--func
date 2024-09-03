import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { baseURL } from '../../services'

const VerifyOtp = () => {

    const navigate = useNavigate()

    const [state, setState] = useState({
        otp_code: ''
    })

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.id]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await axios.post(baseURL + 'verify-otp/', state)
        try {
            if(response.status === 200) {
                localStorage.setItem('access', response.data.access_token)
                toast.success('OTP verified successfully')
                navigate('/complete-profile')
            }
        } catch (error) {
            if(error.response && error.response.status >= 400 && error.response.status <= 500) {
                toast.error(error.response.data.detail[0])
            }
        }
    }  

  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3'>
                <h1 className='text-center my-5'>Verify OTP</h1>
                <div className='card'>
                    <div className='card-body'>
                        <form noValidate onSubmit={handleSubmit}>
                            <div className='mb-3'>
                                <label htmlFor='otp_code'>OTP</label>
                                <input type='text' id='otp_code' value={state.otp_code} onChange={handleChange} className='form-control' />
                            </div>
                            <button className='btn btn-primary'>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default VerifyOtp
