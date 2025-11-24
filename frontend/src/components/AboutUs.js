import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import '../styles.css'; 
import { FaArrowUp, FaCheckCircle, FaUsers, FaLightbulb } from 'react-icons/fa'; 

// Dữ liệu cho phần "Why Choose Us"
const ABOUT_FEATURES = [
    { 
        icon: <FaCheckCircle className="about-icon" />, 
        title: 'Chất lượng hàng đầu', 
        description: 'Nội dung học tập được xây dựng bởi các chuyên gia ngôn ngữ và giáo viên giàu kinh nghiệm.' 
    },
    { 
        icon: <FaLightbulb className="about-icon" />, 
        title: 'Phương pháp đổi mới', 
        description: 'Ứng dụng các phương pháp giảng dạy hiện đại, tập trung vào tương tác và thực hành.' 
    },
    { 
        icon: <FaUsers className="about-icon" />, 
        title: 'Cộng đồng hỗ trợ', 
        description: 'Tham gia vào cộng đồng học viên năng động, chia sẻ kinh nghiệm và động lực học tập.' 
    },
];

function AboutUs() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // State cho nút "Scroll to Top"
    const [isVisible, setIsVisible] = useState(false);

    // Hàm cuộn lên đầu trang
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // Hàm kiểm tra vị trí cuộn
    const toggleVisibility = () => {
        if (window.pageYOffset > 300) { 
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };
    
    // Xử lý đăng xuất
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        navigate('/');
    };

    // LOGIC CHỈ KIỂM TRA XÁC THỰC (AUTH)
    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        const token = localStorage.getItem('token');

        // Giả lập logic kiểm tra auth, nếu không có thì chuyển hướng
        if (!token || !storedUsername) {
        }

        setUser(storedUsername);
        setLoading(false); 
        
        window.addEventListener('scroll', toggleVisibility); 
        
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, [navigate]);

    // Giả định quá trình tải đã xong (vì trang About Us là tĩnh)
    useEffect(() => {
        setLoading(false); 
        // Logic gắn lắng nghe sự kiện cuộn được đặt trong useEffect trên
    }, []);

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
         // Xử lý lỗi 
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

            <div className="main-content about-us-container">
                {/* Phần Giới thiệu chung */}
                <header className="about-header">
                    <h1 className="about-title">About Us</h1>
                    <p className="about-subtitle">Chào mừng bạn đến với <b>E-learning System </b>– nơi biến việc học tiếng Anh trực tuyến trở nên dễ dàng, hiệu quả và thú vị. Chúng tôi tin rằng mọi người đều có thể cải thiện kỹ năng ngôn ngữ của mình nếu có một nền tảng phù hợp, phương pháp đúng và sự hướng dẫn tận tâm. Tại đây, học viên không chỉ học ngôn ngữ mà còn tự tin sử dụng tiếng Anh trong giao tiếp hàng ngày, công việc và học tập.</p>
                </header>

                {/* Phần Giới thiệu chi tiết */}
                <section className="about-section mission-vision">
                    <h2 className="section-title">Sứ mệnh & Tầm nhìn</h2>
                    <div className="content-block">
                        <div className="content-text">
                            <p>Cung cấp một nền tảng học tập toàn diện, nơi mọi người có thể phát triển kỹ năng Đọc, Viết, Từ vựng, và Ngữ pháp một cách tự chủ và linh hoạt.</p>
                        </div>
                    </div>
                </section>

                {/* Phần Tại sao chọn chúng tôi */}
                <section className="about-section why-choose-us">
                    <h2 className="section-title">Tại sao chọn chúng tôi?</h2>
                    <div className="features-grid">
                        {ABOUT_FEATURES.map((feature, index) => (
                            <div key={index} className="feature-card">
                                {feature.icon}
                                <h4>{feature.title}</h4>
                                <p>{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
                
                {/* Phần Kêu gọi hành động */}
                <section className="about-section cta-section">
                    <p className="cta-text">Hãy bắt đầu hành trình chinh phục tiếng Anh của bạn ngay hôm nay!</p>
                    <button onClick={() => navigate('/dashboard')} className="cta-button">
                        Khám phá các khóa học
                    </button>
                </section>
                
            </div>

            {/* NÚT CUỘN LÊN ĐẦU TRANG */}
            {isVisible && (
                <button 
                    onClick={scrollToTop} 
                    className="scroll-to-top-button" // Giữ nguyên className
                    title="Lên đầu trang"
                >
                    <FaArrowUp /> 
                </button>
            )}

            <Footer />
        </div>
    );
}

export default AboutUs;