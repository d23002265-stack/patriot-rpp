// Cookie Notice
document.addEventListener('DOMContentLoaded', function() {
    const cookieNotice = document.getElementById('cookieNotice');
    const acceptCookiesBtn = document.getElementById('acceptCookies');
    
    // Check if cookies were already accepted
    if (!localStorage.getItem('cookiesAccepted')) {
        // Show cookie notice after loading screen disappears
        setTimeout(() => {
            if (cookieNotice) {
                cookieNotice.classList.add('show');
            }
        }, 5500); // Show after loading screen (5 seconds) + small delay
    }
    
    // Handle cookie acceptance
    if (acceptCookiesBtn) {
        acceptCookiesBtn.addEventListener('click', function() {
            localStorage.setItem('cookiesAccepted', 'true');
            
            if (cookieNotice) {
                cookieNotice.classList.remove('show');
                
                // Remove from DOM after animation
                setTimeout(() => {
                    cookieNotice.remove();
                }, 400);
            }
        });
    }
});

// Enhanced Loading Screen
document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    const loadingProgress = document.getElementById('loadingProgress');
    const loadingPercentage = document.getElementById('loadingPercentage');
    const loadingText = document.getElementById('loadingText');
    const loadingTips = document.querySelectorAll('.loading-tip');
    const loadingParticles = document.getElementById('loadingParticles');
    
    let currentProgress = 0;
    let currentTipIndex = 0;
    
    // Loading stages with realistic timing
    const loadingStages = [
        { progress: 15, text: 'Подключение к серверу...', duration: 800 },
        { progress: 30, text: 'Загрузка ресурсов...', duration: 600 },
        { progress: 50, text: 'Инициализация мира...', duration: 700 },
        { progress: 70, text: 'Синхронизация данных...', duration: 500 },
        { progress: 85, text: 'Подготовка интерфейса...', duration: 400 },
        { progress: 100, text: 'Добро пожаловать!', duration: 300 }
    ];
    
    let stageIndex = 0;
    
    // Create floating particles
    function createLoadingParticle() {
        const particle = document.createElement('div');
        particle.className = 'loading-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 2 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 6) + 's';
        
        loadingParticles.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 10000);
    }
    
    // Create particles continuously
    const particleInterval = setInterval(() => {
        createLoadingParticle();
    }, 200);
    
    // Rotate loading tips
    function rotateTips() {
        loadingTips[currentTipIndex].classList.remove('active');
        currentTipIndex = (currentTipIndex + 1) % loadingTips.length;
        loadingTips[currentTipIndex].classList.add('active');
    }
    
    const tipInterval = setInterval(rotateTips, 3000);
    
    // Smooth progress animation
    function animateProgress(targetProgress, duration) {
        const startProgress = currentProgress;
        const progressDiff = targetProgress - startProgress;
        const startTime = Date.now();
        
        function updateProgress() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            
            currentProgress = startProgress + (progressDiff * easeProgress);
            
            if (loadingProgress) {
                loadingProgress.style.width = currentProgress + '%';
            }
            if (loadingPercentage) {
                loadingPercentage.textContent = Math.floor(currentProgress) + '%';
            }
            
            if (progress < 1) {
                requestAnimationFrame(updateProgress);
            }
        }
        
        updateProgress();
    }
    
    // Execute loading stages
    function executeLoadingStage() {
        if (stageIndex >= loadingStages.length) {
            // Loading complete
            setTimeout(() => {
                clearInterval(particleInterval);
                clearInterval(tipInterval);
                
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 800);
            }, 500);
            return;
        }
        
        const stage = loadingStages[stageIndex];
        
        // Update loading text
        if (loadingText) {
            loadingText.textContent = stage.text;
        }
        
        // Animate progress
        animateProgress(stage.progress, stage.duration);
        
        // Move to next stage
        setTimeout(() => {
            stageIndex++;
            executeLoadingStage();
        }, stage.duration + 200);
    }
    
    // Start loading sequence after a short delay
    setTimeout(() => {
        executeLoadingStage();
    }, 500);
    
    // Create initial particles
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            createLoadingParticle();
        }, i * 100);
    }
});

// Custom Cursor
document.addEventListener('DOMContentLoaded', function() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (cursor && cursorFollower) {
        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        });
        
        function animateFollower() {
            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;
            
            cursorFollower.style.left = followerX + 'px';
            cursorFollower.style.top = followerY + 'px';
            
            requestAnimationFrame(animateFollower);
        }
        
        animateFollower();
        
        // Hide cursor on mobile
        if (window.innerWidth <= 768) {
            cursor.style.display = 'none';
            cursorFollower.style.display = 'none';
        }
    }
});

// Header Scroll Effect
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(13, 13, 13, 0.98)';
    } else {
        header.style.background = 'rgba(13, 13, 13, 0.95)';
    }
});

// Mobile Navigation
document.addEventListener('DOMContentLoaded', function() {
    const mobileToggle = document.getElementById('mobileToggle');
    const nav = document.getElementById('nav');
    
    if (mobileToggle && nav) {
        mobileToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
    }
});

// Smooth Scrolling for Navigation Links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active nav link
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
});

// Hero Particles Animation
document.addEventListener('DOMContentLoaded', function() {
    const heroParticles = document.getElementById('heroParticles');
    
    if (heroParticles) {
        function createParticle() {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
            particle.style.opacity = Math.random() * 0.5 + 0.2;
            
            heroParticles.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 5000);
        }
        
        // Create particles periodically
        setInterval(createParticle, 300);
    }
});

// Features Tabs
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));
            
            // Add active class to clicked button and corresponding panel
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
});

// System Requirements Tabs
document.addEventListener('DOMContentLoaded', function() {
    const reqTabs = document.querySelectorAll('.req-tab');
    const reqPanels = document.querySelectorAll('.req-panel');
    
    reqTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetReq = this.getAttribute('data-req');
            
            // Remove active class from all tabs and panels
            reqTabs.forEach(t => t.classList.remove('active'));
            reqPanels.forEach(panel => panel.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding panel
            this.classList.add('active');
            document.getElementById(targetReq).classList.add('active');
        });
    });
});

// Scroll Animations (AOS-like effect)
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animationType = element.getAttribute('data-aos');
                const delay = element.getAttribute('data-aos-delay') || 0;
                
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, delay);
                
                observer.unobserve(element);
            }
        });
    });
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        observer.observe(element);
    });
});

// Download Button Click Handler
document.addEventListener('DOMContentLoaded', function() {
    const downloadBtns = document.querySelectorAll('.download-btn, .btn-primary');
    
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#' || this.getAttribute('href') === '#download') {
                e.preventDefault();
                
                // Show download modal or redirect to actual download
                alert('Скачивание начнется в ближайшее время. Следите за обновлениями в Discord!');
            }
        });
    });
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroVideo = document.querySelector('.hero-video');
    const heroContent = document.querySelector('.hero-content');
    
    if (heroVideo) {
        heroVideo.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
});

// Add particle effect to hero section
document.addEventListener('DOMContentLoaded', function() {
    const heroParticles = document.getElementById('heroParticles');
    
    if (heroParticles) {
        // Create floating particles
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                createFloatingParticle();
            }, i * 100);
        }
        
        function createFloatingParticle() {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = Math.random() * 4 + 2 + 'px';
            particle.style.height = particle.style.width;
            particle.style.background = '#c41e1e';
            particle.style.borderRadius = '50%';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.opacity = Math.random() * 0.5 + 0.2;
            particle.style.boxShadow = '0 0 10px rgba(196, 30, 30, 0.8)';
            particle.style.animation = `float ${Math.random() * 10 + 10}s linear infinite`;
            
            heroParticles.appendChild(particle);
            
            // Remove particle after animation
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 20000);
        }
        
        // Continuously create new particles
        setInterval(createFloatingParticle, 500);
    }
});

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    .particle {
        position: absolute;
        pointer-events: none;
        z-index: 1;
    }
    
    @media (max-width: 768px) {
        .nav.active {
            display: flex;
            position: fixed;
            top: 80px;
            left: 0;
            right: 0;
            background: rgba(13, 13, 13, 0.98);
            flex-direction: column;
            padding: 20px;
            border-top: 1px solid var(--border);
        }
        
        .mobile-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .mobile-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    }
`;
document.head.appendChild(style);

// Server monitoring (index page) — дані з online.json через mta_players.php (оновлює MTA → update_online.php)
document.addEventListener('DOMContentLoaded', function() {
    const server1Online = document.getElementById('server1Online');
    const server1Dot = document.getElementById('server1Dot');
    const playersPillText = document.querySelector('.hero-players-pill__text');
    const playersPillDot = document.querySelector('.hero-players-pill__dot');

    if (!server1Online || !server1Dot) {
        return;
    }

    const statsUrl = new URL('mta_players.php', window.location.href).href;

    const readOnlineFlag = (value) => {
        if (value === true || value === 1) {
            return true;
        }
        if (value === false || value === 0) {
            return false;
        }
        if (typeof value === 'string') {
            const s = value.toLowerCase();
            if (s === 'true' || s === '1' || s === 'yes') {
                return true;
            }
            if (s === 'false' || s === '0' || s === 'no' || s === '') {
                return false;
            }
        }
        return Boolean(value);
    };

    const setOfflineState = () => {
        server1Online.textContent = 'Сервер вимкнений';
        server1Online.classList.add('server-monitor__count--offline');
        server1Dot.classList.remove('online');
        if (playersPillDot) {
            playersPillDot.classList.add('is-offline');
        }
        if (playersPillText) {
            playersPillText.innerHTML = '<strong>Сервер вимкнений</strong>';
        }
    };

    const applyServerData = (data) => {
        const players = Number.isFinite(Number(data.players)) ? Number(data.players) : 0;
        const maxPlayers = Number.isFinite(Number(data.maxPlayers)) ? Number(data.maxPlayers) : 0;
        const isOnline = readOnlineFlag(data.online);

        if (!isOnline) {
            setOfflineState();
            return;
        }

        server1Online.classList.remove('server-monitor__count--offline');
        server1Dot.classList.add('online');
        if (maxPlayers > 0) {
            server1Online.textContent = `Онлайн ${players}/${maxPlayers}`;
        } else {
            server1Online.textContent = 'Онлайн';
        }

        if (playersPillDot) {
            playersPillDot.classList.remove('is-offline');
        }
        if (playersPillText) {
            playersPillText.innerHTML = `<strong>Онлайн</strong> · ${players} у грі`;
        }
    };

    const fetchServerStats = async () => {
        try {
            const response = await fetch(statsUrl, { cache: 'no-store' });
            if (!response.ok) {
                setOfflineState();
                return;
            }
            const data = await response.json();
            applyServerData(data);
        } catch (error) {
            setOfflineState();
        }
    };

    fetchServerStats();
    setInterval(fetchServerStats, 30000);
});

// Entertainment Slider
let currentSlideIndex = 1;

function showSlide(n) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    if (n > slides.length) { currentSlideIndex = 1; }
    if (n < 1) { currentSlideIndex = slides.length; }
    
    // Hide all slides
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Show current slide
    if (slides[currentSlideIndex - 1]) {
        slides[currentSlideIndex - 1].classList.add('active');
    }
    if (dots[currentSlideIndex - 1]) {
        dots[currentSlideIndex - 1].classList.add('active');
    }
}

function changeSlide(n) {
    currentSlideIndex += n;
    showSlide(currentSlideIndex);
}

function currentSlide(n) {
    currentSlideIndex = n;
    showSlide(currentSlideIndex);
}

// Auto-play slider
document.addEventListener('DOMContentLoaded', function() {
    // Start auto-play after page load
    setInterval(() => {
        changeSlide(1);
    }, 4000); // Change slide every 4 seconds
    
    // Initialize first slide
    showSlide(currentSlideIndex);
});
// Donate Form Functionality
document.addEventListener('DOMContentLoaded', function() {
    const amountInput = document.getElementById('amount');
    const resultValue = document.getElementById('resultValue');
    const amountBtns = document.querySelectorAll('.amount-buttons button');
    const donateForm = document.getElementById('donateForm');
    const playerIdInput = document.getElementById('playerId');
    const playerDisplay = document.getElementById('playerDisplay');
    const changePlayerBtn = document.getElementById('changePlayer');
    const playerNicknameDiv = document.getElementById('playerNickname');
    const btnPay = document.querySelector('.btn-pay');

    // Проверяем, что мы на странице доната
    if (!amountInput || !playerIdInput) return;

    const RATE = 1;
    const BONUS_MIN = 500;
    const BONUS = 0.1;

    let playerVerified = false;
    let playerNickname = '';
    let currentPlayerId = null;
    let checkTimeout = null;

    function updateResult() {
        const amount = parseInt(amountInput.value) || 0;
        let result = amount * RATE;
        if (amount >= BONUS_MIN) result = Math.floor(result * (1 + BONUS));
        resultValue.textContent = result.toLocaleString('ru-RU') + ' реалов';
    }

    function enableDonateForm(enable) {
        amountInput.disabled = !enable;
        amountBtns.forEach(btn => btn.disabled = !enable);
        btnPay.disabled = !enable;
    }

    function showPlayerDisplay(nickname, id) {
        playerIdInput.style.display = 'none';
        playerDisplay.value = `${nickname} (${id})`;
        playerDisplay.style.display = 'block';
        changePlayerBtn.style.display = 'flex';
        playerNicknameDiv.style.display = 'none';
    }

    function showIdInput() {
        playerIdInput.style.display = 'block';
        playerIdInput.value = '';
        playerDisplay.style.display = 'none';
        changePlayerBtn.style.display = 'none';
        playerNicknameDiv.style.display = 'block';
        playerNicknameDiv.textContent = '';
        playerVerified = false;
        playerNickname = '';
        currentPlayerId = null;
        enableDonateForm(false);
        playerIdInput.focus();
    }

    // Кнопка смены игрока
    if (changePlayerBtn) {
        changePlayerBtn.addEventListener('click', showIdInput);
    }

    // Автоматическая проверка ID при вводе
    async function checkPlayerId(playerId) {
        if (!playerId || playerId < 1) {
            playerNicknameDiv.textContent = '';
            playerNicknameDiv.className = 'player-nickname';
            playerVerified = false;
            enableDonateForm(false);
            return;
        }
        
        playerNicknameDiv.textContent = 'Проверяем...';
        playerNicknameDiv.className = 'player-nickname';
        
        try {
            const response = await fetch(`api/check-player.php?id=${playerId}`);
            const data = await response.json();
            
            if (data.success && data.nickname) {
                playerNickname = data.nickname;
                currentPlayerId = playerId;
                playerVerified = true;
                showPlayerDisplay(data.nickname, playerId);
                enableDonateForm(true);
                playerNicknameDiv.textContent = `✓ ${data.nickname}`;
                playerNicknameDiv.className = 'player-nickname success';
            } else {
                playerVerified = false;
                playerNicknameDiv.textContent = data.error || 'Игрок не найден';
                playerNicknameDiv.className = 'player-nickname error';
                enableDonateForm(false);
            }
        } catch (error) {
            playerVerified = false;
            playerNicknameDiv.textContent = 'Ошибка проверки';
            playerNicknameDiv.className = 'player-nickname error';
            enableDonateForm(false);
        }
    }

    // Проверка с задержкой при вводе
    playerIdInput.addEventListener('input', () => {
        playerVerified = false;
        playerNickname = '';
        enableDonateForm(false);
        
        clearTimeout(checkTimeout);
        
        const playerId = playerIdInput.value;
        if (playerId && playerId >= 1) {
            checkTimeout = setTimeout(() => {
                checkPlayerId(playerId);
            }, 500); // Задержка 500мс
        } else {
            playerNicknameDiv.textContent = '';
            playerNicknameDiv.className = 'player-nickname';
        }
    });

    // Обновление результата при изменении суммы
    if (amountInput) {
        amountInput.addEventListener('input', () => {
            updateResult();
            amountBtns.forEach(btn => btn.classList.remove('active'));
        });
    }

    // Кнопки быстрого выбора суммы
    amountBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.disabled) return;
            amountInput.value = btn.dataset.amount;
            updateResult();
            amountBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Отправка формы
    if (donateForm) {
        donateForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            if (!playerVerified || !currentPlayerId) {
                alert('Сначала введи корректный ID');
                return;
            }
            
            const amount = amountInput.value;
            
            if (!amount || amount < 50) {
                alert('Минимальная сумма: 50₽');
                return;
            }
            
            btnPay.disabled = true;
            btnPay.textContent = 'Создаём платёж...';
            
            try {
                const formData = new FormData();
                formData.append('player_id', currentPlayerId);
                formData.append('amount', amount);
                
                const response = await fetch('api/create-payment.php', {
                    method: 'POST',
                    body: formData
                });
                
                const data = await response.json();
                
                if (data.success && data.payment_url) {
                    window.location.href = data.payment_url;
                } else {
                    alert(data.error || 'Ошибка создания платежа');
                    btnPay.disabled = false;
                    btnPay.textContent = 'ПОПОЛНИТЬ БАЛАНС';
                }
            } catch (error) {
                alert('Ошибка соединения');
                btnPay.disabled = false;
                btnPay.textContent = 'ПОПОЛНИТЬ БАЛАНС';
            }
        });
    }

    // Инициализация
    enableDonateForm(false);
    updateResult();
});