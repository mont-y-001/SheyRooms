import React, { useState } from 'react'
import { supabase } from '../supabaseClient'
import Loader from '../components/Loader'
import Error from '../components/Error'

function Loginscreen() {
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [loading, setloading] = useState(false)
  const [error, seterror] = useState()

  async function login() {
    try {
      setloading(true);
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      // Get profile details
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (profileError) throw profileError;

      setloading(false);
      localStorage.setItem("currentUser", JSON.stringify(profile))
      window.location.href = "/home"

    } catch (error) {
      console.log(error)
      setloading(false);
      seterror(error.message || "Invalid Credentials")
    }
  }

  return (
    <div>
      {loading && (<Loader />)}
      {error && (<Error message={error}/>)}
      <div className='row justify-content-center mt-5'>
        <div className='col-md-5'>
          <div className='bs border'>
            <h1 className='text-center'>Login</h1>
            <input type='text' className='form-control' placeholder='Email' value={email} onChange={(e) => { setemail(e.target.value) }} />
            <input type='password' className='form-control' placeholder='Password' value={password} onChange={(e) => { setpassword(e.target.value) }} />
            <button className='btn btn-dark mt-3' onClick={login} >Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Loginscreen