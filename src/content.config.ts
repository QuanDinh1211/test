/**
 * ═══════════════════════════════════════════════════════════════════
 *  NỘI DUNG WEBSITE — CHỈNH SỬA TẤT CẢ Ở ĐÂY
 *  EDIT ALL CONTENT HERE — text, dates, photos, music, messages
 * ═══════════════════════════════════════════════════════════════════
 */

export const content = {
  // ── Ngày sinh nhật / Birthday date ──
  birthday: {
    month: 10, // Tháng (1-12)
    day: 10, // Ngày (1-31)
    displayDate: '10 • 10',
  },

  // ── Màn hình Loading ──
  loading: {
    message: 'Đang chuẩn bị một điều đặc biệt dành cho em...',
    readyText: 'Ready?',
    beginButton: "Let's Begin 💝",
  },

  // ── Màn hình Intro ──
  intro: {
    title: 'Happy Birthday, My Love 💗',
    subtitle: '10.10 — Một ngày đặc biệt dành cho một người đặc biệt.',
    openGiftButton: 'Mở món quà 💝',
  },

  // ── Hero Section ──
  hero: {
    title: 'Happy Birthday, My Love 💗',
    subtitle: 'Chúc mừng sinh nhật cô gái đặc biệt nhất trong trái tim anh.',
    date: '10 • 10',
    ctaButton: 'Anh có điều muốn nói 💌',
    ctaTarget: 'love-letter',
  },

  // ── Countdown ──
  countdown: {
    title: 'Đếm ngược đến ngày đặc biệt 💗',
    birthdayMessage: 'HAPPY BIRTHDAY, MY LOVE! 🎂💗',
  },

  // ── Love Letter ──
  loveLetter: {
    id: 'love-letter',
    title: 'Gửi em, cô gái anh yêu 💌',
    openButton: 'Mở thư 💗',
    paragraphs: [
      'Em à,',
      'Hôm nay là một ngày rất đặc biệt — ngày 10/10, ngày mà một cô gái đặc biệt đã xuất hiện trên thế giới này.',
      'Anh không biết phải dùng bao nhiêu lời mới có thể nói hết rằng anh vui thế nào khi có em bên cạnh.',
      'Cảm ơn em vì đã xuất hiện trong cuộc đời anh.',
      'Cảm ơn em vì những nụ cười, những cuộc trò chuyện và những khoảnh khắc mà chúng ta đã cùng nhau trải qua.',
      'Anh chỉ mong rằng tuổi mới của em sẽ thật nhiều niềm vui, thật nhiều hạnh phúc và luôn có những điều tốt đẹp tìm đến.',
      'Và nếu có thể...',
      'Anh muốn được tiếp tục ở bên em trong thật nhiều ngày sinh nhật nữa. ❤️',
      'Happy Birthday, my love.',
      '— Anh 💗',
    ],
  },

  // ── Timeline kỷ niệm ──
  timeline: {
    id: 'timeline',
    title: 'Những khoảnh khắc của chúng ta 📸',
    subtitle: 'Mỗi khoảnh khắc là một câu chuyện nhỏ trong tình yêu của chúng ta.',
    memories: [
      {
        date: 'Ngày đầu tiên',
        title: 'Ngày đầu tiên gặp nhau',
        description: 'Khoảnh khắc ánh mắt chạm nhau lần đầu — anh đã biết em là người đặc biệt.',
        image: 'https://images.pexels.com/photos/39838823/pexels-photo-39838823.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      },
      {
        date: 'Những ngày đầu',
        title: 'Ngày chúng ta bắt đầu nói chuyện',
        description: 'Những tin nhắn đầu tiên, những đêm thức trắng nói chuyện cùng nhau.',
        image: 'https://images.pexels.com/photos/20479940/pexels-photo-20479940.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      },
      {
        date: 'Buổi hẹn đầu',
        title: 'Buổi hẹn đầu tiên',
        description: 'Anh vẫn nhớ rõ em đã cười như thế nào trong buổi hẹn đầu tiên của chúng ta.',
        image: 'https://images.pexels.com/photos/6248690/pexels-photo-6248690.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      },
      {
        date: 'Mỗi ngày',
        title: 'Một ngày bình thường nhưng thật đặc biệt',
        description: 'Không cần gì nhiều — chỉ cần có em bên cạnh là mỗi ngày đều trở nên đặc biệt.',
        image: 'https://images.pexels.com/photos/14558865/pexels-photo-14558865.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      },
    ],
  },

  // ── Photo Gallery ──
  gallery: {
    id: 'gallery',
    title: 'Khoảnh khắc yêu thương 📷',
    subtitle: 'Những bức ảnh lưu giữ lại tình yêu của chúng ta.',
    photos: [
      {
        src: 'https://images.pexels.com/photos/39838823/pexels-photo-39838823.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        caption: 'Bên nhau dưới hoàng hôn 💗',
        rotate: -2,
      },
      {
        src: 'https://images.pexels.com/photos/4308170/pexels-photo-4308170.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        caption: 'Nắm tay nhau đi qua mọi chuyện 🤝',
        rotate: 3,
      },
      {
        src: 'https://images.pexels.com/photos/20479999/pexels-photo-20479999.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        caption: 'Buổi café chỉ có hai người ☕',
        rotate: -1,
      },
      {
        src: 'https://images.pexels.com/photos/14391560/pexels-photo-14391560.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        caption: 'Hoàng hôn và em 🌅',
        rotate: 2,
      },
      {
        src: 'https://images.pexels.com/photos/8836418/pexels-photo-8836418.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        caption: 'Nụ cười của em là mọi thứ 😊',
        rotate: -3,
      },
      {
        src: 'https://images.pexels.com/photos/30743882/pexels-photo-30743882.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        caption: 'Trái tim chúng ta 💗',
        rotate: 1,
      },
      {
        src: 'https://images.pexels.com/photos/20479946/pexels-photo-20479946.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        caption: 'Cùng nhau mỗi ngày 💕',
        rotate: -2,
      },
      {
        src: 'https://images.pexels.com/photos/27490979/pexels-photo-27490979.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        caption: 'Mãi mãi bên nhau 💗',
        rotate: 3,
      },
    ],
  },

  // ── Mini Game ──
  miniGame: {
    id: 'mini-game',
    title: 'Em đoán xem anh yêu em bao nhiêu? 💗',
    hint: 'Kéo thanh slider để khám phá...',
    infiniteMessage:
      'Không thể đo được nữa rồi... Vì tình yêu của anh dành cho em là vô hạn. ❤️∞',
  },

  // ── Surprise ──
  surprise: {
    id: 'surprise',
    title: 'Nhấn vào đây nếu em muốn nhận một bất ngờ 🎁',
    revealTitle: 'Surprise! 💗',
    revealMessage:
      'Em à, món quà lớn nhất mà anh có thể tặng em chính là trái tim anh. Và anh hứa sẽ trân trọng em mỗi ngày.',
  },

  // ── Wish Section ──
  wishes: {
    id: 'wishes',
    title: 'Điều anh mong cho em trong tuổi mới 🌷',
    cards: [
      { text: 'Luôn vui vẻ 😊', icon: 'smile' },
      { text: 'Luôn xinh đẹp 🌸', icon: 'flower' },
      { text: 'Luôn được yêu thương 💗', icon: 'heart' },
      { text: 'Luôn gặp những điều may mắn ✨', icon: 'sparkles' },
      { text: 'Luôn đạt được những điều em mong muốn 🌙', icon: 'moon' },
    ],
  },

  // ── Interactive Heart ──
  interactiveHeart: {
    id: 'interactive-heart',
    title: 'Chạm vào trái tim 💗',
    counterText: 'Anh đã gửi em',
    counterSuffix: 'cái ôm 💗',
  },

  // ── Secret Message ──
  secretMessage: {
    id: 'secret',
    buttonText: '???',
    title: 'Psst... Đây là bí mật dành riêng cho em.',
    body: 'Anh yêu em nhiều hơn những gì anh có thể nói thành lời. ❤️',
    easterEggQuote: 'Em là điều đẹp nhất mà anh từng biết. 💗',
  },

  // ── Final Section ──
  final: {
    id: 'final',
    date: '10.10',
    title: 'HAPPY BIRTHDAY, MY LOVE 💗',
    wish: 'Chúc em một tuổi mới thật rực rỡ.',
    andThen: 'Và mong rằng...',
    poem: [
      '10/10 năm nay,',
      '10/10 năm sau,',
      'và thật nhiều ngày 10/10 nữa...',
      'Anh vẫn được ở bên em.',
    ],
    signature: 'Made with love ❤️',
  },

  // ── Music ──
  // Thay URL bên dưới bằng file nhạc của bạn (MP3)
  // Replace with your own music file URL
  music: {
    src: '/music/khong_thoi_gian.mp3', // ← Đặt link MP3 vào đây, ví dụ: '/music/khong_thoi_gian.mp3'
    title: 'Romantic Music',
  },
};

export type Content = typeof content;
