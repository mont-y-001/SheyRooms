import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';
import Error from '../components/Error';

function Loginscreen() {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);
  const navigate = useNavigate();
  const { setAuthUser } = useAuth();

  async function login() {
    seterror(null);

    try {
      setloading(true);

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      const user = data.user;

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      if (profileError) throw profileError;

      localStorage.setItem('user', JSON.stringify(profile));
      setAuthUser(profile);

      navigate('/home');

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

      <div className='row justify-content-center mt-5'>
        <div className='col-md-5'>
          <div className='bs border'>
            <h1 className='text-center'>Login</h1>

            <input type='email' className='form-control'
              value={email} onChange={(e) => setemail(e.target.value)}
              placeholder='Email' />

            <input type='password' className='form-control'
              value={password} onChange={(e) => setpassword(e.target.value)}
              placeholder='Password' />

            <button className='btn btn-dark mt-3' onClick={login}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loginscreen;