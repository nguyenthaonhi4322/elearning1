import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header'; 
import Footer from './Footer'; 
import '../styles.css';
import { FaArrowUp, FaPencilAlt, FaSearch, FaArrowLeft } from 'react-icons/fa'; 

// Dữ liệu MOCK cho 12 Chủ đề Ngữ pháp (Tenses)
const MOCK_GRAMMAR_TOPICS = [
    { id: 1, title: 'Thì Hiện tại Đơn (Present Simple)', image: '/images/grammar1.jpg' }, 
    { id: 2, title: 'Thì Hiện tại Tiếp diễn (Present Continuous)', image: '/images/grammar2.jpg'},
    { id: 3, title: 'Thì Hiện Tại Hoàn Thành (Present Perfect)', image: '/images/grammar3.jpg' },
    { id: 4, title: 'Thì Hiện Tại Hoàn Thành Tiếp Diễn (Present Perfect Continuous)', image: '/images/grammar4.jpg' },
    { id: 5, title: 'Thì Quá khứ Đơn (Past Simple)', image: '/images/grammar5.jpg' },
    { id: 6, title: 'Thì Quá Khứ Tiếp Diễn (Past Continuous)', image: '/images/grammar6.jpg' },
    { id: 7, title: 'Thì Quá Khứ Hoàn Thành (Past Perfect)', image: '/images/grammar7.jpg' },
    { id: 8, title: 'Thì Quá Khứ Hoàn Thành Tiếp Diễn (Past Perfect Continuous)', image: '/images/grammar8.jpg' },
    { id: 9, title: 'Thì Tương Lai Đơn (Future Simple)', image: '/images/grammar9.jpg' },
    { id: 10, title: 'Thì Tương Lai Tiếp Diễn (Future Continuous)', image: '/images/grammar10.jpg' },
    { id: 11, title: 'Thì Tương Lai Hoàn Thành (Future Perfect)', image: '/images/grammar11.jpg' },
    { id: 12, title: 'Thì Tương Lai Hoàn Thành Tiếp Diễn (Future Perfect Continuous)', image: '/images/grammar12.jpg' },
];

const ICON_MAP = {
    FaPencilAlt: FaPencilAlt,
    FaSearch: FaSearch,
};

// ========================================================================
const MOCK_PRACTICE_DATA = {
    // 1. Hiện tại Đơn 
    1: [ 
        { id: 'p1_1', mode: 'Khẳng định', formula: "S + V(s/es)", example: "The sun rises in the East.", sentence: "She (study) ________ English every day.", correctAnswer: "studies" },
        { id: 'p1_2', mode: 'Phủ định', formula: "S + do/does + NOT + V(nguyên mẫu)", example: "I do not drink coffee.", sentence: "My parents (not/live) ________ in Hanoi.", correctAnswer: "don't live" },
        { id: 'p1_3', mode: 'Nghi vấn', formula: "Do/Does + S + V(nguyên mẫu)?", example: "Does he play tennis?", sentence: "(Do) ________ you like watching films?", correctAnswer: "Do" },
    ],
    // 2. Hiện tại Tiếp diễn 
    2: [
        { id: 'p2_1', mode: 'Khẳng định', formula: "S + am/is/are + V-ing", example: "They are playing football right now.", sentence: "Listen! The bird (sing) ________ a beautiful song.", correctAnswer: "is singing" },
        { id: 'p2_2', mode: 'Phủ định', formula: "S + am/is/are + NOT + V-ing", example: "I am not working at the moment.", sentence: "We (not/watch) ________ TV tonight.", correctAnswer: "are not watching" },
        { id: 'p2_3', mode: 'Nghi vấn', formula: "Am/Is/Are + S + V-ing?", example: "Are you learning English?", sentence: "(Is) ________ he driving now?", correctAnswer: "Is" },
    ],
    // 3. Hiện Tại Hoàn Thành 
    3: [
        { id: 'p3_1', mode: 'Khẳng định', formula: "S + have/has + V3/ed", example: "She has finished her homework.", sentence: "I (just/see) ________ him at the market.", correctAnswer: "have just seen" },
        { id: 'p3_2', mode: 'Phủ định', formula: "S + have/has + NOT + V3/ed", example: "They haven't seen that movie yet.", sentence: "He (not/eat) ________ anything since morning.", correctAnswer: "hasn't eaten" },
        { id: 'p3_3', mode: 'Nghi vấn', formula: "Have/Has + S + V3/ed?", example: "Have you ever been to Paris?", sentence: "(Have) ________ they bought the tickets yet?", correctAnswer: "Have" },
    ],
    // 4. Hiện Tại Hoàn Thành Tiếp Diễn 
    4: [
        { id: 'p4_1', mode: 'Khẳng định', formula: "S + have/has + been + V-ing", example: "He has been waiting for two hours.", sentence: "She (work) ________ here since 2018.", correctAnswer: "has been working" },
        { id: 'p4_2', mode: 'Phủ định', formula: "S + have/has + NOT + been + V-ing", example: "I haven't been feeling well recently.", sentence: "They (not/practice) ________ hard enough.", correctAnswer: "haven't been practicing" },
        { id: 'p4_3', mode: 'Nghi vấn', formula: "Have/Has + S + been + V-ing?", example: "Has he been sleeping?", sentence: "(Have) ________ you been exercising regularly?", correctAnswer: "Have" },
    ],
    // 5. Quá khứ Đơn 
    5: [
        { id: 'p5_1', mode: 'Khẳng định', formula: "S + V2/ed", example: "We went to the cinema yesterday.", sentence: "They (buy) ________ a new car last month.", correctAnswer: "bought" },
        { id: 'p5_2', mode: 'Phủ định', formula: "S + did + NOT + V(nguyên mẫu)", example: "She didn't call me back.", sentence: "I (not/go) ________ to the party last night.", correctAnswer: "didn't go" },
        { id: 'p5_3', mode: 'Nghi vấn', formula: "Did + S + V(nguyên mẫu)?", example: "Did you finish the report?", sentence: "(Did) ________ he see the movie yesterday?", correctAnswer: "Did" },
    ],
    // 6. Quá Khứ Tiếp Diễn 
    6: [
        { id: 'p6_1', mode: 'Khẳng định', formula: "S + was/were + V-ing", example: "I was reading a book at 7 PM yesterday.", sentence: "While she (cook) ________, the phone rang.", correctAnswer: "was cooking" },
        { id: 'p6_2', mode: 'Phủ định', formula: "S + was/were + NOT + V-ing", example: "They weren't studying when I came in.", sentence: "He (not/listen) ________ to the teacher.", correctAnswer: "wasn't listening" },
        { id: 'p6_3', mode: 'Nghi vấn', formula: "Was/Were + S + V-ing?", example: "Were you sleeping at midnight?", sentence: "(Were) ________ they swimming in the pool?", correctAnswer: "Were" },
    ],
    // 7. Quá Khứ Hoàn Thành 
    7: [
        { id: 'p7_1', mode: 'Khẳng định', formula: "S + had + V3/ed", example: "He had left before I arrived.", sentence: "She (finish) ________ her work before dinner.", correctAnswer: "had finished" },
        { id: 'p7_2', mode: 'Phủ định', formula: "S + had + NOT + V3/ed", example: "We hadn't eaten anything before the trip.", sentence: "The train (not/arrive) ________ when we got there.", correctAnswer: "hadn't arrived" },
        { id: 'p7_3', mode: 'Nghi vấn', formula: "Had + S + V3/ed?", example: "Had he met her before?", sentence: "(Had) ________ they completed the project before the deadline?", correctAnswer: "Had" },
    ],
    // 8. Quá Khứ Hoàn Thành Tiếp Diễn 
    8: [
        { id: 'p8_1', mode: 'Khẳng định', formula: "S + had + been + V-ing", example: "They had been working for 3 hours before they took a break.", sentence: "I was tired because I (run) ________ all morning.", correctAnswer: "had been running" },
        { id: 'p8_2', mode: 'Phủ định', formula: "S + had + NOT + been + V-ing", example: "She hadn't been waiting long when the bus arrived.", sentence: "The road (not/be) ________ closed for long.", correctAnswer: "hadn't been" },
    ],
    // 9. Tương Lai Đơn 
    9: [
        { id: 'p9_1', mode: 'Khẳng định', formula: "S + will + V(nguyên mẫu)", example: "I will call you back later.", sentence: "Maybe he (come) ________ to the party.", correctAnswer: "will come" },
        { id: 'p9_2', mode: 'Phủ định', formula: "S + will + NOT + V(nguyên mẫu)", example: "She will not join the meeting.", sentence: "They (not/pass) ________ the exam easily.", correctAnswer: "will not pass" },
        { id: 'p9_3', mode: 'Nghi vấn', formula: "Will + S + V(nguyên mẫu)?", example: "Will you marry me?", sentence: "(Will) ________ you help me with this task?", correctAnswer: "Will" },
    ],
    // 10. Tương Lai Tiếp Diễn 
    10: [
        { id: 'p10_1', mode: 'Khẳng định', formula: "S + will be + V-ing", example: "Tomorrow at 10 AM, I will be driving to work.", sentence: "This time next week, we (lie) ________ on the beach.", correctAnswer: "will be lying" },
        { id: 'p10_2', mode: 'Phủ định', formula: "S + will + NOT + be + V-ing", example: "I won't be studying this evening.", sentence: "He (not/sleep) ________ when you call him.", correctAnswer: "will not be sleeping" },
        { id: 'p10_3', mode: 'Nghi vấn', formula: "Will + S + be + V-ing?", example: "Will you be coming to the party?", sentence: "(Will) ________ she be working tomorrow afternoon?", correctAnswer: "Will" },
    ],
    // 11. Tương Lai Hoàn Thành 
    11: [
        { id: 'p11_1', mode: 'Khẳng định', formula: "S + will have + V3/ed", example: "By next month, she will have saved $1000.", sentence: "By 2026, I (graduate) ________ from university.", correctAnswer: "will have graduated" },
        { id: 'p11_2', mode: 'Phủ định', formula: "S + will + NOT + have + V3/ed", example: "I won't have finished the book by Sunday.", sentence: "The project (not/be) ________ completed by the deadline.", correctAnswer: "will not have been" },
        { id: 'p11_3', mode: 'Nghi vấn', formula: "Will + S + have + V3/ed?", example: "Will he have left by the time we arrive?", sentence: "(Will) ________ they have prepared dinner by 7 PM?", correctAnswer: "Will" },
    ],
    // 12. Tương Lai Hoàn Thành Tiếp Diễn 
    12: [
        { id: 'p12_1', mode: 'Khẳng định', formula: "S + will have been + V-ing", example: "By Christmas, I will have been living here for ten years.", sentence: "By the end of this year, they (work) ________ here for five years.", correctAnswer: "will have been working" },
        { id: 'p12_2', mode: 'Phủ định', formula: "S + will + NOT + have + been + V-ing", example: "He won't have been traveling for long.", sentence: "She (not/wait) ________ for two hours when he arrives.", correctAnswer: "will not have been waiting" },
        { id: 'p12_3', mode: 'Nghi vấn', formula: "Will + S + have + been + V-ing?", example: "Will you have been studying for four years by graduation?", sentence: "(Will) ________ he have been running for an hour by then?", correctAnswer: "Will" },
    ],
};

// =========================================================================
// COMPONENT LUYỆN TẬP (GRAMMAR PRACTICE)

const GrammarPracticeScreen = ({ topic, onBack }) => {
    const practiceItems = MOCK_PRACTICE_DATA[topic.id] || [];
    const [userAnswers, setUserAnswers] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Reset answers khi topic thay đổi
    useEffect(() => {
        const initialAnswers = practiceItems.reduce((acc, item) => {
            acc[item.id] = '';
            return acc;
        }, {});
        setUserAnswers(initialAnswers);
        setIsSubmitted(false);
    }, [topic.id]);

    const handleAnswerChange = (id, value) => {
        setUserAnswers(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSubmit = () => {
        setIsSubmitted(true);
        let correctCount = 0;
        practiceItems.forEach(item => {
            // Chuẩn hóa câu trả lời và đáp án
            const userAnswer = userAnswers[item.id]?.trim().toLowerCase().replace(/\s+/g, ' ');
            const correctAnswer = item.correctAnswer.trim().toLowerCase().replace(/\s+/g, ' ');
            if (userAnswer === correctAnswer) {
                correctCount++;
            }
        });
        alert(`Bạn đã trả lời đúng ${correctCount}/${practiceItems.length} câu.`);
    };

    const getResultStyle = (id, item) => {
        if (!isSubmitted) return {};

        const userAnswer = userAnswers[id]?.trim().toLowerCase().replace(/\s+/g, ' ');
        const correctAnswer = item.correctAnswer.trim().toLowerCase().replace(/\s+/g, ' ');

        if (userAnswer === correctAnswer) {
            return { border: '2px solid #2ecc71', backgroundColor: '#e8f8f5' };
        } else {
            return { border: '2px solid #e74c3c', backgroundColor: '#fbe9e7' };
        }
    };
    
    // TRƯỜNG HỢP KHÔNG CÓ BÀI TẬP/CÔNG THỨC
    if (practiceItems.length === 0) {
        return (
            <div className="vocabulary-container" style={{ maxWidth: '700px', margin: '30px auto', padding: '20px', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }}>
                <button onClick={onBack} style={{ 
                    background: 'none', 
                    border: 'none', 
                    color: '#007bff', 
                    cursor: 'pointer', 
                    fontSize: '1.1rem', 
                    marginBottom: '20px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    fontWeight: 'bold' 
                }}>
                    <FaArrowLeft style={{ marginRight: '8px'}} /> Quay lại danh sách
                </button>
                <h2 style={{ color: '#34495e', textAlign: 'center' }}>Chủ đề: {topic.title}</h2>
                <p style={{ textAlign: 'center', color: '#e67e22', fontSize: '1.1rem', marginTop: '20px' }}>
                    ⚠️ Hiện chưa có nội dung nào được thêm cho chủ đề này.
                </p>
            </div>
        );
    }

    // TRƯỜNG HỢP CÓ CÔNG THỨC VÀ BÀI TẬP
    return (
        <div className="vocabulary-container" style={{ maxWidth: '700px', margin: '30px auto', padding: '20px', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }}>
            
            <button onClick={onBack} style={{ 
                background: 'none', 
                border: 'none', 
                color: '#007bff', 
                cursor: 'pointer', 
                fontSize: '1.1rem', 
                marginBottom: '20px', 
                display: 'flex', 
                alignItems: 'center',
                fontWeight: 'bold' 
            }}>
                <FaArrowLeft style={{ marginRight: '8px' }} /> Quay lại danh sách
            </button>

            <h2 style={{ fontSize: '1.5rem', borderBottom: '2px solid #f0f0f0', paddingBottom: '10px', color: '#34495e' }}>
                Công thức và Bài tập: {topic.title}
            </h2>

            {/* DANH SÁCH CÔNG THỨC VÀ BÀI TẬP */}
            <div className="practice-list" style={{ marginTop: '20px' }}>
                {practiceItems.map((item) => (
                    <div 
                        key={item.id} 
                        style={{ marginBottom: '25px', padding: '15px', border: '1px solid #eee', borderRadius: '8px', backgroundColor: '#fafafa' }}
                    >
                        
                        {/* 1. DẠNG VÀ CÔNG THỨC */}
                        <p style={{ 
                            fontWeight: 'bold', 
                            color: '#e74c3c', 
                            margin: '0 0 5px 0',
                            fontSize: '1.1rem'
                        }}>
                            {item.mode}: {item.formula}
                        </p>
                        
                        {/* 2. VÍ DỤ */}
                        <p style={{ 
                            fontStyle: 'italic', 
                            color: '#555', 
                            margin: '0 0 10px 0',
                            fontSize: '1rem',
                            borderLeft: '3px solid #ccc',
                            paddingLeft: '10px'
                        }}>
                            Ví dụ: {item.example}
                        </p>
                        
                        <hr style={{ border: '0', borderTop: '1px dotted #ccc', margin: '15px 0' }} />

                        {/* 3. CÂU BÀI TẬP */}
                        <p style={{ fontWeight: 'bold', color: '#007bff', margin: '0 0 8px 0', fontSize: '1.1rem' }}>
                            Bài tập: {item.sentence.replace('________', '...')}
                        </p>
                        
                        <label style={{ display: 'block', color: '#777', marginBottom: '5px', fontSize: '0.9rem' }}>
                            Chia động từ/Điền từ còn thiếu:
                        </label>
                        
                        <input
                            type="text"
                            placeholder="Nhập đáp án tiếng Anh..."
                            value={userAnswers[item.id] || ''}
                            onChange={(e) => handleAnswerChange(item.id, e.target.value)}
                            style={{
                                width: '100%',
                                padding: '10px',
                                border: '1px solid #ccc',
                                borderRadius: '5px',
                                fontSize: '1rem',
                                boxSizing: 'border-box',
                                ...getResultStyle(item.id, item)
                            }}
                            disabled={isSubmitted}
                        />
                        
                        {isSubmitted && (
                            <p style={{ 
                                margin: '5px 0 0 0', 
                                color: getResultStyle(item.id, item).border === '2px solid #2ecc71' ? '#2ecc71' : '#e74c3c',
                                fontWeight: 'bold'
                            }}>
                                Đáp án đúng: {item.correctAnswer}
                            </p>
                        )}
                    </div>
                ))}
            </div>

            {/* NÚT NỘP BÀI */}
            <button
                onClick={handleSubmit}
                disabled={isSubmitted}
                style={{
                    width: '100%',
                    padding: '12px',
                    fontSize: '1.1rem',
                    backgroundColor: isSubmitted ? '#ff3131' : '#6e9277',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: isSubmitted ? 'not-allowed' : 'pointer',
                    marginTop: '20px',
                    transition: 'background-color 0.3s'
                }}
            >
                {isSubmitted ? 'Đã Nộp bài' : 'Nộp bài và Xem kết quả'}
            </button>
            
            {isSubmitted && (
                <button
                    onClick={() => setIsSubmitted(false)}
                    style={{
                        width: '100%',
                        padding: '10px',
                        fontSize: '1rem',
                        backgroundColor: '#6e9277',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        marginTop: '10px',
                    }}
                >
                    Thử lại
                </button>
            )}
        </div>
    );
};


// =========================================================================
// 2. COMPONENT GRAMMAR CHÍNH (QUẢN LÝ HIỂN THỊ) - KHÔNG ĐỔI

function Grammar() {
    const [user, setUser] = useState(null);
    const [isVisible, setIsVisible] = useState(false); 
    const [selectedTopic, setSelectedTopic] = useState(null); 
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    // Logic kiểm tra đăng nhập và lắng nghe sự kiện cuộn
    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        const token = localStorage.getItem('token');

        if (!token || !storedUsername) {
            navigate('/');
            return;
        }
        setUser(storedUsername);
        
        window.addEventListener('scroll', toggleVisibility); 

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        navigate('/');
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const toggleVisibility = () => {
        if (window.pageYOffset > 300) { 
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };
    
    const filteredTopics = MOCK_GRAMMAR_TOPICS.filter(topic =>
        topic.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // --- Component con để hiển thị một thẻ Chủ đề trong Grid ---
    const GrammarTopicCard = ({ topic }) => {
        const IconComponent = ICON_MAP[topic.icon] || FaPencilAlt; 
        
        const handleClick = () => {
            setSelectedTopic(topic);
            window.scrollTo(0, 0); 
        };

        return (
            <div 
                className="article-card" 
                onClick={handleClick}
                style={{ 
                    border: '1px solid #ddd', 
                    borderRadius: '10px', 
                    overflow: 'hidden', 
                    cursor: 'pointer', 
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
                    backgroundColor: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                }}
                onMouseOver={e => e.currentTarget.style.transform = 'translateY(-7px)'}
                onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
                {/* HIỂN THỊ HÌNH ẢNH */}
                {topic.image ? (
                    <div style={{ position: 'relative', height: '150px', overflow: 'hidden' }}>
                        <img 
                            src={topic.image} 
                            alt={topic.title} 
                            style={{ 
                                width: '100%', 
                                height: '100%', 
                                objectFit: 'cover',
                                borderBottom: `5px solid ${topic.color || '#6e9277'}` 
                            }} 
                        />
                    </div>
                ) : (
                    <div style={{ 
                        backgroundColor: topic.color, 
                        height: '100px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        borderBottom: `5px solid ${topic.color}99` 
                    }}>
                        <IconComponent style={{ fontSize: '3rem', color: 'white' }} />
                    </div>
                )}
                
                {/* Phần Tiêu đề */}
                <div style={{ padding: '15px 15px 20px 15px', textAlign: 'center' }}>
                    <h4 style={{ margin: '0', fontSize: '1.15rem', color: '#333' }}>
                        {topic.title}
                    </h4>
                    <p style={{ margin: '5px 0 0 0', fontSize: '0.9rem', color: '#777' }}>
                        Bắt đầu luyện tập
                    </p>
                </div>
            </div>
        );
    };
    // -------------------------------------------------------------

    return (
        <div className="full-page-layout">
            <Header user={user} onLogout={handleLogout} />

            <div className="main-content">
                <h1 className="section-title" style={{margin: '10px 0 15px 0', padding: 0}}>
                    📚 Trang Luyện Ngữ Pháp (Grammar)
                </h1>

                {/* Nếu có chủ đề được chọn, hiển thị màn hình luyện tập */}
                {selectedTopic ? (
                    <GrammarPracticeScreen 
                        topic={selectedTopic} 
                        onBack={() => setSelectedTopic(null)} // Hàm quay lại
                    />
                ) : (
                    // Ngược lại, hiển thị danh sách chủ đề (Grid)
                    <>
                        <h2 className="section-title" style={{margin: '0 0 20px 0', padding: 0, maxWidth: '960px', marginLeft: 'auto', marginRight: 'auto'}}>
                             Các Chủ đề Ngữ pháp Phổ biến 
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
                        {/* GRID DANH SÁCH CHỦ ĐỀ */}
                        <div style={{ 
                            display: 'grid', 
                            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
                            gap: '25px', 
                            padding: '30px', 
                            maxWidth: '960px', 
                            margin: '0 auto' 
                        }}>
                            {filteredTopics.map(topic => (
                                <GrammarTopicCard 
                                    key={topic.id} 
                                    topic={topic} 
                                />
                            ))}
                        </div>
                        <div style={{ paddingBottom: '50px' }}></div> 
                    </>
                )}

            </div>

            {/* NÚT CUỘN LÊN ĐẦU TRANG */}
            {isVisible && !selectedTopic && ( 
                <button 
                    onClick={scrollToTop} 
                    className="scroll-to-top-button"
                    title="Lên đầu trang"
                >
                    <FaArrowUp /> 
                </button>
            )}
            
            <Footer />
        </div>
    );
}

export default Grammar;