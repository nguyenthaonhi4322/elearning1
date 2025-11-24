import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header'; 
import Footer from './Footer'; 
import '../styles.css';
import { FaArrowUp } from 'react-icons/fa'; 
import { FaVideo, FaArrowLeft, FaPlayCircle } from 'react-icons/fa';
import { FaSearch } from 'react-icons/fa';

// --- HÀM TIỆN ÍCH : Trích xuất ID video YouTube ---
const getYouTubeVideoId = (url) => {
    const match = url.match(/\/embed\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
        return match[1];
    }
    return null;
};
// ----------------------------------------------------

// Dữ liệu giả lập (Mock Data) cho các video
const MOCK_VIDEOS = [
    { 
        id: 1, 
        title: 'Học Tiếng Anh Qua Bài Hát "Kiss The Sky - Maren Morris" ', 
        description: 'Learn English by listening to the song.',
        embed_url: 'https://www.youtube.com/embed/mCmVk5Vki_U', 
        duration: '03:40',
        // Lấy thumbnail từ YouTube
        image: `https://img.youtube.com/vi/${getYouTubeVideoId('https://www.youtube.com/embed/mCmVk5Vki_U')}/sddefault.jpg`
    },
    { 
        id: 2, 
        title: 'Self Calming: On A Rainy Day | Learn English Podcast | Podcast Healing', 
        description: 'Welcome to "Healing on a Rainy Day," a Podcast for Peace and Relaxation!',
        embed_url: 'https://www.youtube.com/embed/vqzqXBSdkYY',
        duration: '10:58',
        // Lấy thumbnail từ YouTube
        image: `https://img.youtube.com/vi/${getYouTubeVideoId('https://www.youtube.com/embed/vqzqXBSdkYY')}/sddefault.jpg`
    },
    { 
        id: 3, 
        title: 'Luyện nghe tiếng Anh thụ động-IELTS', 
        description: 'Improve IELTS listening skills passively, while multitasking!',
        embed_url: 'https://www.youtube.com/embed/NBS7OlWbgS4',
        duration: '40:17',
        // Lấy thumbnail từ YouTube
        image: `https://img.youtube.com/vi/${getYouTubeVideoId('https://www.youtube.com/embed/NBS7OlWbgS4')}/sddefault.jpg`
    },
    { 
        id: 4, 
        title: 'Học Tiếng Anh Qua Bài Hát "I DO - 911"', 
        description: 'Learn English by listening to the song.',
        embed_url: 'https://www.youtube.com/embed/UKUzB6LhoYU',
        duration: '03:24',
        // Lấy thumbnail từ YouTube
        image: `https://img.youtube.com/vi/${getYouTubeVideoId('https://www.youtube.com/embed/UKUzB6LhoYU')}/sddefault.jpg`
    },
    { 
        id: 5, 
        title: 'Tổng Hợp 100 Câu Tiếng Anh Cơ Bản Cho Bé', 
        description: 'Collection of basic English communication phrases and sentences to help children speak English more naturally.',
        embed_url: 'https://www.youtube.com/embed/xoaMVIr_GQo',
        duration: '24:33',
        // Lấy thumbnail từ YouTube
        image: `https://img.youtube.com/vi/${getYouTubeVideoId('https://www.youtube.com/embed/xoaMVIr_GQo')}/sddefault.jpg`
    },
    { 
        id: 6, 
        title: 'Motivation: Finding Your Inner Drive', 
        description: 'A short, inspiring speech about overcoming procrastination and pursuing goals.',
        embed_url: 'https://www.youtube.com/embed/ZXsQAXx_ao0',
        duration: '01:05',
        // Lấy thumbnail từ YouTube
        image: `https://img.youtube.com/vi/${getYouTubeVideoId('https://www.youtube.com/embed/ZXsQAXx_ao0')}/sddefault.jpg`
    },
];

function Video() {
    const [user, setUser] = useState(null);
    const [isVisible, setIsVisible] = useState(false); 
    const [selectedVideo, setSelectedVideo] = useState(null); 
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    // Logic xử lý khi người dùng chọn một video
    const handleSelectVideo = (video) => {
        setSelectedVideo(video);
        window.scrollTo(0, 0); 
    };

    // Logic xử lý khi người dùng muốn quay lại danh sách
    const handleBackToGrid = () => {
        setSelectedVideo(null);
        window.scrollTo(0, 0); 
    };
    
    // Logic chung
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

    // --- Component con để hiển thị một thẻ video trong Grid (VideoCard) ---
    const VideoCard = ({ video, onSelect }) => (
        <div 
            className="video-card" 
            onClick={() => onSelect(video)}
            style={{ 
                border: '1px solid #ddd', 
                borderRadius: '8px', 
                overflow: 'hidden', 
                cursor: 'pointer', 
                transition: 'transform 0.2s, box-shadow 0.2s',
                boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                backgroundColor: 'white',
                position: 'relative' 
            }}
            onMouseOver={e => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
        >
            <div style={{ position: 'relative' }}>
                {/* Đảm bảo thuộc tính src={video.image} đang sử dụng link thumbnail mới */}
                <img 
                    src={video.image} 
                    alt={video.title} 
                    style={{ width: '100%', height: '180px', objectFit: 'cover' }}
                />
                {/* Overlay Play Icon */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <FaPlayCircle style={{ fontSize: '3rem', color: 'white', opacity: 0.9 }} />
                </div>
            </div>
            
            <div style={{ padding: '15px' }}>
                <h4 style={{ margin: '0 0 10px 0', fontSize: '1.1rem', color: '#333' }}>
                    <FaVideo style={{ marginRight: '8px', color: '#dc3545' }} />
                    {video.title}
                </h4>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#777' }}>
                    Thời lượng: {video.duration}
                </p>
            </div>
        </div>
    );
    // -------------------------------------------------------------

    // --- Hàm render chi tiết video ---
    const renderVideoDetail = () => (
        <div style={{ padding: '20px', margin: '20px auto', maxWidth: '900px', backgroundColor: '#ffffff', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
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
                Quay lại danh sách Video
            </button>

            <h1 style={{ color: '#333', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
                {selectedVideo.title}
            </h1>
            <div style={{ margin: '15px 0', color: '#555' }}>
                <span style={{ color: '#888', marginRight: '20px' }}>
                    Thời lượng: {selectedVideo.duration}
                </span>
                <span style={{ color: '#888' }}>
                    Ngày đăng: 03/06/2025
                </span>
            </div>
            
            {/* KHUNG NHÚNG VIDEO YOUTUBE */}
            <div style={{ 
                position: 'relative', 
                paddingBottom: '56.25%', 
                height: 0, 
                overflow: 'hidden',
                borderRadius: '8px',
                marginBottom: '25px'
            }}>
                <iframe
                    title={selectedVideo.title}
                    src={selectedVideo.embed_url}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%'
                    }}
                ></iframe>
            </div>
            
            <div className="video-description" style={{ lineHeight: '1.6', fontSize: '1.1rem', color: '#444' }}>
                <h3 style={{ color: '#333' }}>Mô tả:</h3>
                <p>{selectedVideo.description}</p>
            </div>

            <button 
                onClick={handleBackToGrid} 
                style={{ marginTop: '30px', padding: '12px 30px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
            >
                Hoàn thành và Quay lại
            </button>
        </div>
    );
    // -------------------------------------------------------------

    return (
        <div className="full-page-layout">
            <Header user={user} onLogout={handleLogout} />

            <div className="main-content">
                <h1 className="section-title" style={{margin: '10px 0 15px 0', padding: 0}}>
                    🎬 Trang Luyện Nghe/Xem (Video)
                </h1>
                
                {/* HIỂN THỊ NỘI DUNG TÙY THUỘC VÀO selectedVideo */}
                {selectedVideo ? (
                    renderVideoDetail()
                ) : (
                    <>
                        <h2 className="section-title" style={{margin: '0 0 20px 0', padding: 0, maxWidth: '960px', marginLeft: 'auto', marginRight: 'auto'}}>
                            Danh sách Video
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
                        {/* GRID DANH SÁCH VIDEO */}
                        <div style={{ 
                            display: 'grid', 
                            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                            gap: '25px', 
                            padding: '30px', 
                            maxWidth: '960px', 
                            margin: '0 auto' 
                        }}>
                            {MOCK_VIDEOS.filter(video => video.title.toLowerCase().includes(searchTerm.toLowerCase())).map(video => (
            <VideoCard 
            key={video.id} 
            video={video} 
            onSelect={handleSelectVideo}
        />
))}

                        </div>
                        
                        <div style={{ paddingBottom: '50px' }}></div> 
                    </>
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

export default Video;