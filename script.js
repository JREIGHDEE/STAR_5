document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const loader = document.querySelector('.loader');
    const gridItems = document.querySelectorAll('.grid-item');
    const backBtn = document.querySelector('.back-btn');
    let activeEntry = null; // Keep track of the currently open entry

    // --- Page Load Animation ---
    window.addEventListener('load', () => {
        // This timer matches the 3s duration of the loader text animation
        setTimeout(() => {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
            body.style.overflow = 'auto';
        }, 3000); 
    });

    // --- Function to open an entry ---
    const openEntry = (entryElement) => {
        if (!entryElement) return;

        entryElement.style.display = 'block';
        activeEntry = entryElement;

        // Activate the circle expansion animation
        body.classList.add('entry-active');
        
        // Stagger the animation of the content inside
        const elementsToAnimate = entryElement.querySelectorAll('.entry-wrapper > *');
        elementsToAnimate.forEach((el, index) => {
            // Use a timeout to ensure styles apply after the main transition starts
            setTimeout(() => {
                el.style.transitionDelay = `${index * 0.1}s`;
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 800); // Delay matches the main transition speed
        });
        
        entryElement.scrollTop = 0;
    };

    // --- Function to close an entry (BUG FIX IMPLEMENTED HERE) ---
    const closeEntry = () => {
        if (!activeEntry) return;

        const entryWrapper = activeEntry.querySelector('.entry-wrapper');
        
        // 1. Start by fading out the content inside the viewer
        entryWrapper.classList.add('is-hiding');
        
        // 2. After the content is hidden, trigger the circle retraction animation
        setTimeout(() => {
            body.classList.remove('entry-active');

            // 3. After the main closing animation finishes, clean up everything
            setTimeout(() => {
                entryWrapper.classList.remove('is-hiding');
                activeEntry.style.display = 'none';

                // Reset styles for the next time it opens
                const elementsToAnimate = activeEntry.querySelectorAll('.entry-wrapper > *');
                elementsToAnimate.forEach(el => {
                    el.style.transitionDelay = '';
                    el.style.opacity = '0';
                    el.style.transform = 'translateY(25px)';
                });
                
                activeEntry = null; // Clear the active entry
            }, 800); // This must match the CSS --transition-speed

        }, 400); // Wait for the content to fade out (matches .entry-wrapper transition)
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
