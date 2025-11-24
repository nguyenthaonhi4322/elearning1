import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles.css'; 
import { API_URL } from '../api';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
        const response = await fetch(`${API_URL}/auth/login`, { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }), 
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.token); 
            localStorage.setItem('username', data.username); 
          
            navigate('/dashboard'); 
            
        } else {
            setError(data.message || 'Đăng nhập thất bại. Vui lòng kiểm tra Tên người dùng và Mật khẩu.');
        }
    } catch (err) {
        setError('Không thể kết nối đến máy chủ Backend.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form-box">
        <h2 className="auth-header">Đăng nhập Hệ thống </h2>
        
        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          
          <div className="form-group">
            <label className="form-label">Tên:</label> 
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Mật khẩu:</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              className="form-input"
            />
          </div>
          
          <button type="submit" className="auth-button">
            Đăng nhập (Login)
          </button>
          
        </form>

        <p className="signup-link">
            Chưa có tài khoản? 
            <Link to="/signup" className="link"> Đăng ký (Sign Up) ngay!</Link>
        </p>
      </div>
    </div>
  );
}
export default Login;
