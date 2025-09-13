document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const gridItems = document.querySelectorAll('.grid-item');
    const backBtn = document.querySelector('.back-btn');
    let activeEntry = null;

    // --- Celestial Background Logic ---
    const starsContainer = document.getElementById('stars-container');
    const numStars = 100;
    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        starsContainer.appendChild(star);
        const size = Math.random() * 3 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${Math.random() * 100}vw`;
        star.style.top = `${Math.random() * 100}vh`;
        star.style.animationDelay = `${Math.random() * 5}s`;
        star.style.animationDuration = `${3 + Math.random() * 4}s`;
    }

    // --- Page Load Animation (THE FIX) ---
    window.addEventListener('load', () => {
        // After the loader text animation finishes, add a class to the body.
        // This class will trigger the CSS transitions to hide the loader and show the content.
        setTimeout(() => {
            body.classList.add('is-loaded');
            body.style.overflow = 'auto'; // Restore scrolling
        }, 4000); // This must match the loader text animation duration.
    });

    // --- Function to open an entry ---
    const openEntry = (entryElement) => {
        if (!entryElement) return;
        entryElement.style.display = 'block';
        activeEntry = entryElement;
        body.classList.add('entry-active');
        const elementsToAnimate = entryElement.querySelectorAll('.entry-wrapper > *');
        elementsToAnimate.forEach((el, index) => {
            setTimeout(() => {
                el.style.transitionDelay = `${index * 0.15}s`;
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 1200); // Delay matches the main transition speed
        });
        entryElement.scrollTop = 0;
    };

    // --- Function to close an entry (retains previous bug fixes) ---
    const closeEntry = () => {
        if (!activeEntry) return;
        const entryWrapper = activeEntry.querySelector('.entry-wrapper');
        entryWrapper.classList.add('is-hiding');
        setTimeout(() => {
            body.classList.remove('entry-active');
            setTimeout(() => {
                entryWrapper.classList.remove('is-hiding');
                activeEntry.style.display = 'none';
                const elementsToAnimate = activeEntry.querySelectorAll('.entry-wrapper > *');
                elementsToAnimate.forEach(el => {
                    el.style.transitionDelay = '';
                    el.style.opacity = '0';
                    el.style.transform = 'translateY(30px)';
                });
                activeEntry = null;
            }, 1200);
        }, 500);
    };

    // --- Event Listeners ---
    gridItems.forEach(item => {
        item.addEventListener('click', () => {
            if (body.classList.contains('entry-active')) return;
            const entryId = item.getAttribute('data-entry');
            const entryToShow = document.getElementById(entryId);
            openEntry(entryToShow);
        });
    });

    backBtn.addEventListener('click', closeEntry);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && body.classList.contains('entry-active')) {
            closeEntry();
        }
    });
});
