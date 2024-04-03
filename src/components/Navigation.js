import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navigation({ isLoggedIn, onLogout }) {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/pets">Pets</Link>
        </li>
        <li>
          <Link to="/addpet">Add Pet</Link>
        </li>
        <li>
          {isLoggedIn ? (
            <button onClick={onLogout}>Logout</button>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;

