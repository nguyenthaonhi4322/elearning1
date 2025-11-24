import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header'; 
import Footer from './Footer'; 
import '../styles.css';
import { FaArrowUp, FaPencilAlt, FaArrowLeft, FaSearch, FaCheckCircle, FaTimesCircle, FaRedoAlt } from 'react-icons/fa';

// Chuẩn hóa nghĩa để so sánh
const normalizeMeaning = (text) => {
    if (!text) return '';
    return text.toLowerCase().replace(/[\s\.,;!?:/\\-]+$/g, '').trim();
};

// Dữ liệu giả lập (Mock Data) cho các bộ từ vựng (GIỮ NGUYÊN)
const MOCK_VOCABULARY_SETS = [
    {
        id: 1,
        title: 'Animals',
        description: 'Các từ hữu ích.',
        image: '/images/vocabulary1.jpg',
        words: [
            { id: 1, word: 'Dog', meaning: 'Chó.' },
            { id: 2, word: 'Cat', meaning: 'Mèo.' },
            { id: 3, word: 'Hamster', meaning: 'Chuột hamster.' },
            { id: 4, word: 'Rabbit', meaning: 'Rabbit.' },
            { id: 5, word: 'Goldfish', meaning: 'Cá vàng.' },
            { id: 6, word: 'Parrot', meaning: 'Vẹt.' },
            { id: 7, word: 'Turtle', meaning: 'Rùa.' },
            { id: 8, word: 'Guinea pig', meaning: 'Chuột lang nước.' },
            { id: 9, word: 'Hedgehog', meaning: 'Nhím.' },
            { id: 10, word: 'Cow', meaning: 'Bò.' },
            { id: 11, word: 'Pig', meaning: 'Heo.' },
            { id: 12, word: 'Sheep', meaning: 'Cừu.' },
            { id: 13, word: 'Goat', meaning: 'Dê.' },
            { id: 14, word: 'Horse', meaning: 'Ngựa.' },
            { id: 15, word: 'Chicken', meaning: 'Gà.' },
            { id: 16, word: 'Buffalo', meaning: 'Trâu.' },
            { id: 17, word: 'Donkey', meaning: 'Lừa.' },
            { id: 18, word: 'Hedgehog', meaning: 'Nhím.' },
            { id: 19, word: 'Lion', meaning: 'Sư tử.' },
            { id: 20, word: 'Tiger', meaning: 'Hổ.' },
            { id: 21, word: 'Elephant', meaning: 'Voi.' },
            { id: 22, word: 'Giraffe', meaning: 'Hưu cao cổ.' },
            { id: 23, word: 'Zebra', meaning: 'Ngựa vằn.' },
            { id: 24, word: 'Leopard', meaning: 'Báo đốm.' },
            { id: 25, word: 'Hippopotamus', meaning: 'Hà mã.' },
            { id: 26, word: 'Bear', meaning: 'Gấu.' },
            { id: 27, word: 'Wolf', meaning: 'Sói.' },
            { id: 28, word: 'Fox', meaning: 'Cáo.' },
            { id: 29, word: 'Bat', meaning: 'Dơi.' },
            { id: 30, word: 'Eagle', meaning: 'Đại bàng.' },
        ]
    },
    {
        id: 2,
        title: 'Communicate',
        description: 'Các từ hữu ích.',
        image: '/images/vocabulary2.jpg',
        words: [
            { id: 1, word: 'Hello', meaning: 'Xin chào.' },
            { id: 2, word: 'Good morning', meaning: 'Chào buổi sáng.' },
            { id: 3, word: 'How are you?', meaning: 'Bạn khỏe không?' },
            { id: 4, word: 'Thank you', meaning: 'Cảm ơn.' },
            { id: 5, word: 'What’s your name?', meaning: 'Tên bạn là gì?' },
            { id: 6, word: 'My name is…', meaning: 'Tôi tên là….' },
            { id: 7, word: 'Nice to meet you.', meaning: 'Rất vui được gặp bạn.' },
            { id: 8, word: 'See you later!', meaning: 'Gặp lại sau!' },
            { id: 9, word: 'What are you doing?', meaning: 'Bạn đang làm gì thế?' },
            { id: 10, word: 'Where are you from?', meaning: 'Bạn đến từ đâu?' },
            { id: 11, word: 'That’s great!', meaning: 'Tuyệt quá!' },
            { id: 12, word: 'Really?', meaning: 'Thật sao?' },
            { id: 13, word: 'I see.', meaning: 'Tôi hiểu rồi.' },
            { id: 14, word: 'That’s interesting.', meaning: 'Nghe hay đó.' },
            { id: 15, word: 'Me too.', meaning: 'Tôi cũng vậy.' },
            { id: 16, word: 'You’re welcome.', meaning: 'Không có gì.' },
            { id: 17, word: 'I really appreciate it.', meaning: 'Tôi thật sự cảm kích.' },
            { id: 18, word: 'Sorry.', meaning: 'Xin lỗi.' },
            { id: 19, word: 'No problem.', meaning: 'Không sao đâu.' },
            { id: 20, word: 'Don’t worry', meaning: 'Đừng lo.' },
            { id: 21, word: 'Can you help me?', meaning: 'Bạn có thể giúp tôi không?' },
            { id: 22, word: 'Let me help you.', meaning: 'Để tôi giúp bạn.' },
            { id: 23, word: 'That’s very kind of you.', meaning: 'Bạn thật tốt bụng.' },
            { id: 24, word: 'Could I see the menu?', meaning: 'Cho tôi xem thực đơn được không?' },
            { id: 25, word: 'The food is delicious!', meaning: 'Món ăn ngon quá!' },
            { id: 26, word: 'I’m full.', meaning: 'Tôi no rồi.' },
            { id: 27, word: 'It’s too expensive.', meaning: 'Mắc quá.' },
            { id: 28, word: 'Where is the bus stop?', meaning: 'Trạm xe buýt ở đâu vậy?' },
            { id: 29, word: 'I’d like to go to the airport.', meaning: 'Tôi muốn đi đến sân bay.' },
            { id: 30, word: 'I’m thirsty.', meaning: 'Tôi khát.' },
        ]
    },
     {
        id: 3,
        title: 'Art & Feeling',
        description: 'Các từ hữu ích.',
        image: '/images/vocabulary3.jpg',
        words: [
            { id: 1, word: 'Aesthetic', meaning: 'Thẩm mỹ.' },
            { id: 2, word: 'Abstract', meaning: 'Trừu tượng.' },
            { id: 3, word: 'Composition', meaning: 'Bố cục.' },
            { id: 4, word: 'Contrast', meaning: 'Tương phản.' },
            { id: 5, word: 'Texture', meaning: 'Kết cấu.' },
            { id: 6, word: 'Perspective', meaning: 'Góc nhìn.' },
            { id: 7, word: 'Harmony', meaning: 'Sự hài hòa.' },
            { id: 8, word: 'Inspiration', meaning: 'Nguồn cảm hứng.' },
            { id: 9, word: 'Expression', meaning: 'Sự biểu đạt.' },
            { id: 10, word: 'Creativity', meaning: 'Sự sáng tạo' },
            { id: 11, word: 'Emotion', meaning: 'Cảm xúc.' },
            { id: 12, word: 'Passion', meaning: 'Đam mê.' },
            { id: 13, word: 'Melancholy', meaning: 'U sầu.' },
            { id: 14, word: 'Serenity', meaning: 'Sự thanh bình.' },
            { id: 15, word: 'Vivid', meaning: 'Sống động.' },
            { id: 16, word: 'Evocative.', meaning: 'Gợi cảm xúc.' },
            { id: 17, word: 'Nonentity', meaning: 'Tầm thường.' },
            { id: 18, word: 'Masterpiece', meaning: 'Kiệt tác.' },
            { id: 19, word: 'Impression', meaning: 'Ấn tượng.' },
            { id: 20, word: 'Authenticity', meaning: 'Nguyên bản.' },
            { id: 21, word: 'Artistry', meaning: 'Sự tinh xảo.' },
            { id: 22, word: 'Sublime', meaning: 'Siêu phàm.' },
            { id: 23, word: 'Enigmatic', meaning: 'Khó hiểu.' },
            { id: 24, word: 'Transcendence', meaning: 'Siêu việt' },
            { id: 25, word: 'Ambiguity', meaning: 'Sự mơ hồ.' },
            { id: 26, word: 'Resonance', meaning: 'Sự cộng hưởng.' },
            { id: 27, word: 'Depiction', meaning: 'Khắc họa.' },
            { id: 28, word: 'Poignancy', meaning: 'Sâu sắc.' },
            { id: 29, word: 'Allusion', meaning: 'Sự ám chỉ.' },
            { id: 30, word: 'Symbolism', meaning: 'Biểu tượng.' },
        ]
    },
    {
        id: 4,
        title: 'Family',
        description: 'Các từ hữu ích.',
        image: '/images/vocabulary4.jpg',
        words: [
            { id: 1, word: 'Father / Dad / Daddy.', meaning: 'Ba.' },
            { id: 2, word: 'Mother / Mom / Mum / Mommy.', meaning: 'Mẹ.' },
            { id: 3, word: 'Parents.', meaning: 'Cha mẹ.' },
            { id: 4, word: 'Son.', meaning: 'Con trai.' },
            { id: 5, word: 'Daughter.', meaning: 'Con gái.' },
            { id: 6, word: 'Brother.', meaning: 'Anh trai.' },
            { id: 7, word: 'Sister.', meaning: 'Chị gái.' },
            { id: 8, word: 'Grandfather / Grandpa.', meaning: 'Ông.' },
            { id: 9, word: 'Grandmother / Grandma.', meaning: 'Bà.' },
            { id: 10, word: 'Grandparents.', meaning: 'Ông bà.' },
            { id: 11, word: 'Uncle.', meaning: 'Chú.' },
            { id: 12, word: 'Aunt.', meaning: 'Cô.' },
            { id: 13, word: 'Cousin.', meaning: 'Anh chị em họ.' },
            { id: 14, word: 'Nephew.', meaning: 'Cháu trai.' },
            { id: 15, word: 'Niece.', meaning: 'Cháu gái.' },
            { id: 16, word: 'Husband.', meaning: 'Chồng.' },
            { id: 17, word: 'Siblings.', meaning: 'Anh chị em ruột.' },
            { id: 18, word: 'Wife.', meaning: 'Vợ.' },
            { id: 19, word: 'Father-in-law', meaning: 'Bố chồng/vợ.' },
            { id: 20, word: 'Mother-in-law', meaning: 'Mẹ chồng/vợ.' },
            { id: 21, word: 'Stepfather', meaning: 'Cha dượng.' },
            { id: 22, word: 'Stepmother.', meaning: 'Mẹ kế.' },
            { id: 23, word: 'Twin', meaning: 'Sinh đôi.' },
            { id: 24, word: 'Generation', meaning: 'Thế hệ.' },
            { id: 25, word: 'Descendant', meaning: 'Con cháu.' },
            { id: 26, word: 'Ancestor', meaning: 'Tổ tiên.' },
            { id: 27, word: 'Relative', meaning: 'Họ hàng.' },
            { id: 28, word: 'Stepson', meaning: 'Con trai riêng.' },
            { id: 29, word: 'Stepdaughter', meaning: 'Con gái riêng.' },
            { id: 30, word: 'Only child', meaning: 'Con một.' },
        ]
    },
    {
        id: 5,
        title: 'Movies & Music',
        description: 'Các từ hữu ích.',
        image: '/images/vocabulary5.jpg',
        words: [
            { id: 1, word: 'Movie / Film.', meaning: 'Bộ phim.' },
            { id: 2, word: 'Director.', meaning: 'Đạo diễn.' },
            { id: 3, word: 'Actor.', meaning: 'Nam diễn viên.' },
            { id: 4, word: 'Actress.', meaning: 'Nữ diễn viên.' },
            { id: 5, word: 'Character.', meaning: 'Nhân vật.' },
            { id: 6, word: 'Plot.', meaning: 'Cốt truyện.' },
            { id: 7, word: 'Scene.', meaning: 'Cảnh phim.' },
            { id: 8, word: 'Genre.', meaning: 'Thể loại.' },
            { id: 9, word: 'Soundtrack.', meaning: 'Nhạc phim.' },
            { id: 10, word: 'Special effects (SFX).', meaning: 'Hiệu ứng đặt biệt.' },
            { id: 11, word: 'Trailer.', meaning: 'Đoạn giới thiệu.' },
            { id: 12, word: 'Subtitle.', meaning: 'Phụ đề.' },
            { id: 13, word: 'Review.', meaning: 'Bài đánh giá.' },
            { id: 14, word: 'Viewer.', meaning: 'Khán giả.' },
            { id: 15, word: 'Singer / Vocalist.', meaning: 'Ca sĩ.' },
            { id: 16, word: 'Musician.', meaning: 'Nhạc sĩ.' },
            { id: 17, word: 'Composer.', meaning: 'Nhà soạn nhạc.' },
            { id: 18, word: 'Band.', meaning: 'Ban nhạc.' },
            { id: 19, word: 'Instrument', meaning: 'Nhạc cụ.' },
            { id: 20, word: 'Melody', meaning: 'Gia điệu.' },
            { id: 21, word: 'Lyrics', meaning: 'Lời bài hát.' },
            { id: 22, word: 'Beat.', meaning: 'Nhịp điệu.' },
            { id: 23, word: 'Concert', meaning: 'Buổi hòa nhạc.' },
            { id: 24, word: 'Record', meaning: 'Thu âm.' },
            { id: 25, word: 'Listener', meaning: 'Người nghe.' },
            { id: 26, word: 'Go to the movies', meaning: 'Đi xem phim.' },
            { id: 27, word: 'Sing along', meaning: 'Hat theo.' },
            { id: 28, word: 'Play an instrument', meaning: 'Chơi nhạc cụ.' },
            { id: 29, word: 'Watch a movie at home', meaning: 'Xem phim ở nhà.' },
            { id: 30, word: 'Listen to music', meaning: 'Nghe nhạc.' },
        ]
    },
    {
        id: 6,
        title: 'Countries',
        description: 'Các từ hữu ích.',
        image: '/images/vocabulary6.jpg',
        words: [
            { id: 1, word: 'Vietnam', meaning: 'Việt Nam' },
            { id: 2, word: 'Japan', meaning: 'Nhật Bản' },
            { id: 3, word: 'China', meaning: 'Trung Quốc' },
            { id: 4, word: 'South Korea', meaning: 'Hàn Quốc' },
            { id: 5, word: 'Thailand', meaning: 'Thái Lan' },
            { id: 6, word: 'Singapore', meaning: 'Singapore' },
            { id: 7, word: 'Indonesia', meaning: 'Indonesia' },
            { id: 8, word: 'India', meaning: 'Ấn Độ' },
            { id: 9, word: 'England (UK)', meaning: 'Anh' },
            { id: 10, word: 'France', meaning: 'Pháp' },
            { id: 11, word: 'Germany', meaning: 'Đức' },
            { id: 12, word: 'Italy', meaning: 'Ý' },
            { id: 13, word: 'Russia', meaning: 'Nga' },
            { id: 14, word: 'Spain', meaning: 'Tây Ban Nha' },
            { id: 15, word: 'Portugal', meaning: 'Bồ Đào Nha' },
            { id: 16, word: 'Greece', meaning: 'Hy Lạp' },
            { id: 17, word: 'Netherlands', meaning: 'Hà Lan' },
            { id: 18, word: 'Sweden', meaning: 'Thụy Điển' },
            { id: 19, word: 'United States (USA)', meaning: 'Mỹ' },
            { id: 20, word: 'Mexico', meaning: 'Mexico' },
            { id: 21, word: 'Egypt', meaning: 'Ai Cập' },
            { id: 22, word: 'South Africa', meaning: 'Nam Phi' },
            { id: 23, word: 'Nigeria', meaning: 'Nigeria' },
            { id: 24, word: 'Australia', meaning: 'Úc' },
            { id: 25, word: 'New Zealand', meaning: 'New Zealand' },
            { id: 26, word: 'Argentina', meaning: 'Argentina' },
            { id: 27, word: 'Chile', meaning: 'Chile' },
            { id: 28, word: 'Kenya', meaning: 'Kenya' },
            { id: 29, word: 'Malaysia', meaning: 'Malaysia' },
            { id: 30, word: 'Philippines', meaning: 'Philippines' },
        ]
    },
];

function Vocabulary() {
    const [user, setUser] = useState(null);
    const [isVisible, setIsVisible] = useState(false); 
    const [selectedSet, setSelectedSet] = useState(null); 
    const [userMeanings, setUserMeanings] = useState({}); 
    const [isChecking, setIsChecking] = useState(false); 
    const [score, setScore] = useState(0); 
    const [searchTerm, setSearchTerm] = useState('');

    const navigate = useNavigate();

    // --- Logic xử lý từ vựng ---
    const handleSelectSet = (set) => {
        setSelectedSet(set);
        const initialMeanings = set.words.reduce((acc, word) => {
            acc[word.id] = '';
            return acc;
        }, {});
        setUserMeanings(initialMeanings);
        setIsChecking(false);
        setScore(0);
        window.scrollTo(0, 0); 
    };

    const handleBackToGrid = () => {
        setSelectedSet(null);
        setUserMeanings({});
        setIsChecking(false);
        setScore(0);
        window.scrollTo(0, 0);
    };

    const handleMeaningChange = (wordId, value) => {
        setUserMeanings(prev => ({
            ...prev,
            [wordId]: value
        }));
    };

    const handleCheckAll = () => {
        if (!selectedSet) return;

        let correctCount = 0;
        selectedSet.words.forEach(word => {
            const userEntry = normalizeMeaning(userMeanings[word.id]);
            const correctEntry = normalizeMeaning(word.meaning);
            if (userEntry !== '' && userEntry === correctEntry) {
                correctCount += 1;
            }
        });

        setScore(correctCount);
        setIsChecking(true);
        window.scrollTo(0, 0); 
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        navigate('/');
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const toggleVisibility = () => {
        if (window.pageYOffset > 300) { 
            setIsVisible(true);
        } else {
            setIsVisible(false);
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
        
        window.addEventListener('scroll', toggleVisibility); 
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, [navigate]);

    // --- Component con: Card bộ từ vựng ---
    const VocabularySetCard = ({ set, onSelect }) => (
        <div 
            className="article-card" 
            onClick={() => onSelect(set)}
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
                src={set.image} 
                alt={set.title} 
                style={{ width: '100%', height: '150px', objectFit: 'cover' }}
            />
            <div style={{ padding: '15px' }}>
                <h4 style={{ margin: '0 0 10px 0', fontSize: '1.1rem', color: '#333' }}>
                    {set.title}
                </h4>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>{set.description}</p>
                <p style={{ margin: '10px 0 0', fontSize: '0.9rem', color: '#007bff', fontWeight: 'bold' }}>
                    {set.words.length} từ
                </p>
            </div>
        </div>
    );

    // --- Render chi tiết bài tập từ vựng ---
    const renderVocabularyExercise = () => {
        if (!selectedSet || selectedSet.words.length === 0) return <div>Không có từ vựng nào trong bộ này.</div>;

        const totalWords = selectedSet.words.length;
        const resultColor = score === totalWords ? '#28a745' : score >= totalWords / 2 ? '#ffc107' : '#dc3545';

        return (
            <div style={{ padding: '20px', margin: '20px auto', maxWidth: '800px', backgroundColor: '#ffffff', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
                <button 
                    onClick={handleBackToGrid} 
                    style={{ background: 'none', border: 'none', color: '#007bff', fontSize: '1rem', cursor: 'pointer', marginBottom: '20px', fontWeight: 'bold' }}
                >
                    <FaArrowLeft style={{ marginRight: '8px' }} /> Quay lại danh sách
                </button>

                <h1 style={{ color: '#333', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
                    Luyện tập: <span style={{ fontWeight: 'bold' }}>{selectedSet.title}</span>
                </h1>
                
                {isChecking && (
                    <div style={{ marginBottom: '30px', padding: '15px', borderRadius: '8px', backgroundColor: resultColor + '10', border: `1px solid ${resultColor}`, textAlign: 'center' }}>
                        <h2 style={{ color: resultColor, margin: '0 0 10px 0' }}>
                            {score === totalWords ? 'Chúc mừng! Tuyệt vời! 🎉' : 'Kết quả của bạn'}
                        </h2>
                        <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>
                            Đúng: <span style={{ color: resultColor }}>{score}/{totalWords}</span> từ
                        </p>
                    </div>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {selectedSet.words.map(word => {
                        const userEntry = normalizeMeaning(userMeanings[word.id]);
                        const correctEntry = normalizeMeaning(word.meaning);
                        const isWordCorrect = userEntry !== '' && userEntry === correctEntry;
                        const backgroundColor = isChecking ? (isWordCorrect ? '#e9f7ee' : '#f8e9ea') : '#f9f9f9';

                        return (
                            <div key={word.id} style={{ display: 'flex', alignItems: 'center', border: '1px solid #eee', padding: '15px', borderRadius: '8px', backgroundColor }}>
                                <div style={{ flex: 1, minWidth: '150px', fontWeight: 'bold', fontSize: '1.1rem', color: '#007bff' }}>{word.word}</div>
                                <div style={{ flex: 2, marginRight: '15px' }}>
                                    <input
                                        type="text"
                                        placeholder="Nhập nghĩa tiếng Việt..."
                                        value={userMeanings[word.id]}
                                        onChange={e => handleMeaningChange(word.id, e.target.value)}
                                        disabled={isChecking}
                                        style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                                    />
                                </div>
                                {isChecking && (
                                    <div style={{ flex: 2, minWidth: '200px', display: 'flex', alignItems: 'center', fontSize: '1rem', color: isWordCorrect ? '#28a745' : '#dc3545' }}>
                                        {isWordCorrect ? <><FaCheckCircle style={{ marginRight: '8px' }} />Đúng!</> : <><FaTimesCircle style={{ marginRight: '8px' }} />ĐN: {word.meaning}</>}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                <div style={{ marginTop: '30px', textAlign: 'center' }}>
                    {!isChecking ? (
                        <button 
                            onClick={handleCheckAll} 
                            disabled={!Object.values(userMeanings).some(m => m.trim().length > 0)}
                            style={{ padding: '15px 50px', backgroundColor: '#6e9277', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.1rem' }}
                        >
                            Kiểm tra tất cả Đáp án
                        </button>
                    ) : (
                        <button
                            onClick={handleBackToGrid}
                            style={{ padding: '15px 50px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.1rem' }}
                        >
                            <FaRedoAlt style={{ marginRight: '8px' }} /> Hoàn thành và Quay lại
                        </button>
                    )}
                </div>
            </div>
        );
    };

    // --- Render chính ---
    const filteredSets = MOCK_VOCABULARY_SETS.filter(set =>
        set.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="full-page-layout">
            <Header user={user} onLogout={handleLogout} />

            <div className="main-content">
                <h1 className="section-title" style={{margin: '10px 0 15px 0', padding: 0}}>
                    🧠 Trang Luyện Từ Vựng (Vocabulary)
                </h1>
                
                {selectedSet ? (
                    renderVocabularyExercise()
                ) : (
                    <>
                        <h2 className="section-title" style={{margin: '0 0 20px 0', padding: 0, maxWidth: '960px', marginLeft: 'auto', marginRight: 'auto'}}>
                            Chọn Bộ Từ Vựng để Luyện Tập
                        </h2>

                        {/* Thanh Tìm Kiếm */}
                        <div style={{ maxWidth: '900px', margin: '0 auto', marginTop: '20px', display: 'flex', alignItems: 'center', padding: '0 10px' }}>
                            <div style={{ position: 'relative', width: '93%' }}>
                                <FaSearch style={{ position: 'absolute', top: '50%', left: '12px', transform: 'translateY(-50%)', color: '#888' }} />
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={e => setSearchTerm(e.target.value)}
                                    placeholder="Tìm kiếm bộ từ vựng..."
                                    style={{ width: '100%', padding: '10px 15px 10px 40px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '1rem', outline: 'none', transition: '0.2s' }}
                                    onFocus={e => e.target.style.border = '1px solid #6e9277'}
                                    onBlur={e => e.target.style.border = '1px solid #ddd'}
                                />
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px', padding: '30px', maxWidth: '960px', margin: '0 auto' }}>
                            {filteredSets.map(set => (
                                <VocabularySetCard key={set.id} set={set} onSelect={handleSelectSet} />
                            ))}
                        </div>

                        <div style={{ paddingBottom: '50px' }}></div>
                    </>
                )}
            </div>

            {isVisible && (
                <button onClick={scrollToTop} className="scroll-to-top-button" title="Lên đầu trang">
                    <FaArrowUp /> 
                </button>
            )}
            
            <Footer />
        </div>
    );
}

export default Vocabulary;
