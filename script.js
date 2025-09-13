document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const loader = document.querySelector('.loader');
    const gridItems = document.querySelectorAll('.grid-item');
    const backBtn = document.querySelector('.back-btn');

    // --- Page Load Animation ---
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
            body.style.overflow = 'auto';
        }, 3000); // Must match the animation duration in CSS
    });

    // --- Grid Item Click Logic ---
    gridItems.forEach(item => {
        item.addEventListener('click', () => {
            const entryId = item.getAttribute('data-entry');
            const entryToShow = document.getElementById(entryId);

            // Hide all entries first
            document.querySelectorAll('.entry-content').forEach(content => {
                content.classList.remove('active');
                content.style.display = 'none';
            });
            
            // Show the selected entry
            entryToShow.style.display = 'block';
            
            // Activate the page-turn animation and staggered content reveal
            body.classList.add('entry-active');
            
            // Use a timeout to apply the 'active' class after display is set
            setTimeout(() => {
                entryToShow.classList.add('active');
                
                // Stagger animations for child elements
                const elementsToAnimate = entryToShow.querySelectorAll('.entry-wrapper > *');
                elementsToAnimate.forEach((el, index) => {
                    // This delay is added to the base delay in the CSS
                    el.style.transitionDelay = `${0.5 + index * 0.1}s`;
                });
            }, 50);

            // Scroll to the top of the entry
            entryToShow.scrollTop = 0;
        });
    });

    // --- Back Button Logic ---
    const closeEntry = () => {
        body.classList.remove('entry-active');

        // Get the currently active entry to hide it after the animation
        const activeEntry = document.querySelector('.entry-content.active');
        
        // Wait for the closing animation to finish
        setTimeout(() => {
            if (activeEntry) {
                activeEntry.classList.remove('active');
                activeEntry.style.display = 'none';
                
                // Reset transition delays
                const animatedElements = activeEntry.querySelectorAll('.entry-wrapper > *');
                animatedElements.forEach(el => {
                    el.style.transitionDelay = '';
                });
            }
        }, 800); // Matches the .entry-viewer::before transition duration
    };

    backBtn.addEventListener('click', closeEntry);

    // Optional: Allow closing with the 'Escape' key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && body.classList.contains('entry-active')) {
            closeEntry();
        }
    });
});
