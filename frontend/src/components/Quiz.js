import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header'; 
import Footer from './Footer'; 
import '../styles.css';
import { FaArrowUp, FaPencilAlt, FaSearch, FaArrowLeft } from 'react-icons/fa'; 
import { FaQuestionCircle, FaTrophy, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

// Dữ liệu giả lập (Mock Data) cho các bộ Quiz (mỗi bộ 10 câu)
const MOCK_QUIZZES = [
    { 
        id: 1, 
        title: 'Quiz 1: Basic Vocabulary (Từ Vựng Cơ bản)', 
        image: '/images/quiz1.jpg',
        questions: [
            { q: 'What is the opposite of "happy"?', options: ['Sad', 'Angry', 'Tired', 'Fast'], answer: 'Sad' },
            { q: 'Choose the correct spelling:', options: ['Beautifull', 'Beautiful', 'Beautiufull', 'Beatiful'], answer: 'Beautiful' },
            { q: 'A place where you can borrow books is a...', options: ['Gym', 'Library', 'Cafe', 'Museum'], answer: 'Library' },
            { q: 'The past tense of "go" is:', options: ['Went', 'Goes', 'Gone', 'Going'], answer: 'Went' },
            { q: 'I like apples __ oranges.', options: ['but', 'so', 'and', 'or'], answer: 'and' },
            { q: 'What is a vehicle that flies?', options: ['Bus', 'Train', 'Airplane', 'Boat'], answer: 'Airplane' },
            { q: 'What is the currency of the USA?', options: ['Euro', 'Yen', 'Dollar', 'Pound'], answer: 'Dollar' },
            { q: 'The color of the sky is usually...', options: ['Red', 'Green', 'Blue', 'Yellow'], answer: 'Blue' },
            { q: 'She __ a student.', options: ['am', 'are', 'is', 'be'], answer: 'is' },
            { q: 'How many days are in a week?', options: ['Six', 'Seven', 'Eight', 'Ten'], answer: 'Seven' },
        ]
    },
    { 
        id: 2, 
        title: 'Quiz 2: Learning & Education (Học tập & Giáo dục)', 
        image: '/images/quiz2.jpg',
        questions: [
            { q: 'She always studies hard because she wants to __ her exam.', options: ['fail', 'pass', 'lose', 'miss'], answer: 'pass' },
            { q: 'The teacher asked us to hand in our homework __ Friday.', options: ['in', 'on', 'at', 'by'], answer: 'by' },
            { q: 'Neither John __ Mary was at the party.', options: ['or', 'nor', 'and', 'but'], answer: 'nor' },
            { q: 'The house __ roof is red belongs to my uncle.', options: ['who', 'which', 'whose', 'that'], answer: 'whose' },
            { q: 'We have lived here __ 2010.', options: ['since', 'for', 'ago', 'in'], answer: 'since' },
            { q: 'He asked me where __.', options: ['did I go', 'I went', 'I did go', 'I was go'], answer: 'I went' },
            { q: 'I wish I __ fly.', options: ['can', 'could', 'would', 'might'], answer: 'could' },
            { q: 'The more you study, the __ you learn.', options: ['more better', 'best', 'most', 'better'], answer: 'better' },
            { q: 'The package was sent __ courier service.', options: ['by', 'with', 'through', 'from'], answer: 'by' },
            { q: 'They postponed __ the decision until next week.', options: ['to make', 'making', 'make', 'made'], answer: 'making' },
        ]
    },
    {
        id: 3,
        title: "Quiz 3: Family (Gia Đình)",
        image: "/images/quiz3.jpg",
        questions: [
            { q: "My older brother, __ lives in Canada, is a doctor.", options: [ "who", "which", "whose", "that" ], answer: "who" },
            { q: "She is looking __ her younger sister while their parents are at work.", options: [ "at", "for", "after", "up" ], answer: "after" },
            { q: "If I __ rich, I would buy my parents a big house.", options: [ "am", "was", "were", "had been" ], answer: "were" },
            { q: "My grandparents __ married for fifty years next month.", options: [ "will be", "are", "will have been", "have been" ], answer: "will have been" },
            { q: "Despite the distance, we always keep __ touch with our relatives.", options: [ "at", "on", "in", "by" ], answer: "in" },
            { q: "He enjoys __ time with his children on weekends.", options: [ "spend", "to spend", "spending", "spent" ], answer: "spending" },
            { q: "The baby started __ after his mother left the room.", options: [ "cry", "to cry", "crying", "is crying" ], answer: "crying" },
            { q: "I think my father is the __ patient person in our family.", options: [ "more", "most", "much", "very" ], answer: "most" },
            { q: "My cousin came __ to visit us last Christmas.", options: [ "over", "into", "off", "out" ], answer: "over" },
            { q: "Her parents advised her __ study abroad.", options: [ "to", "on", "for", "about" ], answer: "to" }
        ]
    },
    {
        id: 4,
        title: "Quiz 4: Environment (Môi Trường)",
        image: "/images/quiz4.jpg",
        questions: [
            { q: "If we don't act now, many species __ extinct.", options: [ "become", "will become", "are becoming", "became" ], answer: "will become" },
            { q: "Governments should encourage people __ recycling.", options: [ "do", "to do", "doing", "done" ], answer: "to do" },
            { q: "The plastic bottles, __ were collected, will be recycled.", options: [ "who", "which", "whose", "where" ], answer: "which" },
            { q: "We must stop __ plastic bags immediately.", options: [ "to use", "using", "use", "used" ], answer: "using" },
            { q: "The forest __ destroyed by fire last month.", options: [ "was", "is", "were", "has been" ], answer: "was" },
            { q: "The more we save energy, the __ we reduce pollution.", options: ['less', 'more less', 'most', 'more'], answer: 'more' },
            { q: "I wish people __ stop littering in the streets.", options: [ "can", "would", "might", "shall" ], answer: "would" },
            { q: "Global warming is caused __ the emission of greenhouse gases.", options: [ "from", "by", "with", "through" ], answer: "by" },
            { q: "The factory postponed __ the decision about waste disposal.", options: [ "to make", "making", "make", "made" ], answer: "making" },
            { q: "We have been conserving water __ the drought started.", options: [ "for", "since", "ago", "in" ], answer: "since" }
        ]
    },
    {
        id: 5,
        title: "Quiz 5: Synonyms (Đồng nghĩa)",
        image: "/images/quiz5.jpg",
        questions: [
            { q: "Từ đồng nghĩa của \"planet\" là gì?", options: [ "star", "world", "nation", "universe" ], answer: "world" },
            { q: "Từ đồng nghĩa của \"challenges\" là gì?", options: [ "solutions", "difficulties", "opportunities", "advantages" ], answer: "difficulties" },
            { q: "Từ đồng nghĩa của \"waste\" là gì?", options: [ "assets", "rubbish", "resources", "goods" ], answer: "rubbish" },
            { q: "Từ đồng nghĩa của \"detrimental\" là gì?", options: [ "beneficial", "negative", "positive", "helpful" ], answer: "negative" },
            { q: "Từ đồng nghĩa của \"combat\" là gì?", options: [ "fight", "ignore", "support", "create" ], answer: "fight" },
            { q: "Từ đồng nghĩa của \"preserve\" là gì?", options: [ "destroy", "maintain", "neglect", "damage" ], answer: "maintain" },
            { q: "Từ đồng nghĩa của \"advocate\" là gì?", options: [ "oppose", "support", "criticize", "delay" ], answer: "support" },
            { q: "Từ đồng nghĩa của \"mitigate\" là gì?", options: [ "intensify", "worsen", "alleviate", "increase" ], answer: "alleviate" },
            { q: "Từ đồng nghĩa của \"conserve\" là gì?", options: [ "waste", "spend", "save", "consume" ], answer: "save" },
            { q: "Từ đồng nghĩa của \"crucial\" là gì?", options: [ "minor", "unimportant", "essential", "trivial" ], answer: "essential" }
        ]
    },
    { 
        id: 6, 
        title: 'Quiz 6: Food & Drink (Thức ăn & Đồ uống)', 
        image: '/images/quiz6.jpg',
        questions: [
            { q: 'The verb for drinking hot liquid slowly is:', options: ['sip', 'gulp', 'chew', 'swallow'], answer: 'sip' },
            { q: 'Which of these is a common dessert?', options: ['Sandwich', 'Soup', 'Pudding', 'Steak'], answer: 'Pudding' },
            { q: 'You cook eggs by putting them in hot water. This is called:', options: ['frying', 'roasting', 'boiling', 'grilling'], answer: 'boiling' },
            { q: 'A piece of fruit that is often yellow and long is a:', options: ['Apple', 'Banana', 'Cherry', 'Grape'], answer: 'Banana' },
            { q: 'To cut food into very small pieces is to __ it.', options: ['chop', 'slice', 'peel', 'blend'], answer: 'chop' },
            { q: 'The meal eaten in the middle of the day is:', options: ['breakfast', 'lunch', 'dinner', 'supper'], answer: 'lunch' },
            { q: 'If a food has too much salt, it is:', options: ['sweet', 'sour', 'spicy', 'salty'], answer: 'salty' },
            { q: 'The past tense of "eat" is:', options: ['eaten', 'ate', 'eatting', 'eats'], answer: 'ate' },
            { q: 'Milk, cheese, and yogurt are __ products.', options: ['meat', 'dairy', 'grain', 'vegetable'], answer: 'dairy' },
            { q: 'Which beverage contains caffeine?', options: ['Water', 'Tea', 'Milk', 'Juice'], answer: 'Tea' },
        ]
    },
];

function Quiz() {
    const [user, setUser] = useState(null);
    const [isVisible, setIsVisible] = useState(false); 
    const [selectedQuiz, setSelectedQuiz] = useState(null); 
    const [userAnswers, setUserAnswers] = useState({}); 
    const [isFinished, setIsFinished] = useState(false); 
    const [score, setScore] = useState(0); 
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    // --- LƯU ĐIỂM VÀO LOCAL STORAGE ---
    const saveScoreToLocalStorage = (quizId, finalScore, totalQuestions) => {
        const newScore = {
            id: quizId,
            score: finalScore,
            totalQuestions: totalQuestions,
            date: new Date().toISOString(),
            title: MOCK_QUIZZES.find(q => q.id === quizId)?.title || `Quiz ID ${quizId}`
        };

        // Lấy danh sách điểm cũ (nếu có)
        const existingScoresJson = localStorage.getItem('quizScores');
        let existingScores = existingScoresJson ? JSON.parse(existingScoresJson) : [];

        // Thêm điểm mới vào đầu danh sách
        existingScores.unshift(newScore);

        // Giới hạn số lượng điểm lưu trữ (ví dụ: 10 lần gần nhất)
        if (existingScores.length > 10) {
            existingScores = existingScores.slice(0, 10);
        }

        // Lưu lại vào localStorage
        localStorage.setItem('quizScores', JSON.stringify(existingScores));
    };
    // --------------------------------------------
    
    // Bắt đầu Quiz
    const handleStartQuiz = (quiz) => {
        setSelectedQuiz(quiz);
        setUserAnswers({});
        setIsFinished(false);
        setScore(0);
        window.scrollTo(0, 0); 
    };

    // Quay lại danh sách
    const handleBackToGrid = () => {
        setSelectedQuiz(null);
        setUserAnswers({});
        setIsFinished(false);
        setScore(0);
        window.scrollTo(0, 0); 
    };

    // Xử lý khi người dùng chọn một đáp án
    const handleAnswerSelect = (qIndex, answer) => {
        setUserAnswers(prev => ({
            ...prev,
            [qIndex]: answer
        }));
    };

    // Xử lý khi nộp bài
    const handleSubmitQuiz = () => {
        let finalScore = 0;
        const totalQuestions = selectedQuiz.questions.length;
        selectedQuiz.questions.forEach((question, index) => {
            if (userAnswers[index] === question.answer) {
                finalScore += 1;
            }
        });
        
        setScore(finalScore);
        setIsFinished(true);
        window.scrollTo(0, 0);

        // GỌI HÀM LƯU ĐIỂM SAU KHI NỘP BÀI THÀNH CÔNG
        saveScoreToLocalStorage(selectedQuiz.id, finalScore, totalQuestions);
    };

    // --- LOGIC GIAO DIỆN CHUNG ---

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        navigate('/');
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const toggleVisibility = () => {
        setIsVisible(window.pageYOffset > 300);
    };

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

    // --- Component con để hiển thị một thẻ Quiz trong Grid ---
    const QuizCard = ({ quiz, onStart }) => (
        <div 
            className="quiz-card" 
            onClick={() => onStart(quiz)}
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
            <img 
                src={quiz.image} 
                alt={quiz.title} 
                style={{ width: '100%', height: '150px', objectFit: 'cover' }}
            />
            <div style={{ padding: '15px' }}>
                <h4 style={{ margin: '0 0 10px 0', fontSize: '1.1rem', color: '#333' }}>
                    <FaQuestionCircle style={{ marginRight: '8px', color: '#dc3545' }} />
                    {quiz.title}
                </h4>
                <p style={{ margin: 0, color: '#6c757d', fontSize: '0.9rem' }}>
                    10 câu | <FaTrophy style={{ color: '#ffc107', marginRight: '4px' }}/> Vượt qua thử thách!
                </p>
            </div>
        </div>
    );
    
    // --- Hàm render chi tiết bài Quiz và kết quả ---
    const renderQuizDetail = () => {
        if (!selectedQuiz) return null;

        // --- GIAO DIỆN KẾT QUẢ ---
        if (isFinished) {
            const totalQuestions = selectedQuiz.questions.length;
            const percentage = (score / totalQuestions) * 100;
            const isPass = score >= totalQuestions / 2;

            return (
                <div style={{ padding: '20px', margin: '20px auto', maxWidth: '900px', backgroundColor: '#ffffff', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', textAlign: 'center' }}>
                    <h1 style={{ color: isPass ? '#28a745' : '#dc3545', paddingBottom: '10px' }}>
                        {isPass ? 'Hoàn thành xuất sắc!' : 'Hãy thử lại nhé!'}
                    </h1>
                    <FaTrophy style={{ fontSize: '4rem', color: '#ffc107', margin: '15px 0' }} />
                    <h2 style={{ color: '#333' }}>
                        Điểm của bạn: {score}/{totalQuestions}
                    </h2>
                    <p style={{ fontSize: '1.5rem', color: '#6c757d', marginBottom: '30px' }}>
                        Tỷ lệ đúng: {percentage.toFixed(0)}%
                    </p>
                    
                    {/* Bảng kết quả chi tiết */}
                    <h3 style={{ borderBottom: '1px solid #eee', paddingBottom: '10px', margin: '30px 0 20px 0', color: '#333' }}>
                        Xem lại Câu trả lời
                    </h3>
                    <div style={{ maxHeight: '400px', overflowY: 'auto', textAlign: 'left', padding: '0 10px' }}>
                        {selectedQuiz.questions.map((q, index) => {
                            const isCorrect = userAnswers[index] === q.answer;
                            return (
                                <div key={index} style={{ borderBottom: '1px dashed #eee', padding: '10px 0', display: 'flex', alignItems: 'flex-start' }}>
                                    <span style={{ marginRight: '10px', fontWeight: 'bold', minWidth: '20px', color: '#007bff' }}>{index + 1}.</span>
                                    <div style={{ flexGrow: 1 }}>
                                        <p style={{ margin: '0 0 5px 0', fontWeight: 'bold' }}>{q.q}</p>
                                        <p style={{ margin: 0, color: isCorrect ? '#28a745' : '#dc3545', fontWeight: 'bold' }}>
                                            {isCorrect ? <FaCheckCircle style={{ marginRight: '5px' }} /> : <FaTimesCircle style={{ marginRight: '5px' }} />}
                                            Đáp án của bạn: {userAnswers[index] || 'Chưa trả lời'}
                                        </p>
                                        {!isCorrect && <p style={{ margin: '5px 0 0 25px', color: '#28a745' }}>Đáp án đúng: {q.answer}</p>}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <button 
                        onClick={handleBackToGrid} 
                        style={{ marginTop: '30px', padding: '12px 30px', backgroundColor: '#6e9277', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.1rem' }}
                    >
                        <FaArrowLeft style={{ marginRight: '8px' }} />
                        Quay lại Trang Trắc nghiệm
                    </button>
                </div>
            );
        }

        // --- GIAO DIỆN LÀM QUIZ ---
        const totalAnswered = Object.keys(userAnswers).length;
        const totalQuestions = selectedQuiz.questions.length;
        const isAllAnswered = totalAnswered === totalQuestions;

        return (
            <div style={{ padding: '20px', margin: '20px auto', maxWidth: '900px', backgroundColor: '#ffffff', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
                <button 
                    onClick={handleBackToGrid} 
                    style={{ background: 'none', border: 'none', color: '#007bff', fontSize: '1rem', cursor: 'pointer', marginBottom: '20px', fontWeight: 'bold' }}
                >
                    <FaArrowLeft style={{ marginRight: '8px' }} />
                    Quay lại danh sách
                </button>

                <h1 style={{ color: '#333', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
                    <FaQuestionCircle style={{ color: '#dc3545', marginRight: '10px' }} />
                    {selectedQuiz.title}
                </h1>
                <p style={{ margin: '15px 0', color: '#555', fontWeight: 'bold' }}>
                    Tiến độ: {totalAnswered}/{totalQuestions} câu đã trả lời
                </p>
                
                <div className="quiz-content" style={{ lineHeight: '1.6', fontSize: '1rem', color: '#444' }}>
                    {selectedQuiz.questions.map((question, qIndex) => (
                        <div key={qIndex} style={{ 
                            border: '1px solid #ddd', 
                            borderRadius: '8px', 
                            padding: '20px', 
                            marginBottom: '20px', 
                            backgroundColor: '#f8f9fa' 
                        }}>
                            <h4 style={{ margin: '0 0 15px 0', color: '#007bff' }}>
                                Câu {qIndex + 1}: {question.q}
                            </h4>
                            <div className="options-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                {question.options.map((option, oIndex) => {
                                    const isSelected = userAnswers[qIndex] === option;
                                    return (
                                        <button
                                            key={oIndex}
                                            onClick={() => handleAnswerSelect(qIndex, option)}
                                            style={{
                                                padding: '10px 15px',
                                                border: isSelected ? '2px solid #007bff' : '1px solid #ccc',
                                                borderRadius: '5px',
                                                backgroundColor: isSelected ? '#e6f2ff' : 'white', 
                                                cursor: 'pointer',
                                                textAlign: 'left',
                                                transition: 'background-color 0.1s',
                                                fontWeight: isSelected ? 'bold' : 'normal',
                                                color: isSelected ? '#007bff' : '#444'
                                            }}
                                            onMouseOver={e => e.currentTarget.style.backgroundColor = isSelected ? '#e6f2ff' : '#f0f0f0'}
                                            onMouseOut={e => e.currentTarget.style.backgroundColor = isSelected ? '#e6f2ff' : 'white'}
                                        >
                                            {String.fromCharCode(65 + oIndex)}. {option}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                <button 
                    onClick={handleSubmitQuiz} 
                    disabled={!isAllAnswered}
                    style={{ 
                        marginTop: '30px', 
                        padding: '15px 40px', 
                        backgroundColor: isAllAnswered ? '#dc3545' : '#ccc', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '50px', 
                        cursor: isAllAnswered ? 'pointer' : 'not-allowed', 
                        fontWeight: 'bold',
                        fontSize: '1.2rem',
                        boxShadow: isAllAnswered ? '0 4px 10px rgba(94, 94, 94, 0.33)' : 'none'
                    }}
                >
                    {isAllAnswered ? 'Nộp bài và Xem kết quả' : `Trả lời đủ ${totalQuestions} câu để nộp`}
                </button>
            </div>
        );
    };

    return (
        <div className="full-page-layout">
            <Header user={user} onLogout={handleLogout} />

            <div className="main-content">
                <h1 className="section-title" style={{margin: '10px 0 15px 0', padding: 0}}>
                    🎯 Trang Luyện trắc nghiệm (Quiz)
                </h1>
                
                {selectedQuiz ? (
                    renderQuizDetail()
                ) : (
                    <>
                        <h2 className="section-title" style={{margin: '0 0 20px 0', padding: 0, maxWidth: '960px', marginLeft: 'auto', marginRight: 'auto'}}>
                            Chọn Bài trắc nghiệm
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
                            padding: '30px', 
                            maxWidth: '960px', 
                            margin: '0 auto' 
                        }}>
                            {MOCK_QUIZZES.map(quiz => (
                                <QuizCard 
                                    key={quiz.id} 
                                    quiz={quiz} 
                                    onStart={handleStartQuiz}
                                />
                            ))}
                        </div>
                        
                        <div style={{ paddingBottom: '50px' }}></div> 
                    </>
                )}
            </div>

            {/* NÚT CUỘN LÊN ĐẦU TRANG */}
            {isVisible && !selectedQuiz && (
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

export default Quiz;