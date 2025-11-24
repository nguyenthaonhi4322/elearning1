import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import '../styles.css';
import { FaArrowUp, FaSearch, FaBookOpen, FaArrowLeft } from 'react-icons/fa';

// Dữ liệu giả lập (Mock Data)
const MOCK_ARTICLES = [
    { 
        id: 1, 
        title: 'A Christmas Carol (1843) - Charles Dickens (trích đoạn)', 
        content: [
        'It was cold, bleak, biting weather: foggy withal: and he could hear the people in the court outside, go wheezing up and down, beating their hands upon their breasts, and stamping their feet upon the pavement stones to warm them. The city clocks had only just gone three, but it was quite dark already — it had not been light all day — and candles were flaring in the windows of the neighboring offices, like ruddy smears upon the palpable brown air. The fog came pouring in at every chink and keyhole, and was so dense without, that although the court was of the narrowest, the houses opposite were mere phantoms.',
        'Inside, old Scrooge sat, cold as ever, in his counting-house, without a spark of warmth in his heart or fire in his grate. Christmas meant nothing to him — just “humbug!” as he called it — until that one night when the ghosts came to visit…',
        '<strong> Dịch </strong>',
        'Trời lạnh, ảm đạm, buốt giá; sương mù dày đặc; và ông có thể nghe thấy những người ngoài sân đang thở hổn hển đi qua đi lại, đập tay vào ngực và giậm chân xuống nền đá để làm ấm mình. Đồng hồ thành phố mới điểm ba giờ, nhưng trời đã tối đen — cả ngày chẳng có chút ánh sáng nào — và những ngọn nến đang cháy sáng trong cửa sổ của các văn phòng gần đó, như những vệt đỏ ấm áp loang trên nền không khí nâu đặc quánh. Sương mù tràn vào qua từng khe hở và lỗ khóa, dày đến mức dù con hẻm hẹp đến đâu, những ngôi nhà đối diện cũng chỉ còn là những bóng mờ ảo.',
        'Bên trong, lão Scrooge ngồi đó, lạnh lẽo như mọi khi, trong căn phòng kế toán của mình — trong tim không có chút ấm áp nào, cũng chẳng có ngọn lửa nào trong lò sưởi. Giáng Sinh chẳng có ý nghĩa gì với lão — chỉ là “trò bịp bợm!”, như lão vẫn nói — cho đến cái đêm khi những hồn ma tìm đến...'
        ], 
        image: '/images/reading1.jpg' 
    },
    { id: 2, title: 'Dear Theo: The Autobiography of Vincent van Gogh - Vincent van Gogh (trích đoạn)', 
        content: [
        'What am I in the eyes of most people? A nonentity, an eccentric, or an unpleasant person — somebody who has no position in society and will never have one; in short, the lowest of the low. All right, then — even if that were absolutely true, then one day I would like to show by my work what such an eccentric, such a nobody, has in his heart.',
        'I will not live without love, that’s the moral of my life. I want to do something in the world, something that has meaning, something that will show that my life was not lived in vain. I want to leave behind a little bit of myself — a feeling, a tone, a brushstroke — that will say: this man felt deeply.',
        'I know that my paintings will not be understood now. But someday, people will see that they were made with emotion, with faith, and with a love of humanity. And perhaps, in that day, they will understand that I was not mad — I was only ahead of my time.',
        '<strong> Dịch </strong>',
        'Tôi là gì trong mắt hầu hết mọi người? Một kẻ vô danh, lập dị, hoặc một người khó chịu — ai đó không có chỗ đứng trong xã hội, và có lẽ sẽ chẳng bao giờ có được. Được thôi — dù điều đó hoàn toàn đúng đi nữa, thì một ngày nào đó, tôi vẫn muốn cho thế gian thấy qua những bức tranh của mình, điều mà một kẻ lập dị, một kẻ vô danh, mang trong tim.',
        'Tôi không thể sống mà không có tình yêu — đó là đạo lý của cuộc đời tôi. Tôi muốn làm được điều gì đó cho thế giới, điều gì đó có ý nghĩa, điều gì đó chứng minh rằng đời tôi không trôi qua vô ích. Tôi muốn để lại một chút gì đó của riêng mình — một cảm xúc, một âm điệu, một nét cọ — để nói rằng: con người này đã từng cảm nhận sâu sắc.',
        'Tôi biết những bức tranh của mình sẽ không được thấu hiểu lúc này. Nhưng rồi sẽ có ngày, người ta nhận ra rằng chúng được tạo nên bằng cảm xúc, bằng niềm tin, và bằng tình yêu với con người. Và có lẽ, vào ngày đó, họ sẽ hiểu rằng tôi không điên — tôi chỉ đi trước thời đại của mình.'
        ],
        image: '/images/reading2.jpg' 
    },
    { id: 3, title: 'The Lives of the Artists (1550) - Giorgio Vasari (trích đoạn)', 
        content: [
        'In this head, Leonardo made every effort to express the idea of nature. The eyes have that lustre and moistness which are always seen in real life, and around them are the tints of red and the lashes, which cannot be represented without the greatest subtlety. The eyebrows are shaded, showing the manner in which the hairs spring from the flesh, and run according to the pores of the skin, a thing which cannot be done without the greatest care.',
        'The mouth, with its opening and with its ends united by the red of the lips to the flesh tints of the face, seemed, in truth, to be living flesh rather than paint. And in the pit of the throat, if one looks attentively, one could see the beating of the pulse — a marvel that even the most skilled painter would find impossible to imitate.',
        '<strong> Dịch </strong>',
        'Trong bức đầu này, Leonardo đã dốc hết tâm sức để thể hiện tinh hoa của tự nhiên. Đôi mắt mang ánh sáng và độ ẩm như đang sống thật, quanh đó là sắc đỏ và hàng mi tinh tế đến mức tưởng như không thể tái hiện bằng cọ vẽ. Đôi lông mày được tô đậm nhẹ, cho thấy từng sợi lông mọc lên từ làn da, chạy theo hướng của từng lỗ chân lông — một chi tiết đòi hỏi sự tỉ mỉ tuyệt đối.',
        'Đôi môi, với phần mở nhẹ và hai khóe hòa quyện giữa sắc đỏ và màu da, dường như không phải được vẽ mà là da thịt sống động thật sự. Và nơi hõm cổ, nếu quan sát kỹ, người ta có thể thấy nhịp đập của mạch máu — một điều kỳ diệu mà ngay cả họa sĩ tài năng nhất cũng khó lòng tái tạo.'
        ], 
        image: '/images/reading3.jpg' 
    },
    { id: 4, title: 'The Nightmare Before Christmas - Tim Burton (hội thoại)', 
        content: [
        '<strong>Jack Skellington:</strong> (looking at the moon) Another Halloween has come and gone. I’m tired of the same old tricks and screams.',
        '<strong>Sally:</strong> But Jack, Halloween wouldn’t be the same without you. Everyone in Halloween Town loves what you do.',
        '<strong>Jack:</strong> That’s just it, Sally. I’m tired of being admired for the same thing every year. There must be more to life than screams and scares.',
        '<strong>Sally:</strong> Maybe... but what if you try something new? Something that makes you happy?',
        '<strong>Jack:</strong> I found something today—something wonderful! A place called “Christmas Town.” Bright lights, laughter, joy everywhere!',
        '<strong>Sally:</strong> Christmas Town? That sounds… lovely. But Jack, are you sure it’s for us?',
        '<strong>Jack:</strong> Why not? Imagine, Sally—no more fear, no more gloom! We could bring Christmas to Halloween Town!',
        '<strong>Sally:</strong> (worried) I don’t think that’s a good idea, Jack. Mixing fear and joy… it might not work.',
        '<strong>Jack:</strong> Nonsense! It’ll be the best holiday ever. You’ll see!',
        '<strong>Sally:</strong> (softly) I just hope you’re right…',
        '<strong> Dịch </strong>',
        '<strong>Jack Skellington:</strong> (nhìn lên mặt trăng) Một mùa Halloween nữa lại qua rồi. Tôi mệt mỏi với những trò hù dọa và tiếng la hét cũ rích này.',
        '<strong>Sally:</strong> Nhưng Jack à, Halloween sẽ chẳng còn như trước nếu không có anh. Mọi người ở Thị trấn Halloween đều yêu thích những gì anh làm mà.',
        '<strong>Jack:</strong> Chính vì thế đó, Sally. Tôi mệt mỏi vì cứ được ngưỡng mộ vì cùng một điều mỗi năm. Hẳn là phải có điều gì đó hơn là chỉ hù dọa và la hét chứ.',
        '<strong>Sally:</strong> Có thể... nhưng nếu anh thử làm điều gì mới? Một điều khiến anh thật sự hạnh phúc thì sao?',
        '<strong>Jack:</strong> Hôm nay tôi tìm thấy một thứ tuyệt vời! Một nơi gọi là “Thị trấn Giáng Sinh”. Ở đó có ánh đèn rực rỡ, tiếng cười, và niềm vui khắp nơi!',
        '<strong>Sally:</strong> Thị trấn Giáng Sinh ư? Nghe có vẻ dễ thương thật đấy. Nhưng Jack, anh chắc là nơi đó hợp với chúng ta chứ?',
        '<strong>Jack:</strong> Tại sao lại không chứ? Hãy tưởng tượng đi, Sally — không còn sợ hãi, không còn u ám! Chúng ta có thể mang Giáng Sinh về Thị trấn Halloween!',
        '<strong>Sally:</strong> (lo lắng) Em không nghĩ đó là ý hay đâu, Jack. Trộn lẫn nỗi sợ và niềm vui... có thể sẽ không ổn đâu.',
        '<strong>Jack:</strong> Vớ vẩn! Đây sẽ là kỳ nghỉ tuyệt nhất từ trước đến nay. Rồi em sẽ thấy!',
        '<strong>Sally:</strong> (nhẹ giọng) Em chỉ mong anh đúng thôi...'
        ], 
        image: '/images/reading4.jpg' 
    },
    { id: 5, title: 'Howl’s Moving Castle - Diana Wynne Jones (trích đoạn)', 
        content: [
        'Sophie stared at the strange moving castle before her. It creaked and groaned as it crawled across the hills, smoke puffing out from its chimneys like a living creature. She could hardly believe her eyes.',
        'When she finally gathered enough courage, she pushed open the heavy door and stepped inside.',
        'The room was warm and full of clutter—books, bottles, strange glowing objects, and a fire that seemed to have a face.',
        '<strong>Sophie:</strong> (whispering) Oh dear... am I dreaming?',
        '<strong>Fire:</strong> (snapping playfully) Dreaming? You’re very much awake, old lady.',
        'Sophie gasped. The fire in the hearth had two bright yellow eyes and a crooked mouth made of flame.',
        '<strong>Sophie:</strong> You... you can talk?',
        '<strong>Fire:</strong> Of course I can. My name’s Calcifer. I’m the heart of this castle.',
        'Before Sophie could reply, a tall man with messy blond hair entered the room. His eyes were sharp but kind.',
        '<strong>Howl:</strong> Calcifer, who’s our guest? You’re not burning the furniture again, are you?',
        '<strong>Calcifer:</strong> She just walked in! Said nothing about burning!',
        '<strong>Sophie:</strong> (nervously) I—I’m sorry. I didn’t mean to intrude. I was only looking for shelter.',
        '<strong>Howl:</strong> (smiling) Shelter, hmm? Well, my castle moves fast, but I suppose it can spare a chair. Sit down, won’t you?',
        'Sophie sat, still unsure if she should stay or run away. The castle creaked again, and she felt it move beneath her feet—alive, just like the stories said.',
        '<strong> Dịch </strong>',
        'Sophie nhìn chằm chằm vào tòa lâu đài kỳ lạ trước mặt. Nó kêu cót két và rên rỉ khi di chuyển qua những ngọn đồi, khói phun ra từ các ống khói như thể nó đang sống. Cô gần như không tin vào mắt mình.',
        'Khi lấy đủ can đảm, cô đẩy cánh cửa nặng nề và bước vào.',
        'Căn phòng ấm áp và bừa bộn — đầy sách, lọ thủy tinh, những vật phát sáng kỳ lạ, và một ngọn lửa dường như có khuôn mặt.',
        '<strong>Sophie:</strong> (thì thầm) Trời ơi... mình đang mơ à?',
        '<strong>Ngọn lửa:</strong> (nảy lửa vui vẻ) Mơ ư? Bà tỉnh như sáo đấy.',
        'Sophie sững sờ. Ngọn lửa trong lò có đôi mắt vàng rực và cái miệng cong làm bằng lửa.',
        '<strong>Sophie:</strong> Anh... anh biết nói sao?',
        '<strong>Ngọn lửa:</strong> Tất nhiên rồi. Tôi là Calcifer. Tôi chính là trái tim của tòa lâu đài này.',
        'Trước khi Sophie kịp đáp, một người đàn ông tóc vàng rối bù bước vào phòng. Ánh mắt anh sắc nhưng hiền.',
        '<strong>Howl:</strong> Calcifer, ai thế? Cậu không đốt đồ đạc lần nữa đấy chứ?',
        '<strong>Calcifer:</strong> Cô ấy tự bước vào đấy nhé! Tôi có đốt gì đâu!',
        '<strong>Sophie:</strong> (lo lắng) Tôi… tôi xin lỗi. Tôi không cố ý xâm nhập. Tôi chỉ tìm chỗ trú thôi.',
        '<strong>Howl:</strong> (mỉm cười) Tìm chỗ trú à? Lâu đài của tôi chạy nhanh đấy, nhưng chắc nó vẫn còn dư một cái ghế. Ngồi đi nào.',
        'Sophie ngồi xuống, vẫn chưa biết nên ở lại hay bỏ đi. Lâu đài lại kêu răng rắc, và cô cảm thấy nó di chuyển dưới chân mình — sống động, đúng như lời đồn.'
    ],  image: '/images/reading5.jpg' 
    },
    { id: 6, title: 'The Tale of the Princess Kaguya - Isao Takahata (2013) - (trích đoạn)', 
        content: [
        'The palace walls shimmered under the silver light of the moon.',
        'Inside, Princess Kaguya sat still, her heart heavy. The laughter, the music, the endless rules — they all felt distant, hollow.',
        'She rose and walked through the silent corridors, her bare feet brushing against the cold floor. Outside, the garden glowed softly, and beyond it, the dark forest called her name.',
        'Without thinking, she began to run.',
        'Her robes fluttered like wings, her hair streaming behind her. The night air was cool, carrying the scent of spring bamboo and wild plum.',
        'Kaguya ran faster and faster, her breath short, her eyes bright with tears.',
        'Every step pulled her farther from the palace, closer to the hills where she once laughed as a child.',
        'She stumbled, then fell upon the grass. The earth felt warm beneath her hands, alive and kind.',
        'For a moment, the moonlight surrounded her completely. It was the same light that had once cradled her when she was born from the bamboo.',
        'Kaguya looked up at the sky.',
        'The moon seemed nearer now — vast, quiet, and waiting.',
        '<strong> Dịch </strong>',
        'Những bức tường cung điện ánh lên sắc bạc dưới ánh trăng.',
        'Bên trong, công chúa Kaguya ngồi lặng, trái tim nặng trĩu. Tiếng cười, tiếng nhạc, những nghi lễ bất tận — tất cả đều xa lạ và trống rỗng.',
        'Cô đứng dậy, bước đi qua những hành lang tĩnh lặng, bàn chân trần chạm vào nền đá lạnh. Bên ngoài, khu vườn ngập ánh sáng dịu, và xa hơn, khu rừng tối mời gọi cô trở về.',
        'Không suy nghĩ, cô bắt đầu chạy.',
        'Tấm áo lụa tung bay như cánh chim, mái tóc cô phất phơ sau lưng. Gió đêm mát rượi, mang theo hương tre non và hoa mận dại.',
        'Kaguya chạy càng lúc càng nhanh, hơi thở gấp gáp, nước mắt long lanh trong mắt. Mỗi bước chân đưa cô rời xa cung điện, gần hơn với ngọn đồi nơi cô từng cười vui thuở nhỏ.',
        'Cô vấp ngã, ngã xuống cỏ. Mặt đất ấm áp dưới tay cô, như còn đang thở.',
        'Trong khoảnh khắc ấy, ánh trăng bao trùm lấy cô — thứ ánh sáng từng ôm ấp cô khi được sinh ra từ cây tre.',
        'Kaguya ngẩng lên nhìn bầu trời.',
        'Mặt trăng dường như gần hơn bao giờ hết — bao la, tĩnh lặng, và đang chờ đợi.'
        ], image: '/images/reading6.jpg' 
    },
    { id: 7, title: 'The Silence of the Lambs - Thomas Harris(1988) - (trích đoạn)', 
        content: [
        '"You know what you look like to me, with your good bag and your cheap shoes? You look like a rube. A well-scrubbed, hustling rube with a little taste. Good nutrition has given you some length of bone, but you’re not more than one generation from poor white trash, are you, Agent Starling? And that accent you’ve tried so desperately to shed: pure West Virginia. What’s your father do? Isn’t he dead? I didn’t think he made you, did he? Not your father, Agent Starling…your father couldn’t produce a daughter like you. I’d like to know what made you that way."',
        '<strong> Dịch </strong>',
        '"Cô biết cô trông như thế nào trong mắt tôi không, với cái túi xách sang trọng và đôi giày rẻ tiền đó? Cô trông giống như một người quê. Một người quê được tắm rửa sạch sẽ, biết làm ăn, với một chút khiếu thẩm mỹ. Chế độ dinh dưỡng tốt đã cho cô đôi chân dài, nhưng cô cũng chỉ cách một thế hệ so với những người da trắng nghèo, đúng không, Cảnh sát Starling? Và giọng điệu mà cô cố gắng bỏ đi một cách tuyệt vọng kia: hoàn toàn là giọng Tây Virginia. Cha cô làm nghề gì? Ông ấy đã chết phải không? Tôi không nghĩ ông ấy làm ra cô, đúng không? Không phải cha cô, Cảnh sát Starling…cha cô không thể sinh ra một cô con gái như cô. Tôi muốn biết điều gì đã tạo nên con người cô như thế này."'
        ], image: '/images/reading7.jpg' 
    },
    { id: 8, title: 'Sherlock Holmes (A Study in Scarlet) - Conan Doyle (1887) - (trích đoạn)', 
        content: [
        'You see, but you do not observe. The distinction is clear. For example, you have frequently seen the steps which lead up to this room.',
        'Yes, I replied.',
        'How often have you observed them?',
        'Once or twice.',
        'Then your observation is at fault. You do not notice what is before your eyes. You see, but you do not observe.',
        '<strong> Dịch </strong>',
        'Cậu thấy đấy, nhưng không quan sát. Sự khác biệt này rất rõ ràng. Ví dụ, cậu thường thấy những bậc thang dẫn lên phòng này.',
        'Vâng, tôi đáp.',
        'Cậu đã quan sát chúng bao nhiêu lần?',
        'Một hoặc hai lần.',
        'Vậy thì khả năng quan sát của cậu có vấn đề. Cậu không nhận ra những gì ngay trước mắt. Cậu nhìn thấy, nhưng không quan sát.'
        ], image: '/images/reading8.jpg' 
    },
    { id: 9, title: 'Spirited Away - Hayao Miyazaki (2001) - (hội thoại)', 
        content: [
        '<strong>Chihiro:</strong> I don’t know where I am… everything is so strange. I’m scared. I don’t know what to do.',
        '<strong>Haku:</strong> It’s okay. You’re safe here, for now. But you must remember your name. If you forget it, you’ll cease to exist in this world. Names are important.',
        '<strong>Chihiro:</strong> But I’m afraid I’ll forget… everything. I don’t want to be lost.',
        '<strong>Haku:</strong> Listen to me carefully. Hold on to your name, hold on to yourself. No matter what they try to make you do, no matter how confusing this place gets, don’t lose who you are. You have the power to return home, but you must stay strong and keep your mind clear.',
        '<strong>Chihiro:</strong> I… I’ll try. I won’t forget.',
        '<strong>Haku:</strong> Good. Remember, you’re braver than you think. Every step you take matters. You are not alone.',
        '<strong> Dịch </strong>',
        '<strong>Chihiro:</strong> Tớ không biết mình đang ở đâu… mọi thứ đều lạ lẫm. Tớ sợ. Tớ không biết phải làm gì.',
        '<strong>Haku:</strong> Ổn mà. Hiện giờ cậu an toàn ở đây. Nhưng cậu phải nhớ tên mình. Nếu quên, cậu sẽ biến mất trong thế giới này. Tên rất quan trọng.',
        '<strong>Chihiro:</strong> Nhưng tớ sợ sẽ quên… mọi thứ. Tớ không muốn bị lạc.',
        '<strong>Haku:</strong> Nghe tớ nói cẩn thận. Hãy giữ tên mình, giữ lấy bản thân. Dù họ có làm gì cậu, dù nơi này có rối rắm thế nào, đừng đánh mất chính mình. Cậu có sức mạnh để trở về nhà, nhưng phải mạnh mẽ và giữ đầu óc tỉnh táo.',
        '<strong>Chihiro:</strong> I… tớ sẽ cố gắng. Tớ sẽ không quên.',
        '<strong>Haku:</strong> Tốt lắm. Nhớ rằng cậu dũng cảm hơn mình nghĩ. Mỗi bước cậu đi đều quan trọng. Cậu không đơn độc.',
        ], image: '/images/reading9.jpg' 
    },
];

function Reading() {
const [user, setUser] = useState(null);
const [isVisible, setIsVisible] = useState(false);
const [selectedArticle, setSelectedArticle] = useState(null);
const [searchTerm, setSearchTerm] = useState('');
const navigate = useNavigate();


const handleSelectArticle = (article) => {
    setSelectedArticle(article);
    window.scrollTo(0, 0); 
};

const handleBackToGrid = () => {
    setSelectedArticle(null);
    window.scrollTo(0, 0); 
};

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

// Lọc danh sách bài đọc
const normalizedSearchTerm = searchTerm.trim().toLowerCase();
const filteredArticles = MOCK_ARTICLES.filter(article => {
    if (!normalizedSearchTerm) return true;
    const searchKeywords = normalizedSearchTerm.split(/\s+/).filter(word => word.length > 0);
    const articleContentString = Array.isArray(article.content) ? article.content.join(' ') : article.content;
    const searchableText = (article.title + ' ' + articleContentString).toLowerCase();
    return searchKeywords.some(keyword => searchableText.includes(keyword));
});

// Render chi tiết bài đọc
const renderArticleDetail = () => (
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
            Quay lại danh sách
        </button>

        <h1 style={{ color: '#333', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
            {selectedArticle.title}
        </h1>
        <div style={{ margin: '15px 0', color: '#555' }}>
            <span style={{ color: '#888' }}>Ngày đăng: 03/06/2025</span>
        </div>
        
        <img 
            src={selectedArticle.image} 
            alt={selectedArticle.title} 
            style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '8px', marginBottom: '25px' }}
        />
        
        <div className="article-content" style={{ lineHeight: '1.8', fontSize: '1.1rem', color: '#444' }}>
            {Array.isArray(selectedArticle.content) ? (
                selectedArticle.content.map((paragraph, index) => {
                    if (/<[a-z][\s\S]*>/i.test(paragraph)) {
                        return <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />;
                    } else {
                        return <p key={index}>{paragraph}</p>;
                    }
                })
            ) : (
                <p>{selectedArticle.content}</p>
            )}
        </div>

        <button 
            onClick={handleBackToGrid} 
            style={{ marginTop: '30px', padding: '12px 30px', backgroundColor: '#6e9277', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
        >
            Hoàn thành và Quay lại
        </button>
    </div>
);

return (
    <div className="full-page-layout">
        <Header user={user} onLogout={handleLogout} />

        <div className="main-content">
            <h1 className="section-title" style={{marginTop: '10px'}}>
                📖 Trang Luyện đọc (Reading)
            </h1>
            
            {selectedArticle ? (
                renderArticleDetail()
            ) : (
                <>
            
                    {/* Grid bài đọc */}
                    <h2 className="section-title" style={{marginTop: '30px', paddingBottom: '10px', maxWidth: '900px', margin: '0 auto'}}>
                        Danh sách Bài đọc 
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
                        {filteredArticles.length > 0 ? (
                            filteredArticles.map(article => (
                                <div 
                                    key={article.id} 
                                    className="article-card" 
                                    onClick={() => handleSelectArticle(article)}
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
                                        src={article.image} 
                                        alt={article.title} 
                                        style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                                    />
                                    <div style={{ padding: '15px' }}>
                                        <h4 style={{ margin: '0 0 10px 0', fontSize: '1.1rem', color: '#333' }}>
                                            <FaBookOpen style={{ marginRight: '8px', color: '#007bff' }} />
                                            {article.title}
                                        </h4>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#666' }}>
                                Không tìm thấy bài đọc nào với từ khóa "{searchTerm}".
                            </p>
                        )}
                    </div>
                    
                    <div style={{ paddingBottom: '50px' }}></div> 
                </>
            )}
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

export default Reading;
