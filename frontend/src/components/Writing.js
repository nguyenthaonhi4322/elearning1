import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import '../styles.css'; 
import { FaArrowUp, FaPencilAlt, FaArrowLeft, FaSearch } from 'react-icons/fa';

// Dữ liệu giả lập (Mock Data)
const MOCK_WRITING_PROMPTS = [
    { id: 1, title: 'Essay Prompt', prompt: 'Mô tả ba phẩm chất nổi bật mà bạn tin rằng đại diện rõ nhất cho con người bạn.', wordCount: '200-300 words', image: '/images/writing1.jpg' },
    { id: 2, title: 'A Letter to Your Future Self', prompt: 'Write a letter to yourself, dated five years from now. Share your current hopes, fears, and goals with your future self.', wordCount: '150-250 words', image: '/images/writing2.jpg' },
    { id: 3, title: 'The Day the Internet Went Down', prompt: 'Imagine a day when the entire global internet suddenly and completely stops working. Describe the initial chaos and confusion. Then, explain how people in your community or home slowly began to adapt to a life without instant connectivity.', wordCount: '250-400 words', image: '/images/writing3.jpg' },
    { id: 4, title: 'Review: My Favorite Book/Movie', prompt: 'Write a review of your favorite book or movie. Briefly introduce the plot and main characters. Discuss the theme or message that resonated most deeply with you.', wordCount: '300-450 words', image: '/images/writing4.jpg' },
    { id: 5, title: 'Future of Work', prompt: 'Analyze the growing trend of working from home. Discuss one major advantage and one major disadvantage of this model.', wordCount: '400-550 words', image: '/images/writing5.jpg' },
    { id: 6, title: 'A Dialogue with an AI', prompt: 'Discuss the most significant benefits that Artificial Intelligence (AI) is bringing to society today.', wordCount: '150-200 words', image: '/images/writing6.jpg' },
];

function Writing() {
    const [user, setUser] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [selectedPrompt, setSelectedPrompt] = useState(null);
    const [userWriting, setUserWriting] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const filteredPrompts = MOCK_WRITING_PROMPTS.filter(prompt =>
        prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prompt.prompt.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSubmitWriting = async () => {
        if (!userWriting.trim()) {
            alert('Vui lòng nhập nội dung!');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/writing/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: user,
                    promptId: selectedPrompt.id,
                    title: selectedPrompt.title,
                    content: userWriting,
                }),
            });

            const data = await response.json();
            if (data.success) {
                alert('' + data.message);
                setUserWriting('');
                setSelectedPrompt(null);
            } else {
                alert(' ' + data.message);
            }
        } catch (error) {
            console.error(error);
            alert('Lỗi kết nối tới server!');
        }
    };

    const handleSelectPrompt = (prompt) => {
        setSelectedPrompt(prompt);
        setUserWriting('');
        window.scrollTo(0, 0);
    };

    const handleBackToGrid = () => {
        setSelectedPrompt(null);
        window.scrollTo(0, 0);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        navigate('/');
    };

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    const toggleVisibility = () => setIsVisible(window.pageYOffset > 300);

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        const token = localStorage.getItem('token');
        if (!token || !storedUsername) {
            navigate('/');
            return;
        }
        setUser(storedUsername);
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, [navigate]);

    const PromptCard = ({ prompt, onSelect }) => (
        <div
            className="article-card"
            onClick={() => onSelect(prompt)}
            style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                backgroundColor: 'white'
            }}
            onMouseOver={e => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
        >
            <img src={prompt.image} alt={prompt.title} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
            <div style={{ padding: '15px' }}>
                <h4 style={{ margin: '0 0 10px 0', fontSize: '1.1rem', color: '#333' }}>
                    <FaPencilAlt style={{ marginRight: '8px', color: '#dc3545' }} />
                    {prompt.title}
                </h4>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#6c757d' }}>
                    <strong>Recommended length:</strong> {prompt.wordCount}
                </p>
            </div>
        </div>
    );

    const renderPromptDetail = () => (
        <div style={{
            padding: '15px',
            margin: '0 auto',
            maxWidth: '900px',
            backgroundColor: '#ffffff',
            borderRadius: '10px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
        }}>
            <button
                onClick={handleBackToGrid}
                style={{
                    background: 'none',
                    border: 'none',
                    color: '#007bff',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    marginBottom: '20px',
                    fontWeight: 'bold'
                }}
            >
                <FaArrowLeft style={{ marginRight: '8px' }} />
                Quay lại danh sách
            </button>

            <h1 style={{ color: '#dc3545', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
                {selectedPrompt.title}
            </h1>

            <div style={{ margin: '15px 0', color: '#555', backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '5px' }}>
                <p style={{ margin: 0, fontWeight: 'bold' }}>Đề bài:</p>
                <p style={{ margin: '5px 0 10px 0', lineHeight: '1.6' }}>{selectedPrompt.prompt}</p>
                <span style={{ color: '#888', fontSize: '0.9rem' }}>
                    Độ dài đề nghị: <strong>{selectedPrompt.wordCount}</strong> | Ngày đăng: 03/06/2025
                </span>
            </div>

            <img
                src={selectedPrompt.image}
                alt={selectedPrompt.title}
                style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '8px', marginBottom: '20px' }}
            />

            <h2 style={{ color: '#333', marginTop: '20px', borderBottom: '1px dashed #ccc', paddingBottom: '8px' }}>
                Khu vực làm bài của bạn
            </h2>

            <textarea
                value={userWriting}
                onChange={(e) => setUserWriting(e.target.value)}
                placeholder="Bắt đầu viết bài của bạn ở đây..."
                rows="15"
                style={{
                    width: '100%',
                    padding: '15px',
                    fontSize: '1.1rem',
                    lineHeight: '1.6',
                    border: '1px solid #ced4da',
                    borderRadius: '5px',
                    boxSizing: 'border-box',
                    resize: 'vertical'
                }}
            />

            <p style={{ textAlign: 'right', color: '#6c757d', fontSize: '0.9rem' }}>
                Số từ: <strong>{userWriting.split(/\s+/).filter(word => word.length > 0).length}</strong>
            </p>

            <button
                onClick={handleSubmitWriting}
                style={{ 
                    marginTop: '10px', 
                    padding: '12px 30px', 
                    backgroundColor: '#dc3545', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '5px', 
                    cursor: 'pointer', 
                    fontWeight: 'bold',
                    marginBottom: '15px' 
                }}
            >
                Gửi Bài và Hoàn thành
            </button>
        </div>
    );

    return (
        <div className="full-page-layout" style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh', 
            width: '100%', 
            overflow: 'hidden' 
        }}>
            <Header user={user} onLogout={handleLogout} />

            <div className="main-content" style={{ flex: 1, padding: '1px 0 0 0' }}> 
                <h1 className="section-title" style={{ marginTop: '0', marginBottom: '15px', textAlign: 'center' }}>
                    ✍️ Trang Luyện viết (Writing)
                </h1>

                {selectedPrompt ? (
                    renderPromptDetail()
                ) : (
                    <>
                        <h2 className="section-title" style={{
                            marginTop: '0',
                            paddingBottom: '10px',
                            maxWidth: '900px',
                            margin: '20px auto 0 auto'
                        }}>
                            Danh sách Bài tập Viết
                        </h2>

                        {/* Thanh Tìm Kiếm */}
                        <div style={{
                            maxWidth: '900px',
                            margin: '0 auto',
                            marginTop: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            padding: '0 10px'
                        }}>
                            <div style={{ position: 'relative', width: '93%' }}>
                                <FaSearch 
                                    style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '12px',
                                        transform: 'translateY(-50%)',
                                        color: '#888'
                                    }}
                                />
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Tìm kiếm đề viết..."
                                    style={{
                                        width: '100%',
                                        padding: '10px 15px 10px 40px',
                                        borderRadius: '6px',
                                        border: '1px solid #ddd',
                                        fontSize: '1rem',
                                        outline: 'none',
                                        transition: '0.2s',
                                    }}
                                    onFocus={(e) => e.target.style.border = '1px solid #6e9277'}
                                    onBlur={(e) => e.target.style.border = '1px solid #ddd'}
                                />
                            </div>
                        </div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                            gap: '25px',
                            padding: '30px 20px', 
                            maxWidth: '960px',
                            margin: '0 auto' 
                        }}>
                            {filteredPrompts.map(prompt => (
                                <PromptCard key={prompt.id} prompt={prompt} onSelect={handleSelectPrompt} />
                            ))}
                        </div>
                    </>
                )}
            </div>

            {isVisible && (
                <button onClick={scrollToTop} className="scroll-to-top-button" title="Lên đầu trang">
                    <FaArrowUp />
                </button>
            )}
            <div style={{marginBottom:'36px'}}></div>
            <Footer style={{ marginTop: '0' }}/> 
        </div>
    );
}

export default Writing;