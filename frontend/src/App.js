import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './styles.css'; 
import Login from './components/Login.js'; 
import SignUp from './components/SignUp.js';

// Import component Dashboard theo cách React hiện đại (recommended)
import Dashboard from './components/Dashboard'; 
import Reading from './components/Reading'; 
import Writing from './components/Writing';
import Vocabulary from './components/Vocabulary';
import Grammar from './components/Grammar.js';
import Quiz  from './components/Quiz.js';
import Video from './components/Video.js';
import Scores from './components/Scores.js';

import AboutUs from './components/AboutUs';
import PrivacyPolicy from './components/PrivacyPolicy';
import Terms from './components/Terms.js';

function App() {
    const isAuthenticated = () => {
        return localStorage.getItem('token') ? true : false;
    };

    const ProtectedRoute = ({ children }) => {
        if (!isAuthenticated()) {
            return <Navigate to="/" replace />; 
        }
        return children;
    };

    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Login />} /> 
                    <Route path="/signup" element={<SignUp />} /> 

                    <Route 
                        path="/dashboard" 
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        } 
                    />
                    
                    {/* TUYẾN ĐƯỜNG CHO READING */}
                    <Route 
                        path="/tutors/reading" 
                        element={
                            <ProtectedRoute>
                                <Reading /> 
                            </ProtectedRoute>
                        } 
                    />
                    {/* Tuyến đường cho WRITING */}
                    <Route 
                        path="/tutors/writing" 
                        element={
                            <ProtectedRoute>
                                <Writing /> 
                            </ProtectedRoute>
                        } 
                    />
                    {/* TUYẾN ĐƯỜNG CHO VOCABULARY */}
                    <Route 
                        path="/tutors/vocabulary" 
                        element={
                            <ProtectedRoute>
                                <Vocabulary /> 
                            </ProtectedRoute>
                        } 
                    />
                    {/* TUYẾN ĐƯỜNG CHO GRAMMAR */}
                    <Route 
                        path="/tutors/grammar" 
                        element={
                            <ProtectedRoute>
                                <Grammar /> 
                            </ProtectedRoute>
                        } 
                    />
                    {/* TUYẾN ĐƯỜNG CHO QUIZ */}
                    <Route 
                        path="/tutors/quiz" 
                        element={
                            <ProtectedRoute>
                                <Quiz /> 
                            </ProtectedRoute>
                        } 
                    />
                    {/* TUYẾN ĐƯỜNG CHO VIDEO */}
                    <Route 
                        path="/tutors/video" 
                        element={
                            <ProtectedRoute>
                                <Video /> 
                            </ProtectedRoute>
                        } 
                    />
                    {/* TUYẾN ĐƯỜNG CHÍNH THỨC CHO SCORES */}
                    <Route 
                        path="/tutors/scores" 
                        element={
                            <ProtectedRoute>
                                <Scores /> 
                            </ProtectedRoute>
                        } 
                    />
                    {/* TUYẾN ĐƯỜNG CHÍNH THỨC CHO ABOUT US */}
                    <Route 
                        path="/tutors/about-us" 
                        element={
                            <ProtectedRoute>
                                <AboutUs /> 
                            </ProtectedRoute>
                        } 
                    />
                    {/* TUYẾN ĐƯỜNG CHÍNH THỨC CHO PRIVACY POLICY */}
                    <Route 
                        path="/tutors/policy" 
                        element={
                            <ProtectedRoute>
                                <PrivacyPolicy /> 
                            </ProtectedRoute>
                        } 
                    />
                   {/* TUYẾN ĐƯỜNG CHÍNH THỨC CHO TERM */}
                    <Route 
                        path="/tutors/terms" 
                        element={
                            <ProtectedRoute>
                                <Terms/> 
                            </ProtectedRoute>
                        } 
                    />
                    
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />

                </Routes>
            </div>
        </Router>
    );
}

export default App;