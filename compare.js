document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav ul li a');
    const comparisonContainers = document.querySelectorAll('.comparison-container');

    function showSection(sectionId) {
        comparisonContainers.forEach(container => {
            if (container.id === `comparison-container-${sectionId}`) {
                container.style.display = 'flex';
                setupPageNavigation(container);
            } else {
                container.style.display = 'none';
            }
        });
    }

    function syncScroll(container) {
        const viewers = container.querySelectorAll('.doc-viewer');
        viewers.forEach(viewer => {
            viewer.addEventListener('scroll', (e) => {
                const otherViewer = e.target === viewers[0] ? viewers[1] : viewers[0];
                otherViewer.scrollTop = e.target.scrollTop;
            });
        });
    }

    function setupPageNavigation(container) {
        const imageContainers = container.querySelectorAll('.image-container');
        imageContainers.forEach((imgContainer) => {
            const images = imgContainer.querySelectorAll('img');
            let currentPage = 0;

            // Remove existing navigation if any
            const existingNav = imgContainer.nextElementSibling;
            if (existingNav && existingNav.className === 'page-nav') {
                existingNav.remove();
            }

            // Create navigation buttons
            const nav = document.createElement('div');
            nav.className = 'page-nav';
            const prevButton = document.createElement('button');
            prevButton.textContent = 'Previous';
            const nextButton = document.createElement('button');
            nextButton.textContent = 'Next';
            const pageIndicator = document.createElement('span');
            pageIndicator.className = 'page-indicator';
            nav.appendChild(prevButton);
            nav.appendChild(pageIndicator);
            nav.appendChild(nextButton);
            imgContainer.after(nav);

            // Show first image, hide others
            images.forEach((img, index) => {
                img.style.display = index === 0 ? 'block' : 'none';
            });

            function updateButtons() {
                prevButton.disabled = currentPage === 0;
                nextButton.disabled = currentPage === images.length - 1;
                pageIndicator.textContent = `Page ${currentPage + 1} of ${images.length}`;
            }

            function showPage(pageIndex) {
                images[currentPage].style.display = 'none';
                images[pageIndex].style.display = 'block';
                currentPage = pageIndex;
                updateButtons();
            }

            prevButton.addEventListener('click', () => {
                if (currentPage > 0) showPage(currentPage - 1);
            });

            nextButton.addEventListener('click', () => {
                if (currentPage < images.length - 1) showPage(currentPage + 1);
            });

            updateButtons();
        });
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

    // Initialize: show the first section and set up scroll syncing
    showSection('sop');
    comparisonContainers.forEach(syncScroll);

    // Set the first nav link as active
    navLinks[0].classList.add('active');
});