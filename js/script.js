// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}

// Header scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Project Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    // Define image mappings for each project
    const projectImages = {
        'Modern Hillside Villa': 'images/img/arc1.jpg',
        'Urban Office Tower': 'images/img/arc2.jpg',
        'Community Arts Center': 'images/img/arc3.jpg',
        'Lakeside Retreat': 'images/img/arc4.jpg'
    };
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter and display projects
            projectItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    item.style.display = 'grid';
                    item.style.animation = 'fadeIn 0.5s ease-in';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});

// Current page navigation highlighting
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

// Typing Animation
document.addEventListener('DOMContentLoaded', function() {
    const typingText = document.getElementById('typing-text');
    const cursor = document.getElementById('cursor');
    const descriptionSection = document.querySelector('.description-section');

    if (typingText && cursor && descriptionSection) {
        function typeAnimation() {
            const text = [
                "Experience the Future of Design & Architecture",
                "Imagine a studio where creativity and precision unite,",
                "where visionary architects and expert 3D visualizers",
                "craft immersive designs that inspire and engage.",
                "Discover Evadara —",
                "Transforming how the world experiences architecture"
            ];
            
            typingText.style.opacity = '1';
            let pIndex = 0;
            let charIndex = 0;

            function type() {
                if (pIndex < text.length) {
                    let p = typingText.querySelector(`p:nth-child(${pIndex + 1})`);
                    if (!p) {
                        p = document.createElement('p');
                        typingText.appendChild(p);
                        if (pIndex === 4) p.classList.add('tagline');
                        if (pIndex === 5) p.classList.add('tagline-subtitle');
                    }

                    if (charIndex < text[pIndex].length) {
                        p.innerHTML += text[pIndex].charAt(charIndex);
                        charIndex++;
                        setTimeout(type, 50);
                    } else {
                        pIndex++;
                        charIndex = 0;
                        setTimeout(type, 500);
                    }
                } else {
                    cursor.style.display = 'none';
                    const descriptionContainer = document.querySelector('.description-section .container');
                    if (descriptionContainer) {
                        descriptionContainer.classList.add('border-active');
                    }
                }
            }
            type();
        }

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeAnimation();
                    observer.unobserve(descriptionSection);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(descriptionSection);
    }
});

// Initialize Gallery
function initGallery() {
    const gallerySection = document.querySelector('.gallery-section');
    if (!gallerySection) return;

    // Gallery images array
    const galleryImages = [
        {
            src: 'images/img/arc0.webp',
            alt: 'Modern Villa Architecture',
            caption: 'Modern Villa Architecture'
        },
        {
            src: 'images/img/arc2.webp',
            alt: 'Commercial Complex Design',
            caption: 'Commercial Complex Design'
        },
        {
            src: 'images/img/arc3.webp',
            alt: 'Urban Renewal Project',
            caption: 'Urban Renewal Project'
        },
        {
            src: 'images/img/arc4.webp',
            alt: 'Lakeside Retreat',
            caption: 'Lakeside Retreat'
        },
        {
            src: 'images/img/arc5.jpg',
            alt: 'Skyline Tower',
            caption: 'Skyline Tower'
        },
        {
            src: 'images/img/arc6.jpg',
            alt: 'Interior Design Concept',
            caption: 'Interior Design Concept'
        },
        {
            src: 'images/img/arc7.jpg',
            alt: 'Landscape Architecture',
            caption: 'Landscape Architecture'
        },
        {
            src: 'images/img/arc8.jpg',
            alt: 'Urban Planning',
            caption: 'Urban Planning'
        },
        {
            src: 'images/img/arc9.jpg',
            alt: 'Contemporary Design',
            caption: 'Contemporary Design'
        },
        {
            src: 'images/img/arc10.webp',
            alt: 'Architectural Innovation',
            caption: 'Architectural Innovation'
        }
    ];

    // Create gallery grid HTML
    const galleryGrid = document.querySelector('.gallery-grid');
    if (!galleryGrid) return;

    galleryImages.forEach((image, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.setAttribute('data-index', index);

        const img = document.createElement('img');
        img.src = image.src;
        img.alt = image.alt;
        img.loading = 'lazy';

        item.appendChild(img);

        // Click to open lightbox
        item.addEventListener('click', () => {
            openLightbox(index, galleryImages);
        });

        galleryGrid.appendChild(item);
    });

    console.log('Gallery initialized with', galleryImages.length, 'images');
}

// Lightbox functionality
function openLightbox(startIndex, images) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');

    if (!lightbox) return;

    let currentIndex = startIndex;

    function updateLightbox() {
        const image = images[currentIndex];
        lightboxImage.src = image.src;
        lightboxCaption.textContent = image.caption;
    }

    function openBox() {
        updateLightbox();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeBox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateLightbox();
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        updateLightbox();
    }

    // Event listeners
    lightboxClose.addEventListener('click', closeBox);
    lightboxPrev.addEventListener('click', prevImage);
    lightboxNext.addEventListener('click', nextImage);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeBox();
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeBox();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'ArrowRight') nextImage();
    });

    openBox();
}

// Testimonial Carousel
function initTestimonialCarousel() {
    const carousel = document.querySelector('.testimonial-carousel');
    if (!carousel) return;

    const slides = carousel.querySelectorAll('.carousel-slide');
    const prevBtn = carousel.querySelector('.prev-btn');
    const nextBtn = carousel.querySelector('.next-btn');
    const indicators = carousel.querySelectorAll('.indicator');
    
    let currentSlide = 0;

    function updateCarousel() {
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentSlide);
        });
        
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateCarousel();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateCarousel();
    }

    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentSlide = index;
            updateCarousel();
        });
    });

    // Auto-play
    setInterval(nextSlide, 5000);
}

// ===== NEW ENHANCEMENTS =====

// Video Optimization and Loading Management
function optimizeHeroVideo() {
    const hero = document.querySelector('.hero');
    const video = document.querySelector('.hero-video');
    
    if (!video) return;
    
    // Create loading spinner
    const spinner = document.createElement('div');
    spinner.className = 'video-loading-spinner';
    hero.appendChild(spinner);
    
    // Video loading states
    video.addEventListener('loadstart', function() {
        hero.classList.add('video-loading');
    });
    
    video.addEventListener('canplay', function() {
        hero.classList.remove('video-loading');
        hero.classList.remove('video-error');
    });
    
    video.addEventListener('error', function() {
        hero.classList.remove('video-loading');
        hero.classList.add('video-error');
        console.log('Video failed to load, using fallback background');
    });
    
    // Video preloading optimization
    video.preload = 'metadata';
    video.playsInline = true;
    video.muted = true;
    video.setAttribute('webkit-playsinline', 'true');
    
    // Lazy load video for mobile
    if (window.innerWidth <= 768) {
        video.src = ''; // Clear src for mobile
        video.poster = 'images/hero-poster.jpg'; // Add a poster frame
    }
}

// Scroll Progress Indicator
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const winHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight - winHeight;
        const scrolled = (window.pageYOffset / docHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Text Reveal Animation on Scroll
function initTextReveal() {
    const revealElements = document.querySelectorAll('.text-reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
}

// Staggered Animation for Grid Items
function initStaggerAnimations() {
    const staggerElements = document.querySelectorAll('.stagger-item');
    
    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });
    
    staggerElements.forEach(element => {
        staggerObserver.observe(element);
    });
}

// Magnetic Button Effect
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.cta-button, .carousel-btn');
    
    buttons.forEach(button => {
        if (window.innerWidth > 768) { // Only on desktop
            button.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const angleX = (y - centerY) / 10;
                const angleY = (centerX - x) / 10;
                
                this.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.05, 1.05, 1.05)`;
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            });
        }
    });
}

// Device and Connection Testing
function testDeviceCapabilities() {
    const connection = navigator.connection;
    const isMobile = window.innerWidth <= 768;
    const isSlowConnection = connection ? (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') : false;
    
    // Adjust video quality based on connection
    const video = document.querySelector('.hero-video');
    if (video && (isMobile || isSlowConnection)) {
        // Use lower quality video or poster image
        if (isSlowConnection) {
            video.style.display = 'none';
            document.querySelector('.hero').classList.add('video-error');
        }
    }
    
    console.log('Device Test:', {
        isMobile,
        isSlowConnection,
        effectiveType: connection ? connection.effectiveType : 'unknown',
        width: window.innerWidth,
        height: window.innerHeight
    });
}

// Responsive Video Handler
function handleResponsiveVideo() {
    const video = document.querySelector('.hero-video');
    if (!video) return;
    
    function updateVideoSource() {
        if (window.innerWidth <= 768) {
            // Use optimized mobile video or poster
            if (!video.getAttribute('data-mobile-loaded')) {
                video.poster = 'images/hero-mobile-poster.jpg';
                video.setAttribute('data-mobile-loaded', 'true');
            }
        } else {
            // Ensure desktop video loads
            if (video.src === '' && video.getAttribute('data-src')) {
                video.src = video.getAttribute('data-src');
            }
        }
    }
    
    // Initial check
    updateVideoSource();
    
    // Check on resize
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(updateVideoSource, 250);
    });
}

// Enhanced GSAP Animations
function initEnhancedGSAPAnimations() {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        
        // Enhanced hero section animations
        gsap.to(".hero-content", {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: "power3.out"
        });
        
        // Parallax effect for description section
        gsap.to(".description-section", {
            backgroundPosition: "50% 100%",
            ease: "none",
            scrollTrigger: {
                trigger: ".description-section",
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
        
        // Enhanced testimonial animations
        gsap.utils.toArray('.testimonial-card').forEach((card, i) => {
            gsap.fromTo(card, {
                opacity: 0,
                scale: 0.8
            }, {
                opacity: 1,
                scale: 1,
                duration: 0.8,
                scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
        });
        
        // Floating animation for design cards
        gsap.to(".adv-leaf-horizontal", {
            y: -10,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        // Enhanced navigation scroll effect
        gsap.to(".navbar", {
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
            duration: 0.3,
            scrollTrigger: {
                trigger: "body",
                start: "50px top",
                end: "bottom top",
                toggleActions: "play reverse play reverse"
            }
        });
    }
}

// Hero text rectangular reveal (hide during playback, reveal after video ends)
function initHeroTextReveal() {
    const video = document.querySelector('.hero-video');
    const heroContent = document.querySelector('.hero-content');
    if (!video || !heroContent) return;

    // Hide text when video begins playing
    const hideText = () => {
        // Only hide text when the page is near the top (prevents hiding during scroll)
        if (window.scrollY > 50) {
            // if user has scrolled down, keep text visible
            heroContent.classList.remove('text-hidden');
            heroContent.classList.add('revealed');
            return;
        }

        heroContent.classList.add('text-hidden');
        heroContent.classList.remove('revealed');
        // reset any inline transitionDelay set previously
        heroContent.querySelectorAll('h1, p, .cta-button').forEach(el => {
            el.style.transition = '';
        });
    };

    // Reveal text with sequential staggered animation
    const revealText = () => {
        const items = heroContent.querySelectorAll('h1, p, .cta-button');
        // Set staggered transition delays
        items.forEach((el, i) => {
            const delay = i * 0.12; // stagger by 120ms
            el.style.transition = `opacity 0.7s ease ${delay}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s`;
        });

        // trigger reveal
        heroContent.classList.remove('text-hidden');
        // force reflow
        void heroContent.offsetWidth;
        heroContent.classList.add('revealed');
    };

    video.addEventListener('playing', hideText);
    video.addEventListener('play', hideText);

    video.addEventListener('ended', revealText);

    // Fallback for browsers or looped videos: reveal near the end
    video.addEventListener('timeupdate', function onTime() {
        if (!video.duration || video._heroRevealed) return;
        const remaining = video.duration - video.currentTime;
        if (remaining <= 0.15) {
            video._heroRevealed = true;
            revealText();
            video.removeEventListener('timeupdate', onTime);
        }
    });
}

// Performance Monitoring
function monitorPerformance() {
    // Monitor largest contentful paint
    const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            console.log('LCP:', entry.startTime);
            if (entry.startTime > 2500) {
                console.warn('Slow LCP detected, consider optimizing images/video');
            }
        }
    });
    
    observer.observe({entryTypes: ['largest-contentful-paint']});
    
    // Monitor CLS (Cumulative Layout Shift)
    let clsValue = 0;
    new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
            if (!entry.hadRecentInput) {
                clsValue += entry.value;
                console.log('CLS:', clsValue);
            }
        }
    }).observe({type: 'layout-shift', buffered: true});
}

// Initialize all enhancements
function initEnhancements() {
    optimizeHeroVideo();
    initHeroTextReveal();
    initScrollProgress();
    initTextReveal();
    initStaggerAnimations();
    initMagneticButtons();
    testDeviceCapabilities();
    handleResponsiveVideo();
    initEnhancedGSAPAnimations();
    
    // Only monitor performance in development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        monitorPerformance();
    }
}

// GSAP Animations (only if GSAP is loaded)
function initGSAPAnimations() {
    gsap.registerPlugin(ScrollTrigger);
    
    console.log('Initializing GSAP animations...');

    // Scroll Animation Section (Theme Section)
    const scrollSection = document.querySelector('.scroll-animation-section');
    if (scrollSection) {
        console.log('Initializing scroll animation section');
        
        // Reset all animations first
        gsap.set(".panel", { clearProps: "all" });
        gsap.set(".panel-text", { clearProps: "all" });

        // Set initial states
        gsap.set(".panel", { 
            height: "100%",
            zIndex: (i, target, targets) => targets.length - i 
        });

        gsap.set(".panel-text", { 
            opacity: 0,
            y: "100%",
            zIndex: (i, target, targets) => targets.length - i 
        });

        const panels = gsap.utils.toArray('.panel');
        const texts = gsap.utils.toArray('.panel-text');

        // Create a master timeline for the entire black section
        const masterTL = gsap.timeline({
            scrollTrigger: {
                trigger: ".black-section",
                start: "top top",
                end: "+=400%", // 4 panels * 100% each
                scrub: 1,
                pin: true,
                anticipatePin: 1,
                markers: false,
            }
        });

        // Add panel animations to the master timeline
        panels.forEach((panel, i) => {
            masterTL.to(panel, {
                height: 0,
                duration: 1,
                ease: "power2.inOut"
            }, i);
        });

        // Add text animations to the master timeline
        texts.forEach((text, i) => {
            // Text appears
            masterTL.to(text, {
                opacity: 1,
                y: "0%",
                duration: 0.5,
                ease: "power2.out"
            }, i)
            // Text disappears
            .to(text, {
                opacity: 0,
                y: "-30%",
                duration: 0.5,
                ease: "power2.in"
            }, i + 0.5);
        });

        // Dramatic intro text animation for "Scroll down to experience our design process"
        gsap.to(".orange-section .text", {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".orange-section",
                start: "top 70%",
                end: "bottom 30%",
                toggleActions: "play none none reverse",
                markers: false,
            }
        });

        // Blue section animation
        gsap.to(".blue-section h2", {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".blue-section",
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none none",
                markers: false,
            }
        });

        console.log('Scroll animation section initialized');
    }

    // Horizontal scrolling for featured projects
    const horizontalContainer = document.querySelector('.horizontal-container');
    if (horizontalContainer) {
        const projects = gsap.utils.toArray(".project-card-horizontal");
        if (projects.length > 0) {
            const scrollDistance = (projects.length - 1) * window.innerWidth;
            
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".featured",
                    start: "top top",
                    end: `+=${scrollDistance}`,
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                    snap: {
                        snapTo: 1 / (projects.length - 1),
                        duration: { min: 0.1, max: 0.5 },
                        ease: "power1.inOut"
                    },
                    markers: false,
                }
            });

            tl.to(".horizontal-container", {
                x: () => -((projects.length - 1) * 100) + "vw",
                ease: "none",
                duration: 1
            });

            // Individual project animations
            projects.forEach((project, i) => {
                gsap.fromTo(project,
                    { 
                        opacity: 0.7, 
                        scale: 0.9 
                    },
                    {
                        opacity: 1,
                        scale: 1,
                        scrollTrigger: {
                            trigger: project,
                            start: "left 75%",
                            end: "left 25%",
                            scrub: 1,
                            toggleActions: "play reverse play reverse"
                        }
                    }
                );
            });

            console.log('Horizontal snapping initialized');
        }
    }

    // Gallery animations
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.utils.toArray('.gallery-item').forEach((item, i) => {
            gsap.fromTo(item,
                {
                    opacity: 0,
                    y: 30
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    scrollTrigger: {
                        trigger: item,
                        start: "top 80%",
                        end: "bottom 20%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        console.log('Gallery animations initialized');
    }

    // Testimonial section animations
    const testimonialSection = document.querySelector('.testimonial-section');
    if (testimonialSection) {
        // Animate carousel entrance
        gsap.fromTo('.testimonial-carousel',
            {
                opacity: 0,
                y: 30
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                scrollTrigger: {
                    trigger: '.testimonial-section',
                    start: "top 70%",
                    end: "bottom 30%",
                    toggleActions: "play none none none"
                }
            }
        );
        
        // Animate header
        gsap.fromTo('.testimonial-header h2',
            {
                opacity: 0,
                y: -20
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: '.testimonial-header',
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none none"
                }
            }
        );
    }

    console.log('All GSAP animations initialized successfully');
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing website with enhancements...');
    
    // Initialize gallery
    initGallery();
    
    // Initialize testimonial carousel
    initTestimonialCarousel();

    // Initialize GSAP animations if available
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        initGSAPAnimations();
    }
    
    // Initialize new enhancements
    initEnhancements();
});

// Handle page load completion
window.addEventListener('load', function() {
    console.log('Page fully loaded with all enhancements');
    
    // Remove loading states
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.classList.remove('video-loading');
    }
    
    // Test responsive behavior
    testDeviceCapabilities();
});

// Handle resize events for responsive testing
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        testDeviceCapabilities();
        console.log('Window resized to:', window.innerWidth, 'x', window.innerHeight);
    }, 250);
});

// Handle orientation changes
window.addEventListener('orientationchange', function() {
    setTimeout(testDeviceCapabilities, 100);
});

// Debug info
window.addEventListener('load', function() {
    console.log('Page loaded completely');
    console.log('Grid blocks found:', document.querySelectorAll('.gridBlock').length);
    console.log('Lightbox found:', document.getElementById('lightbox') ? 'Yes' : 'No');
});