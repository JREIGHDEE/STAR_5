document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const loader = document.querySelector('.loader');

    // --- Hide loader and enable scroll ---
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
            body.style.overflow = 'auto';
        }, 2500); // Sync with CSS animation
    });

    // --- Animated Particle Background ---
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray;

    class Particle {
        constructor(x, y, directionX, directionY, size, color) {
            this.x = x;
            this.y = y;
            this.directionX = directionX;
            this.directionY = directionY;
            this.size = size;
            this.color = color;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = 'rgba(218, 184, 139, 0.5)';
            ctx.fill();
        }
        update() {
            if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
            if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;
            this.x += this.directionX;
            this.y += this.directionY;
            this.draw();
        }
    }

    function initParticles() {
        particlesArray = [];
        let numberOfParticles = (canvas.height * canvas.width) / 9000;
        for (let i = 0; i < numberOfParticles; i++) {
            let size = Math.random() * 2 + 1;
            let x = Math.random() * (innerWidth - size * 2) + size;
            let y = Math.random() * (innerHeight - size * 2) + size;
            let directionX = (Math.random() * 0.4) - 0.2;
            let directionY = (Math.random() * 0.4) - 0.2;
            particlesArray.push(new Particle(x, y, directionX, directionY, size));
        }
    }

    function animateParticles() {
        requestAnimationFrame(animateParticles);
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
    }
    
    initParticles();
    animateParticles();

    window.addEventListener('resize', () => {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        initParticles();
    });

    // --- Entry Viewer Logic ---
    const gridItems = document.querySelectorAll('.grid-item');
    const backBtn = document.querySelector('.back-btn');

    gridItems.forEach(item => {
        item.addEventListener('click', () => {
            const entryId = item.getAttribute('data-entry');
            const entryToShow = document.getElementById(entryId);

            document.querySelectorAll('.entry-content').forEach(c => c.style.display = 'none');
            entryToShow.style.display = 'block';
            
            body.classList.add('entry-active');
            
            // Trigger scroll animations for the now-visible content
            setupScrollAnimations(entryToShow);
            
            // Reset scroll to top
            entryToShow.scrollTop = 0;
        });
    });

    backBtn.addEventListener('click', () => {
        body.classList.remove('entry-active');
    });

    // --- Intersection Observer for Scroll Animations ---
    function setupScrollAnimations(container) {
        const animatedElements = container.querySelectorAll('[data-animate]');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Add a staggered delay for a nicer effect
                    entry.target.style.transitionDelay = `${index * 100}ms`;
                    entry.target.classList.add('visible');
                    // observer.unobserve(entry.target); // Optional: stop observing after animation
                }
            });
        }, {
            threshold: 0.1, // Trigger when 10% of the element is visible
            root: container // IMPORTANT: Observe within the scrolling container
        });

        animatedElements.forEach(el => observer.observe(el));
    }
});
