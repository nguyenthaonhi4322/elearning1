import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles.css'; 
import { API_URL } from './api';

function SignUp() {
  const [username, setUsername] = useState(''); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setError('');
    setSuccess('');

    try {
        const response = await fetch(`${API_URL}/auth/register`, { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password }), 
        });

        const data = await response.json();

        if (response.ok) {
            setSuccess(data.message || 'Đăng ký thành công! Đang chuyển đến trang Đăng nhập...');
            setTimeout(() => { navigate('/'); }, 3000); 
        } else {
            setError(data.message || 'Đăng ký thất bại. Vui lòng kiểm tra lại thông tin.');
        }
    } catch (err) {
        setError('Không thể kết nối đến máy chủ Backend.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form-box">
        <h2 className="auth-header">Tạo Tài khoản (Đăng ký)</h2>
        
        {success && <p className="success-message">{success}</p>}
        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          
          <div className="form-group">
            <label className="form-label">Tên đăng nhập:</label> 
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
              className="form-input" 
              placeholder="Nhập tên đăng nhập bạn muốn"
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Email:</label> 
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              className="form-input" 
              placeholder="Nhập địa chỉ email"
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
              placeholder="Mật khẩu (tối thiểu 6 ký tự)"
            />
          </div>
          
          <button type="submit" className="auth-button">
            Đăng ký (Sign Up)
          </button>
          
        </form>

        <p className="login-link">
            Bạn đã có tài khoản? <Link to="/" className="link">Đăng nhập (Login)</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;