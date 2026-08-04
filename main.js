/* ==========================================================================
   GLASS UI PORTFOLIO - CORE ENGINE & SCROLLANIMATION
   ========================================================================== */

(function () {
    'use strict';

    // Configuration Constants
    const TOTAL_FRAMES = 240;
    const FRAME_DIR = 'frames';
    const FRAME_PREFIX = 'ezgif-frame-';
    const FRAME_EXT = '.jpg';

    // DOM Elements
    const canvas = document.getElementById('animation-canvas');
    const ctx = canvas.getContext('2d');
    const preloader = document.getElementById('preloader');
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    const cursorGlow = document.getElementById('cursor-glow');
    const audioToggleBtn = document.getElementById('audio-toggle');
    const projectModal = document.getElementById('project-modal');
    const modalContent = document.getElementById('modal-content');
    const closeModalBtn = document.getElementById('close-modal');

    // State Variables
    const images = [];
    let loadedFrames = 0;
    let targetFrame = 1;
    let currentFrame = 1;
    let isPreloadingComplete = false;
    let audioContext = null;
    let synthGainNode = null;
    let isAudioPlaying = false;

    // Projects Database (Seyam Bhuiyan — Flutter Developer Portfolio)
    const projectsData = {
        p1: {
            title: "Flutter E-Commerce Mobile App",
            badge: "Flutter Mobile App",
            gradient: "p-gradient-1",
            icon: "🛍️",
            description: "Cross-platform mobile e-commerce application engineered with Flutter, Dart, BLoC state management, payment gateway integration, and liquid glass UI.",
            features: [
                "Single codebase for iOS & Android delivering native 60fps performance",
                "Clean BLoC architecture for reactive state management & separation of concerns",
                "REST API integration, product search, cart persistence, and payment gateway checkout"
            ],
            tech: ["Flutter", "Dart", "BLoC", "REST API", "iOS & Android"],
            demoUrl: "https://github.com/seyam-bhuiyan",
            githubUrl: "https://github.com/seyam-bhuiyan"
        },
        p2: {
            title: "Real-Time Chat & Social App",
            badge: "Flutter & Firebase",
            gradient: "p-gradient-2",
            icon: "💬",
            description: "Real-time messaging and social feed mobile app built with Flutter, Firebase Authentication, Cloud Firestore, and FCM push notifications.",
            features: [
                "Real-time message streaming powered by Firestore change listeners",
                "Firebase Authentication (Google & Email) with user profile management",
                "Cloud Storage image uploads, push notification triggers, and offline caching"
            ],
            tech: ["Flutter", "Dart", "Firebase", "Cloud Firestore", "FCM Notifications"],
            demoUrl: "https://github.com/seyam-bhuiyan",
            githubUrl: "https://github.com/seyam-bhuiyan"
        },
        p3: {
            title: "Flutter Utility & Analytics App",
            badge: "Flutter Dashboard",
            gradient: "p-gradient-3",
            icon: "📊",
            description: "High-performance productivity dashboard app featuring interactive charts, fluid animations, dark glass theme, and local SQLite caching.",
            features: [
                "Interactive custom painted charts and financial tracking metrics",
                "Provider / Riverpod state management for fast state propagation",
                "Dark mode & light mode dynamic glass layout adjustments"
            ],
            tech: ["Flutter", "Dart", "Provider", "SQLite", "Charts"],
            demoUrl: "https://github.com/seyam-bhuiyan",
            githubUrl: "https://github.com/seyam-bhuiyan"
        },
        p4: {
            title: "Java & MySQL Database System",
            badge: "Backend & MySQL",
            gradient: "p-gradient-4",
            icon: "☕",
            description: "Full-stack backend & desktop management system engineered with Java Object-Oriented Programming and robust MySQL database architecture.",
            features: [
                "Secure MySQL relational schema with index optimization",
                "Java JDBC database connectivity and transaction safety",
                "Clean UI design and automated reporting"
            ],
            tech: ["Java", "MySQL", "JDBC", "Data Structures"],
            demoUrl: "https://github.com/seyam-bhuiyan",
            githubUrl: "https://github.com/seyam-bhuiyan"
        }
    };

    // Initialize Application
    function init() {
        setupCanvasSize();
        preloadFrames();
        setupScrollListener();
        setupMouseEvents();
        setupProjectFilters();
        setupModalEvents();
        setupAudioSynth();
        
        window.addEventListener('resize', handleResize);
    }

    // 1. Frame Preloading Engine
    function preloadFrames() {
        for (let i = 1; i <= TOTAL_FRAMES; i++) {
            const img = new Image();
            const frameNum = String(i).padStart(3, '0');
            img.src = `${FRAME_DIR}/${FRAME_PREFIX}${frameNum}${FRAME_EXT}`;
            
            img.onload = () => {
                loadedFrames++;
                updatePreloaderProgress();
                if (loadedFrames === TOTAL_FRAMES) {
                    onAllFramesLoaded();
                }
            };

            img.onerror = () => {
                console.warn(`Failed to load frame ${i}, retrying...`);
                loadedFrames++;
                updatePreloaderProgress();
                if (loadedFrames === TOTAL_FRAMES) {
                    onAllFramesLoaded();
                }
            };

            images[i] = img;
        }
    }

    function updatePreloaderProgress() {
        const pct = Math.floor((loadedFrames / TOTAL_FRAMES) * 100);
        progressBar.style.width = `${pct}%`;
        progressText.innerText = `${pct}% Loaded (${loadedFrames} / ${TOTAL_FRAMES} Frames)`;
    }

    function onAllFramesLoaded() {
        isPreloadingComplete = true;
        
        // Hide preloader with smooth fade out
        setTimeout(() => {
            preloader.classList.add('fade-out');
            drawFrame(1);
            startRenderLoop();
        }, 300);
    }

    // 2. Canvas Sizing & Responsive Frame Renderer
    function setupCanvasSize() {
        canvas.width = window.innerWidth * window.devicePixelRatio;
        canvas.height = window.innerHeight * window.devicePixelRatio;
    }

    function handleResize() {
        setupCanvasSize();
        drawFrame(Math.round(currentFrame));
    }

    function drawFrame(frameIndex) {
        if (!images[frameIndex] || !images[frameIndex].complete) return;

        const img = images[frameIndex];
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        // Enable high quality bicubic image smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // Draw image using 'object-fit: cover' aspect ratio math
        const imgRatio = img.width / img.height;
        const canvasRatio = canvasWidth / canvasHeight;

        let drawWidth, drawHeight, offsetX, offsetY;

        if (canvasRatio > imgRatio) {
            drawWidth = canvasWidth;
            drawHeight = canvasWidth / imgRatio;
            offsetX = 0;
            offsetY = (canvasHeight - drawHeight) / 2;
        } else {
            drawWidth = canvasHeight * imgRatio;
            drawHeight = canvasHeight;
            offsetX = (canvasWidth - drawWidth) / 2;
            offsetY = 0;
        }

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    }

    // 3. Scroll Controller & Lerp Animation Engine
    function setupScrollListener() {
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            
            if (maxScroll <= 0) return;
            
            const scrollRatio = Math.min(Math.max(scrollTop / maxScroll, 0), 1);
            
            // Map scroll ratio [0.0 - 1.0] to frame indices [1 - 300]
            targetFrame = Math.round(scrollRatio * (TOTAL_FRAMES - 1)) + 1;
            
            updateActiveNav();
        }, { passive: true });
    }

    function startRenderLoop() {
        function render() {
            // Linear Interpolation (Lerp) for silky smooth scrolling
            const diff = targetFrame - currentFrame;
            
            if (Math.abs(diff) > 0.01) {
                currentFrame += diff * 0.12;
                drawFrame(Math.round(currentFrame));
            }
            
            requestAnimationFrame(render);
        }
        requestAnimationFrame(render);
    }

    // Update active navbar link on scroll
    function updateActiveNav() {
        const sections = document.querySelectorAll('.content-section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSectionId = 'hero';
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.2) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }

    // 4. Interactive Mouse Effects (Light Glow & 3D Tilt)
    function setupMouseEvents() {
        // Cursor Light Glow Follower
        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = `${e.clientX}px`;
            cursorGlow.style.top = `${e.clientY}px`;
        });

        // 3D Card Tilt Effect on Mouse Movement
        const tiltElements = document.querySelectorAll('.tilt-element');
        
        tiltElements.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = ((y - centerY) / centerY) * -6; // max -6deg to 6deg
                const rotateY = ((x - centerX) / centerX) * 6;  // max -6deg to 6deg
                
                el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
            });

            el.addEventListener('mouseleave', () => {
                el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
            });
        });
    }

    // 5. Project Filtering & Modal Handler
    function setupProjectFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');

                projectCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    if (filter === 'all' || category === filter) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    function setupModalEvents() {
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('click', () => {
                const projectId = card.getAttribute('data-id');
                const data = projectsData[projectId];
                if (data) {
                    openModal(data);
                }
            });
        });

        closeModalBtn.addEventListener('click', closeModal);
        projectModal.addEventListener('click', (e) => {
            if (e.target === projectModal) closeModal();
        });
    }

    function openModal(data) {
        modalContent.innerHTML = `
            <div class="project-badge" style="position: static; display: inline-block; margin-bottom: 12px;">${data.badge}</div>
            <h2 style="font-size: 2rem; margin-bottom: 16px; color: #fff;">${data.title}</h2>
            <div class="project-placeholder ${data.gradient}" style="height: 200px; border-radius: 16px; margin-bottom: 24px;">
                <span class="p-icon" style="font-size: 4rem;">${data.icon}</span>
            </div>
            <p style="font-size: 1.05rem; margin-bottom: 20px; line-height: 1.6;">${data.description}</p>
            
            <h4 style="font-size: 1.1rem; color: #fff; margin-bottom: 10px;">Key Features:</h4>
            <ul style="list-style-type: none; margin-bottom: 24px;">
                ${data.features.map(f => `<li style="margin-bottom: 8px; color: rgba(255,255,255,0.8); display: flex; gap: 8px;"><span style="color: var(--accent-glow)">✦</span> ${f}</li>`).join('')}
            </ul>

            <h4 style="font-size: 1.1rem; color: #fff; margin-bottom: 10px;">Technologies Used:</h4>
            <div class="skill-tags" style="margin-bottom: 28px;">
                ${data.tech.map(t => `<span class="glass-chip">${t}</span>`).join('')}
            </div>

            <div style="display: flex; gap: 16px;">
                <a href="${data.demoUrl}" class="glass-btn primary-btn" onclick="alert('Live demo simulation initialized!')">Live Preview</a>
                <a href="${data.githubUrl}" class="glass-btn secondary-btn" onclick="alert('GitHub repository repository view requested!')">Source Code</a>
            </div>
        `;
        projectModal.classList.remove('hidden');
    }

    function closeModal() {
        projectModal.classList.add('hidden');
    }

    // 6. Web Audio API Lo-Fi Ambient Synthesizer
    function setupAudioSynth() {
        if (!audioToggleBtn) return;
        audioToggleBtn.addEventListener('click', () => {
            if (!audioContext) {
                initAudioContext();
            }

            if (audioContext.state === 'suspended') {
                audioContext.resume();
            }

            isAudioPlaying = !isAudioPlaying;
            
            const iconOff = audioToggleBtn.querySelector('.sound-off');
            const iconOn = audioToggleBtn.querySelector('.sound-on');

            if (isAudioPlaying) {
                synthGainNode.gain.setTargetAtTime(0.15, audioContext.currentTime, 0.1);
                iconOff.classList.add('hidden');
                iconOn.classList.remove('hidden');
                audioToggleBtn.querySelector('.audio-label').innerText = 'Audio: ON';
            } else {
                synthGainNode.gain.setTargetAtTime(0, audioContext.currentTime, 0.1);
                iconOff.classList.remove('hidden');
                iconOn.classList.add('hidden');
                audioToggleBtn.querySelector('.audio-label').innerText = 'Ambient Audio';
            }
        });
    }

    function initAudioContext() {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioContext = new AudioContext();

        synthGainNode = audioContext.createGain();
        synthGainNode.gain.setValueAtTime(0, audioContext.currentTime);

        // Low-pass filter for smooth ambient pad sound
        const filter = audioContext.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(420, audioContext.currentTime);

        // Ambient Lo-Fi chord frequencies (A minor 9: A3, C4, E4, G4, B4)
        const freqs = [220, 261.63, 329.63, 392.00, 493.88];

        freqs.forEach(freq => {
            const osc = audioContext.createOscillator();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, audioContext.currentTime);
            
            // Subtly detune for warm analog feel
            osc.detune.setValueAtTime((Math.random() - 0.5) * 15, audioContext.currentTime);
            
            osc.connect(filter);
            osc.start();
        });

        filter.connect(synthGainNode);
        synthGainNode.connect(audioContext.destination);
    }

    // Global form submission handler
    window.handleFormSubmit = function() {
        const formStatus = document.getElementById('form-status');
        const submitBtn = document.getElementById('submit-btn');
        
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>Sending...</span>`;

        setTimeout(() => {
            formStatus.innerText = "✨ Thank you! Your message has been sent successfully. Alex will reply shortly.";
            formStatus.className = "form-status success";
            submitBtn.disabled = false;
            submitBtn.innerHTML = `<span>Send Message</span>`;
            document.getElementById('contact-form').reset();
        }, 1200);
    };

    // Run Initialization on DOM Ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
