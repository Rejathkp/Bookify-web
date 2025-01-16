import { useState } from 'react';
import './register.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [credentials, setCredentials] = useState({
    name: undefined,
    email: undefined,
    password: undefined,
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/register', credentials);
      if (res.data.success) {
        navigate('/login'); // Redirect to login page on successful registration
      } else {
        setError(res.data.message); // Display the error message from the server
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong!');
    }
  };

  return (
    <div className="register">
      <div className="rContainer">
        <input
          type="text"
          placeholder="Name"
          id="name"
          onChange={handleChange}
          className="rInput"
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          onChange={handleChange}
          className="rInput"
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          onChange={handleChange}
          className="rInput"
        />
        <button onClick={handleClick} className="rButton">
          Register
        </button>
        {error && <span className="rError">{error}</span>}
      </div>
    </div>
  );
}

export default Register;
