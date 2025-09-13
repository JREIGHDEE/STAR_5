document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const loader = document.querySelector('.loader');
    const gridItems = document.querySelectorAll('.grid-item');
    const entryViewer = document.querySelector('.entry-viewer');
    const backBtn = document.querySelector('.back-btn');
    
    // --- Initial Loader Animation ---
    const loaderSpans = document.querySelectorAll('.loader-text span');
    loaderSpans.forEach((span, i) => {
        span.style.animationDelay = `${i * 0.05}s`;
    });

    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            body.style.overflow = 'auto'; // Allow scrolling after loader
            // Hide the loader completely after transition
            setTimeout(() => loader.style.display = 'none', 500);
        }, 2000); // Duration of the text animation + a pause
    });

    // --- Grid Item Click Logic ---
    gridItems.forEach(item => {
        item.addEventListener('click', () => {
            const entryId = item.getAttribute('data-entry');
            const entryToShow = document.getElementById(entryId);

            // Hide all other entries and activate the correct one
            document.querySelectorAll('.entry-content').forEach(content => {
                content.classList.remove('active');
                content.style.display = 'none';
            });
            
            entryToShow.style.display = 'block';
            
            // Use a timeout to allow the display property to apply before adding the animation class
            setTimeout(() => {
                entryToShow.classList.add('active');
            }, 10);

            body.classList.add('entry-active');
        });
    });

    // --- Back Button Logic ---
    backBtn.addEventListener('click', () => {
        body.classList.remove('entry-active');

        // Reset the active entry after the transition out
        setTimeout(() => {
            const activeEntry = document.querySelector('.entry-content.active');
            if (activeEntry) {
                activeEntry.classList.remove('active');
                activeEntry.style.display = 'none';
            }
        }, 700); // Match the CSS transition duration
    });
});
