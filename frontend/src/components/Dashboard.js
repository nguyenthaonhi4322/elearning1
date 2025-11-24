import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import '../styles.css';
import { FaArrowUp, FaSearch } from 'react-icons/fa'; // Thêm FaSearch

const TUTOR_CATEGORIES = [
    { title: 'Reading', count: 'Nhấn để học', image: '/images/reading.jpg', link: '/tutors/reading' },
    { title: 'Writing', count: 'Nhấn để học', image: '/images/writing.jpg', link: '/tutors/writing' },
    { title: 'Vocabulary', count: 'Nhấn để học', image: '/images/vocabulary.jpg', link: '/tutors/vocabulary' },
    { title: 'Grammar', count: 'Nhấn để học', image: '/images/grammar.jpg', link: '/tutors/grammar' },
    { title: 'Quiz', count: 'Nhấn để học', image: '/images/quiz.jpg', link: '/tutors/quiz' },
    { title: 'Video', count: 'Nhấn để học', image: '/images/video.jpg', link: '/tutors/video' },
];

function Dashboard() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const bannerImages = [
        '/images/banner1.jpg',
        '/images/banner2.jpg',
        '/images/banner3.jpg',
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const goToNext = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === bannerImages.length - 1 ? 0 : prevIndex + 1
        );
    };

    const goToPrevious = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? bannerImages.length - 1 : prevIndex - 1
        );
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
    

    useEffect(() => {
        const slideInterval = setInterval(() => {
            goToNext();
        }, 10000);
        
        window.addEventListener('scroll', toggleVisibility); 
        

        return () => {
            clearInterval(slideInterval);
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []); 

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        navigate('/');
    };

    // LOGIC XÁC THỰC
    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        const token = localStorage.getItem('token');

        if (!token || !storedUsername) {
            navigate('/');
            return;
        }

        setUser(storedUsername);
        setLoading(false); 
    }, [navigate]);


    // LOGIC LỌC DANH MỤC DỰA TRÊN TÌM KIẾM 
    // Dùng useMemo để chỉ tính toán lại khi searchTerm thay đổi
    const filteredCategories = useMemo(() => {
        if (!searchTerm) {
            return TUTOR_CATEGORIES;
        }
        const lowerCaseSearch = searchTerm.toLowerCase();
        return TUTOR_CATEGORIES.filter(cat => 
            cat.title.toLowerCase().includes(lowerCaseSearch)
        );
    }, [searchTerm]);

    const column1Categories = filteredCategories.slice(0, Math.ceil(filteredCategories.length / 2));
    const column2Categories = filteredCategories.slice(Math.ceil(filteredCategories.length / 2));


    //  HÀM TÌM KIẾM GIẢ ĐỊNH TOÀN TRANG WEB 
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        console.log("Thực hiện tìm kiếm toàn trang web với từ khóa:", searchTerm);
        
    };


    if (loading) {
        return (
            <div className="full-page-layout">
                <Header user={user} onLogout={handleLogout} />
                <div className="main-content" style={{ backgroundColor: '#f0f2f5', minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <p style={{ fontSize: '1.2rem' }}>Đang tải dữ liệu...</p>
                </div>
                <Footer />
            </div>
        );
    }

    if (error) {
        return (
            <div className="full-page-layout">
                <Header user={user} onLogout={handleLogout} />
                <div className="main-content" style={{ backgroundColor: '#f0f2f5', minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'red' }}>
                    <p style={{ fontSize: '1.2rem' }}>{error}</p>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="full-page-layout">
            <Header user={user} onLogout={handleLogout} />

            <div className="main-content">
                {/* Banner */}
                <div className="banner-carousel">
                    <button onClick={goToPrevious} className="carousel-button prev-button">
                        &#9664;
                    </button>
                    <img
                        src={bannerImages[currentImageIndex]}
                        alt={`Banner ${currentImageIndex + 1}`}
                        className="carousel-image"
                    />
                    <button onClick={goToNext} className="carousel-button next-button">
                        &#9654;
                    </button>
                </div>
                
                {/*  THANH TÌM KIẾM MỚI  */}
                <form className="search-bar-container" onSubmit={handleSearchSubmit}>
                    <input
                        type="text"
                        placeholder="Tìm kiếm bài học..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    <button type="submit" className="search-button">
                        <FaSearch />
                    </button>
                </form>
    

                {/* Danh mục */}
                <h2 className="section-title">Danh mục {searchTerm && `(Kết quả cho: "${searchTerm}")`}</h2>
                
                {filteredCategories.length === 0 ? (
                    <p className="no-results">Không tìm thấy danh mục nào phù hợp với từ khóa "{searchTerm}".</p>
                ) : (
                    <div className="tutor-grid-2col">
                        {/* Cột 1 */}
                        <div className="tutor-column">
                            {column1Categories.map((cat, index) => (
                                <div
                                    key={index}
                                    className="tutor-card"
                                    onClick={() => navigate(cat.link)}
                                >
                                    <img src={cat.image} alt={cat.title} className="tutor-image" />
                                    <div className="tutor-info">
                                        <h3>{cat.title}</h3>
                                        <p>{cat.count}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Cột 2 */}
                        <div className="tutor-column">
                            {column2Categories.map((cat, index) => (
                                <div
                                    key={index + column1Categories.length}
                                    className="tutor-card"
                                    onClick={() => navigate(cat.link)}
                                >
                                    <img src={cat.image} alt={cat.title} className="tutor-image" />
                                    <div className="tutor-info">
                                        <h3>{cat.title}</h3>
                                        <p>{cat.count}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* NÚT CUỘN LÊN ĐẦU TRANG */}
            {isVisible && (
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

export default Dashboard;