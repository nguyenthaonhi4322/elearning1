import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header'; 
import Footer from './Footer'; 
import '../styles.css';
import { FaTrophy, FaRedoAlt, FaCalendarAlt, FaTrash } from 'react-icons/fa';

// Hàm helper để định dạng ngày/giờ
const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    const dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    const timeOptions = { hour: '2-digit', minute: '2-digit' };
    
    const formattedDate = date.toLocaleDateString('vi-VN', dateOptions);
    const formattedTime = date.toLocaleTimeString('vi-VN', timeOptions);
    return `${formattedDate} lúc ${formattedTime}`;
};


function Scores() {
    const [user, setUser] = useState(null);
    const [scoreList, setScoreList] = useState([]);
    const navigate = useNavigate();

    // Hàm đọc điểm từ localStorage
    const loadScores = () => {
        const existingScoresJson = localStorage.getItem('quizScores');
        if (existingScoresJson) {
            try {
                const scores = JSON.parse(existingScoresJson);
                setScoreList(scores);
            } catch (error) {
                console.error("Lỗi khi đọc điểm từ localStorage:", error);
                setScoreList([]);
            }
        }
    };

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        const token = localStorage.getItem('token');

        if (!token || !storedUsername) {
            navigate('/');
            return;
        }
        setUser(storedUsername);

        // Gọi hàm loadScores khi component mount
        loadScores();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        navigate('/');
    };
    
    // Hàm này giúp người dùng quay lại trang Quiz
    const handleGoToQuiz = () => {
        navigate('/tutors/quiz');
    };
    
    // **********************************************
    // HÀM XỬ LÝ XÓA MỤC ĐIỂM
    const handleDeleteScore = (indexToDelete) => {
        // Tạo một bản sao mới của mảng điểm, loại bỏ mục tại indexToDelete
        const updatedScores = scoreList.filter((_, index) => index !== indexToDelete);
        
        // Cập nhật State
        setScoreList(updatedScores);
        
        // Cập nhật localStorage
        localStorage.setItem('quizScores', JSON.stringify(updatedScores));
        
        console.log(`Đã xóa mục điểm tại index: ${indexToDelete}`);
    };

    const renderScoreCard = (scoreRecord, index) => {
        const percentage = (scoreRecord.score / scoreRecord.totalQuestions) * 100;
        const isPass = percentage >= 50; // Giả định 50% là đạt

        return (
            <div 
                key={index}
                style={{
                    border: isPass ? '2px solid #28a745' : '2px solid #dc3545',
                    borderRadius: '8px',
                    padding: '15px',
                    marginBottom: '15px',
                    backgroundColor: 'white',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap'
                }}
            >
                {/* Cột Chi tiết Quiz */}
                <div style={{ flex: '3 1 300px' }}>
                    <h3 style={{ margin: '0 0 5px 0', color: '#007bff' }}>
                        {scoreRecord.title}
                    </h3>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#6c757d' }}>
                        <FaCalendarAlt style={{ marginRight: '5px' }} />
                        Lần làm gần nhất: {formatDateTime(scoreRecord.date)}
                    </p>
                </div>

                {/* Cột Điểm số */}
                <div style={{ flex: '1 1 150px', textAlign: 'center', padding: '0 10px' }}>
                    <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold', color: isPass ? '#28a745' : '#dc3545' }}>
                        {scoreRecord.score} / {scoreRecord.totalQuestions}
                    </p>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#6c757d' }}>
                        ({percentage.toFixed(0)}%)
                    </p>
                </div>

                {/* Cột Trạng thái & Nút Xóa */}
                <div style={{ flex: '1 1 120px', textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>
                    {/* Trạng thái */}
                    <span 
                        style={{ 
                            padding: '5px 10px', 
                            borderRadius: '20px', 
                            backgroundColor: isPass ? '#28a745' : '#dc3545', 
                            color: 'white', 
                            fontWeight: 'bold', 
                            fontSize: '0.85rem'
                        }}
                    >
                        {isPass ? 'Đạt' : 'Chưa Đạt'}
                    </span>
                    
                    {/* Nút Xóa */}
                    <button
                        onClick={() => handleDeleteScore(index)}
                        style={{
                            padding: '5px 10px',
                            backgroundColor: '#b2b2b1', 
                            color: 'black', 
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontSize: '0.85rem',
                            display: 'flex',
                            alignItems: 'center',
                            fontWeight: 'bold'
                        }}
                        title="Xóa mục điểm này"
                    >
                        <FaTrash style={{ marginRight: '5px' }} />
                        Xóa
                    </button>
                </div>
            </div>
        );
    };


    if (!user) {
        return <div className="loading-state">Đang tải...</div>;
    }
    
    return (
        <div className="full-page-layout">
            <Header user={user} onLogout={handleLogout} />

            <div className="main-content" style={{ padding: '20px', maxWidth: '960px', margin: '0 auto', overflowX: 'hidden' }}>
                <h1 className="section-title" style={{marginTop: '10px', borderBottom: '2px solid #eee', paddingBottom: '10px'}}>
                    <FaTrophy style={{ color: '#ffc107', marginRight: '10px' }}/> Lịch Sử Điểm Bài Tập
                </h1>
                
                {scoreList.length > 0 ? (
                    <div style={{ marginTop: '20px' }}>
                        <p style={{ color: '#555', marginBottom: '20px' }}>
                            Đây là danh sách "{scoreList.length}" kết quả quiz gần nhất của bạn:
                        </p>
                        {/* Hiển thị tiêu đề cột */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 20px', marginBottom: '10px', fontWeight: 'bold', color: '#343a40' }}>
                            <span style={{ flex: '3 1 300px' }}>Chi tiết Quiz</span>
                            <span style={{ flex: '1 1 150px', textAlign: 'center' }}>Điểm số</span>
                            <span style={{ flex: '1 1 120px', textAlign: 'right' }}>Trạng thái & Thao tác</span>
                        </div>
                        {scoreList.map(renderScoreCard)}
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', padding: '50px', backgroundColor: '#fffbe6', border: '1px solid #ffeeba', borderRadius: '8px', marginTop: '30px' }}>
                        <h2 style={{ color: '#856404' }}>Chưa có dữ liệu điểm</h2>
                        <p style={{ color: '#856404' }}>Vui lòng làm bài kiểm tra trong trang Luyện trắc nghiệm (Quiz) để xem điểm số.</p>
                        <button
                            onClick={handleGoToQuiz}
                            style={{
                                marginTop: '20px',
                                padding: '10px 20px',
                                backgroundColor: '#007bff',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                fontSize: '1rem'
                            }}
                        >
                            <FaRedoAlt style={{ marginRight: '8px' }} />
                            Đến trang Quiz
                        </button>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
}

export default Scores;