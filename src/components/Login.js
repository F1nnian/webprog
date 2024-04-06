import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

async function tryLoggingIn(username, password) {
  try {
    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      const token = data.token;
      localStorage.setItem('token', token);
      console.log('User logged in successfully!');
      return true;
    } else {
      console.error('Failed to log in:', response.statusText);
      return false;
    }
  } catch (error) {
    console.error('Error logging in:', error.message);
    return false;
  }
}

function LoginForm({ onLogin }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [failed, setFailed] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loggedIn = await tryLoggingIn(username, password);
      if (loggedIn) {
        onLogin();

        setUsername('');
        setPassword('');
        navigate(-1)
      } else {
        setFailed('Failed to log in. Please try again.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div>
      {failed && <p>{failed}</p>}
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Login</button>
        <p>Don't have an account? <Link to="/register">Register</Link></p>
      </form>
    </div>
  );
}

export default LoginForm;
