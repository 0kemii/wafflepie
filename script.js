const enterScreen = document.getElementById("enter-screen");
const enterBtn = document.getElementById("enter-btn");
const mainContent = document.getElementById("main-content");
const music = document.getElementById("bg-music");

enterBtn.addEventListener("click", async () => {
  try {
    if (!music) {
      console.error("Audio element not found!");
      enterScreen.classList.add("hidden");
      mainContent.style.opacity = "1";
      setTimeout(() => enterScreen.remove(), 1500);
      return;
    }

    music.volume = 0;
    await music.play();

    let vol = 0;
    const fadeAudio = setInterval(() => {
      if (vol < 1) {
        vol += 0.05;
        music.volume = vol;
      } else {
        clearInterval(fadeAudio);
      }
    }, 80);

    enterScreen.classList.add("hidden");
    mainContent.style.opacity = "1";

    setTimeout(() => {
      enterScreen.remove();
    }, 1500);

  } catch (err) {
    console.log("Audio blocked:", err);
    enterScreen.classList.add("hidden");
    mainContent.style.opacity = "1";
    setTimeout(() => enterScreen.remove(), 1500);
  }
});

// Language switching functionality
let currentLang = 0; // 0: Chinese, 1: Japanese, 2: Korean

const languages = [
    {
        name: "中文",
        text: "哈喽我是kemi（或者ricefarmer2137）。<br>我出生于南欧，但是我还是中国人的血，<br>我喜欢玩Minecraft和Roblox。<br>英文 / 中文 / 意大利语。<br>我的时间："
    },
    {
        name: "日本語",
        text: "こんにちは、kemiです（またはricefarmer2137）。<br>南ヨーロッパ生まれですが、中国人の血を引いています。<br>私はMinecraftとRobloxで遊ぶのが好きです。<br>英語 / 中国語 / イタリア語。<br>現在の時間："
    },
    {
        name: "한국어",
        text: "안녕하세요 저는 kemi입니다 (또는 ricefarmer2137).<br>남유럽에서 태어났지만 중국인의 피를 이어받았습니다.<br>나는 마인크래프트랑 로블록스 하는 걸 좋아해.<br>영어 / 중국어 / 이탈리아어.<br>현재 시간:"
    }
];

function switchLanguage() {
    currentLang = (currentLang + 1) % languages.length;
    const lang = languages[currentLang];
    
    // Update button label
    document.getElementById('langLabel').textContent = lang.name;
    
    // Update the text content (keep the time span)
    const textElement = document.getElementById('text02');
    const timeSpan = document.getElementById('myTime');
    
    // Get current time text
    const currentTime = timeSpan.textContent;
    
    // Update the text while preserving the time span
    textElement.innerHTML = `<span class="p">${lang.text}<span id="myTime">${currentTime}</span></span>`;
    
    // Re-attach the time span reference (since innerHTML replaced it)
    window.myTimeElement = document.getElementById('myTime');
}

let isPlaying = false;

function playMusic() {
    const audio = document.getElementById("myAudio");

    // if already playing → ignore
    if (!audio.paused) return;

    audio.volume = 0.4;
    audio.play();
}

function updateTime() {
    const now = new Date();
    const utc1 = new Date(now.getTime() + (60 * 60 * 1000));
    let hours = utc1.getUTCHours();
    let minutes = utc1.getUTCMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    if (hours === 0) hours = 12;
    minutes = minutes.toString().padStart(2, '0');
    document.getElementById('myTime').textContent = `${hours}.${minutes} ${ampm} (UTC +1)`;
}

(function () {
    const card = document.querySelector('.site-main');
    if (!card) return;

    // Store original card styles
    const originalTransition = card.style.transition;

    // Mouse move handler
    function handleMouseMove(e) {
        // Get mouse position relative to window
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        // Calculate rotation (max 15 degrees in either direction)
        const rotateY = (mouseX - 0.5) * 15; // -15deg to 15deg
        const rotateX = (mouseY - 0.5) * -10; // 10deg to -10deg

        // Calculate translation (subtle movement)
        const translateX = (mouseX - 0.5) * 20; // -20px to 20px
        const translateY = (mouseY - 0.5) * 15; // -15px to 15px

        // Apply transform with smooth transition
        card.style.transform = `perspective(1000px) 
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg)
            translateX(${translateX}px)
            translateY(${translateY}px)
            translateZ(20px)`;
    }

    // Reset card position when mouse leaves window
    function handleMouseLeave() {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateX(0) translateY(0) translateZ(0)';
    }

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Optional: Add a subtle floating effect when mouse is stationary
    let timeout;
    document.addEventListener('mousemove', function () {
        clearTimeout(timeout);
        card.style.transition = 'transform 0.1s ease-out';

        timeout = setTimeout(function () {
            card.style.transition = 'transform 0.5s ease-out';
        }, 1000);
    });
})();

document.addEventListener('selectstart', function (e) {
    e.preventDefault();
});

// Typewriter Effect
(function () {
    // Wait for element to be ready
    const initTypewriter = function () {
        const TextList = [
            "Hello!",
            "こんにちは!",
            "안녕!",
            "你好!"
        ];

        const Element = document.getElementById("Typewriter");
        if (!Element) return;

        let Index = 0;
        let CharIndex = 0;
        let CurrentText = "";
        let IsDeleting = false;

        function TypeLoop() {
            const FullText = TextList[Index];

            if (!IsDeleting) {
                CurrentText = FullText.substring(0, CharIndex + 1);
                CharIndex++;
                if (CurrentText === FullText) {
                    IsDeleting = true;
                    setTimeout(TypeLoop, 3000); // Pause at full word
                    Element.textContent = CurrentText;
                    return;
                }
            } else {
                CurrentText = FullText.substring(0, CharIndex - 1);
                CharIndex--;
                if (CharIndex === 0) {
                    IsDeleting = false;
                    Index = (Index + 1) % TextList.length;
                }
            }

            Element.textContent = CurrentText;
            const Speed = IsDeleting ? 60 : 90; // Faster when deleting
            setTimeout(TypeLoop, Speed);
        }

        // Start the typewriter effect
        // Clear existing content first
        Element.textContent = "";
        setTimeout(TypeLoop, 500); // Small delay before starting
    };

    // Run when page is fully loaded
    if (document.readyState === 'complete') {
        initTypewriter();
    } else {
        window.addEventListener('load', initTypewriter);
    }
})();

// update every minute
updateTime();
setInterval(updateTime, 60000);
