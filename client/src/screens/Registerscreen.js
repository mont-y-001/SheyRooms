import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Success from '../components/Success';

function Registerscreen() {
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [cpassword, setcpassword] = useState('');

  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);
  const [success, setsuccess] = useState(null);
  const navigate = useNavigate();

  async function register() {
    seterror(null);
    setsuccess(null);

    if (password !== cpassword) {
      return seterror("Passwords do not match");
    }

    try {
      setloading(true);

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name }
        }
      });

      if (error) throw error;

      setsuccess("Registration successful! Redirecting to login...");

      setname('');
      setemail('');
      setpassword('');
      setcpassword('');

      setTimeout(() => navigate('/login'), 2000);

    } catch (err) {
      seterror(err.message);
    } finally {
      setloading(false);
    }
  }

  return (
    <div>
      {loading && <Loader />}
      {error && <Error message={error} />}
      {success && <Success message={success} />}

      <div className='row justify-content-center mt-5'>
        <div className='col-md-5'>
          <div className='bs border'>
            <h1 className='text-center'>Register</h1>

            <input type='text' className='form-control' placeholder='Name'
              value={name} onChange={(e) => setname(e.target.value)} />

            <input type='email' className='form-control' placeholder='Email'
              value={email} onChange={(e) => setemail(e.target.value)} />

            <input type='password' className='form-control' placeholder='Password'
              value={password} onChange={(e) => setpassword(e.target.value)} />

            <input type='password' className='form-control' placeholder='Confirm Password'
              value={cpassword} onChange={(e) => setcpassword(e.target.value)} />

            <button className='btn btn-dark mt-3' onClick={register}>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registerscreen;