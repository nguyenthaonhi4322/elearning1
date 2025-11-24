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
                    <h1 className="about-title">Privacy Policy</h1>
                    <p className="about-subtitle">
                        Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn khi sử dụng nền tảng <b>E-learning System</b>. Dưới đây là các chính sách về cách chúng tôi thu thập, sử dụng và bảo vệ dữ liệu của bạn.
                    </p>
                </header>

                {/* Section 1: Thu thập thông tin */}
                <section className="about-section">
                    <h2 className="section-title">1. Thông tin chúng tôi thu thập</h2>
                    <p><b>Chúng tôi có thể thu thập các loại thông tin sau:</b></p>
                    <p>Thông tin cá nhân: Tên, địa chỉ email, thông tin đăng nhập.</p>
                    <p>Dữ liệu học tập: Các hoạt động, tiến trình khóa học, kết quả và tương tác trên nền tảng.</p>
                    <p>Thông tin khác: Các dữ liệu mà bạn cung cấp tự nguyện để nâng cao trải nghiệm học tập.</p>
                </section>

                {/* Section 2: Cách sử dụng */}
                <section className="about-section">
                    <h2 className="section-title">2. Cách chúng tôi sử dụng thông tin</h2>
                    <p>Thông tin của bạn được sử dụng để quản lý tài khoản và bảo vệ quyền truy cập cá nhân, đồng thời giúp chúng tôi cung cấp các khóa học và nội dung phù hợp với nhu cầu học tập của bạn, cải thiện chất lượng dịch vụ và nâng cao trải nghiệm học tập trực tuyến. Ngoài ra, thông tin này còn được dùng để gửi các thông báo quan trọng, cập nhật và thông tin liên quan đến nền tảng. </p>
                    <p>Chúng tôi cam kết tuyệt đối không bán, cho thuê hay chia sẻ dữ liệu cá nhân của bạn với bên thứ ba vì bất kỳ mục đích thương mại nào.</p>
                </section>

                {/* Section 3: Bảo mật */}
                <section className="about-section">
                    <h2 className="section-title">3. Bảo mật thông tin</h2>
                    <p>Chúng tôi áp dụng các biện pháp bảo mật tiêu chuẩn để đảm bảo rằng thông tin cá nhân của bạn luôn được bảo vệ khỏi truy cập trái phép, rò rỉ, mất mát hoặc lạm dụng. Hệ thống và cơ sở dữ liệu của chúng tôi được thiết kế với các lớp bảo vệ hiện đại, bao gồm kiểm soát truy cập, mã hóa dữ liệu và giám sát liên tục, nhằm đảm bảo an toàn tối đa cho mọi dữ liệu mà bạn cung cấp trên nền tảng.</p>
                </section>

                {/* Section 4: Quyền của bạn */}
                <section className="about-section">
                    <h2 className="section-title">4. Quyền của bạn</h2>
                    <p>Bạn có quyền truy cập, chỉnh sửa hoặc yêu cầu xóa thông tin cá nhân của mình bất cứ lúc nào thông qua cài đặt tài khoản hoặc liên hệ với bộ phận hỗ trợ.</p>
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
