document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav ul li a');
    const comparisonContainers = document.querySelectorAll('.comparison-container');
    const prevButton = document.getElementById('prevPage');
    const nextButton = document.getElementById('nextPage');
    const pageIndicator = document.querySelector('.page-indicator');

    let currentPage = 0;
    let totalPages = 0;

    function showSection(sectionId) {
        comparisonContainers.forEach(container => {
            if (container.id === `comparison-container-${sectionId}`) {
                container.style.display = 'block';
                setupPageNavigation(container);
            } else {
                container.style.display = 'none';
            }
        });
    }

    function setupPageNavigation(container) {
        const imageContainers = container.querySelectorAll('.image-container');
        const images1 = imageContainers[0].querySelectorAll('img');
        const images2 = imageContainers[1].querySelectorAll('img');
        totalPages = images1.length; // Assuming both containers have the same number of pages

        function updateButtons() {
            prevButton.disabled = currentPage === 0;
            nextButton.disabled = currentPage === totalPages - 1;
            pageIndicator.textContent = `Page ${currentPage + 1} of ${totalPages}`;
        }

        function showPage(pageIndex) {
            images1[currentPage].style.display = 'none';
            images2[currentPage].style.display = 'none';
            images1[pageIndex].style.display = 'block';
            images2[pageIndex].style.display = 'block';
            currentPage = pageIndex;
            updateButtons();
        }

        prevButton.addEventListener('click', () => {
            if (currentPage > 0) showPage(currentPage - 1);
        });

        nextButton.addEventListener('click', () => {
            if (currentPage < totalPages - 1) showPage(currentPage + 1);
        });

        // Initialize navigation
        showPage(0);
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = e.target.getAttribute('data-section');
            showSection(section);
            navLinks.forEach(l => l.classList.remove('active'));
            e.target.classList.add('active');
        });
    });

    // Initialize: show the first section and set up navigation
    showSection('sop');

    // Set the first nav link as active
    navLinks[0].classList.add('active');
});
