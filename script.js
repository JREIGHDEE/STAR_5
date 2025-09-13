document.addEventListener('DOMContentLoaded', () => {
    const gridItems = document.querySelectorAll('.grid-item');
    const entryContents = document.querySelectorAll('.entry-content');
    const backButtons = document.querySelectorAll('.back-btn');
    const gridContainer = document.querySelector('.grid-container');

    gridItems.forEach(item => {
        item.addEventListener('click', () => {
            const entryId = item.getAttribute('data-entry');
            const entryToShow = document.getElementById(entryId);

            gridContainer.style.display = 'none';
            entryContents.forEach(entry => entry.style.display = 'none');
            entryToShow.style.display = 'block';
        });
    });

    backButtons.forEach(button => {
        button.addEventListener('click', () => {
            entryContents.forEach(entry => entry.style.display = 'none');
            gridContainer.style.display = 'grid';
        });
    });
});
