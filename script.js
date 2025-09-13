document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const loader = document.querySelector('.loader');
    const gridItems = document.querySelectorAll('.grid-item');
    const backBtn = document.querySelector('.back-btn');
    let activeEntry = null;

    // --- Fireworks Background Logic ---
    const fireworksContainer = document.querySelector('.fireworks-background');
    const numFireworks = 25; // How many fireworks to display

    for (let i = 0; i < numFireworks; i++) {
        const firework = document.createElement('div');
        firework.className = 'firework';
        fireworksContainer.appendChild(firework);

        // Randomize position and animation delay for a natural look
        firework.style.left = `${Math.random() * 100}vw`;
        firework.style.top = `${Math.random() * 100}vh`;
        firework.style.animationDelay = `${Math.random() * 3}s`;
        firework.style.animationDuration = `${1 + Math.random() * 2}s`;
    }

    // --- Page Load Animation ---
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
            body.style.overflow = 'auto';
        }, 3500); // Matches the loader text animation duration
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
                el.style.transitionDelay = `${index * 0.1}s`;
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 800); // Delay matches the main transition speed
        });
        
        entryElement.scrollTop = 0;
    };

    // --- Function to close an entry (BUG FIX IMPLEMENTED) ---
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
                    el.style.transform = 'translateY(25px)';
                });
                activeEntry = null;
            }, 800);
        }, 400);
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
