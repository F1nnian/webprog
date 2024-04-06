import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

async function tryRegistering(userData) {
  try {
    const response = await fetch('http://localhost:5000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      const data = await response.json();
      const token = data.token;
      
      localStorage.setItem('token', token);

      console.log('User registered successfully!');
      return true;
    } else {
      console.error('Failed to register user:', response.statusText);
      return false;
    }
  } catch (error) {
    console.error('Error registering user:', error.message);
    return false;
  }
}

  

function RegisterForm({ onRegister }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {

      const userData = {
        username,
        password,
        email,
        firstName,
        lastName
      };

      const registered = await tryRegistering(userData);
      if (registered){
        onRegister();
        
        setUsername('');
        setPassword('');
        setEmail('');
        setFirstName('');
        setLastName('');
      }
      navigate(-1)
      
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          First Name:
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </label>
        <label>
          Last Name:
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </label>
        <button type="submit">Register</button>
      </form>
      <p>Already have an Acount? <Link to="/login">Login here</Link></p>
    </div>
  );
}

export {RegisterForm };
