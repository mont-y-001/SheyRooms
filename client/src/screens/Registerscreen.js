import React, { useState } from 'react'
import { supabase } from '../supabaseClient'
import Loader from '../components/Loader'
import Error from '../components/Error'
import Success from '../components/Success'

function Registerscreen() {
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [cpassword, setcpassword] = useState('')

  const [loading, setloading] = useState(false)
  const [error, seterror] = useState()
  const [success, setsuccess] = useState()

  async function register() {
    if (password === cpassword) {
      try {
        setloading(true)
        const { error: authError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name: name,
            },
          },
        })

        if (authError) throw authError

        setloading(false)
        setsuccess("Registration Successful! Please check your email for verification.")
        setname('')
        setemail('')
        setpassword('')
        setcpassword('')
      } catch (error) {
        setloading(false)
        seterror(error.message || "Registration Failed")
        console.log(error)
      }
    } else {
      alert("Passwords Do Not Match!")
    }
  }

  return (
    <div>
      {loading && (<Loader />)}
      {error && (<Error message={error} />)}
      {success && (<Success message={success} />)}

      <div className='row justify-content-center mt-5'>
        <div className='col-md-5'>
          <div className='bs border'>
            <h1 className='text-center'>Register</h1>
            <input type='text' className='form-control' placeholder='Name' value={name} onChange={(e) => { setname(e.target.value) }} />
            <input type='text' className='form-control' placeholder='Email' value={email} onChange={(e) => { setemail(e.target.value) }} />
            <input type='password' className='form-control' placeholder='Password' value={password} onChange={(e) => { setpassword(e.target.value) }} />
            <input type='password' className='form-control' placeholder='Confirm Password' value={cpassword} onChange={(e) => { setcpassword(e.target.value) }} />
            <button className='btn btn-dark mt-3' onClick={register}>Register</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Registerscreen