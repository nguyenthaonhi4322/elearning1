import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import '../styles.css';
import { FaArrowUp } from 'react-icons/fa';

function PrivacyPolicy() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const [isVisible, setIsVisible] = useState(false);

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

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        navigate('/');
    };

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        const token = localStorage.getItem('token');

        if (!token || !storedUsername) {
            // Có thể redirect hoặc không, tuỳ logic
        }

        setUser(storedUsername);
        setLoading(false);

        window.addEventListener('scroll', toggleVisibility);

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, [navigate]);

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

            <div className="main-content privacy-policy-container">
                <header className="about-header">
                    <h1 className="about-title">Terms of Service</h1>
                    <p className="about-subtitle">
                        Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn khi sử dụng nền tảng <b>E-learning System</b>. Dưới đây là các chính sách về cách chúng tôi thu thập, sử dụng và bảo vệ dữ liệu của bạn.
                    </p>
                </header>

                {/* Section 1: Thu thập thông tin */}
                <section className="about-section">
                    <h2 className="section-title">1. Sử dụng dịch vụ</h2>
                    <p>Bạn được phép sử dụng nền tảng <b>E-learning System</b> cho mục đích học tập cá nhân và không thương mại. Bạn không được phép sao chép, phân phối, chỉnh sửa hoặc sử dụng bất kỳ nội dung nào trên nền tảng cho mục đích thương mại mà không có sự đồng ý bằng văn bản từ <b>E-learning System</b>.</p>
                </section>

                {/* Section 2: Cách sử dụng */}
                <section className="about-section">
                    <h2 className="section-title">2. Tài khoản người dùng</h2>
                    <p>Một số tính năng của nền tảng yêu cầu bạn tạo tài khoản. Bạn chịu trách nhiệm bảo mật thông tin đăng nhập, bao gồm tên đăng nhập và mật khẩu. Mọi hoạt động diễn ra thông qua tài khoản của bạn sẽ được coi là do bạn thực hiện. Vui lòng thông báo ngay lập tức nếu nghi ngờ tài khoản bị truy cập trái phép.</p>
                </section>

                {/* Section 3: Bảo mật */}
                <section className="about-section">
                    <h2 className="section-title">3. Nội dung và bản quyền</h2>
                    <p>Mọi nội dung trên nền tảng, bao gồm bài học, video, hình ảnh, tài liệu và phần mềm, đều được bảo vệ bởi luật bản quyền và các quyền sở hữu trí tuệ khác. Bạn không được tái sản xuất, phân phối hoặc chia sẻ nội dung mà không có sự cho phép của <b>E-learning System</b>.</p>
                </section>

                {/* Section 4: Quyền của bạn */}
                <section className="about-section">
                    <h2 className="section-title">4. Liên hệ</h2>
                    <p>Nếu có bất kỳ câu hỏi hoặc thắc mắc nào liên quan đến điều khoản dịch vụ, vui lòng liên hệ với chúng tôi qua email hỗ trợ hoặc mục Liên hệ trên nền tảng.</p>
                </section>

                {/* Call to action */}
                <section className="about-section cta-section">
                    <p className="cta-text">Hãy trải nghiệm nền tảng E-learning System với sự an tâm về bảo mật thông tin của bạn.</p>
                    <button onClick={() => navigate('/dashboard')} className="cta-button">
                        Quay về Trang chủ
                    </button>
                </section>
            </div>

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

export default PrivacyPolicy;
