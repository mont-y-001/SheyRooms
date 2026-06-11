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
    <div className="page-screen">
      {loading && <Loader />}
      <section className="page-hero text-center">
        <div className="container">
          <h1 className="display-5 fw-bold mb-2">Welcome <span className="accent">Back</span></h1>
          <p className="lead">Sign in to manage your bookings and listings</p>
        </div>
      </section>
      <section className="page-content">
        <div className="container">
          {error && <Error message={error} />}
          <div className="row justify-content-center">
            <div className="col-md-5">
              <div className="glass-card-static">
                <h3 className="text-center mb-4">Login</h3>
                <div className="mb-3">
                  <input type="email" className="form-control"
                    value={email} onChange={(e) => setemail(e.target.value)}
                    placeholder="Email" />
                </div>
                <div className="mb-3">
                  <input type="password" className="form-control"
                    value={password} onChange={(e) => setpassword(e.target.value)}
                    placeholder="Password" />
                </div>
                <button className="btn btn-dark w-100" onClick={login}>
                  <i className="fa fa-sign-in me-2"></i> Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Loginscreen;