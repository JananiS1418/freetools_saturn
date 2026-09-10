document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // 1. Navbar & Mobile Drawer Logic
    // ----------------------------------------------------
    const menuToggle = document.getElementById('menuToggle');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const drawerOverlay = document.getElementById('drawerOverlay');
    const closeDrawer = document.getElementById('closeDrawer');

    // Open mobile drawer
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            mobileDrawer.classList.add('open');
            drawerOverlay.classList.add('open');
            document.body.style.overflow = 'hidden';
        });
    }

    // Close mobile drawer
    const closeMenu = () => {
        mobileDrawer.classList.remove('open');
        drawerOverlay.classList.remove('open');
        document.body.style.overflow = '';
    };

    if (closeDrawer) closeDrawer.addEventListener('click', closeMenu);
    if (drawerOverlay) drawerOverlay.addEventListener('click', closeMenu);

    // Handle drawer dropdowns
    const drawerDropdowns = document.querySelectorAll('.has-drawer-dropdown > .drawer-link');
    
    drawerDropdowns.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const parentItem = link.parentElement;
            
            parentItem.classList.toggle('active');
            
            // Accordion behavior: close others
            document.querySelectorAll('.has-drawer-dropdown.active').forEach(item => {
                if (item !== parentItem) {
                    item.classList.remove('active');
                }
            });
        });
    });

    // ----------------------------------------------------
    // 2. Saturn Calculator Form Logic
    // ----------------------------------------------------
    const submitBtn = document.getElementById('calculateBtn');
    const resultsSection = document.getElementById('resultsSection');
    const notUnderInfluenceSection = document.getElementById('notUnderInfluenceSection');
    const afflictedResults = document.getElementById('afflictedResults');
    let calcClickCount = 0;

    if (submitBtn) {
        submitBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            calcClickCount++;
            
            // Always show the results section container (for Birth Details & Affliction cards)
            if (resultsSection) resultsSection.style.display = 'block';

            if (calcClickCount % 2 === 1) {
                // First click: Show "Not under influence" banner, hide afflicted predictions
                if (notUnderInfluenceSection) notUnderInfluenceSection.style.display = 'flex';
                if (afflictedResults) afflictedResults.style.display = 'none';
                
                if (resultsSection) resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                // Second click: Show regular afflicted predictions, hide banner
                if (notUnderInfluenceSection) notUnderInfluenceSection.style.display = 'none';
                if (afflictedResults) afflictedResults.style.display = 'block';
                
                if (resultsSection) resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }

    // ----------------------------------------------------
    // 3. Saturn Predictions Accordion Logic
    // ----------------------------------------------------
    const predictionAccordionHeaders = document.querySelectorAll('.predictions-accordion .accordion-header');
    
    predictionAccordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const currentItem = header.closest('.accordion-item');
            const isCurrentlyActive = currentItem.classList.contains('active');
            
            // Close all items
            document.querySelectorAll('.predictions-accordion .accordion-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Toggle current item
            if (!isCurrentlyActive) {
                currentItem.classList.add('active');
            }
        });
    });

    // ----------------------------------------------------
    // 4. Saturn FAQ Logic
    // ----------------------------------------------------
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const button = item.querySelector('.faq-toggle-btn');
        const question = item.querySelector('.faq-question');

        const toggleFAQ = () => {
            // Close others
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.height = '0px';
                }
            });

            // Toggle current
            const isActive = item.classList.contains('active');
            const answer = item.querySelector('.faq-answer');

            if (isActive) {
                item.classList.remove('active');
                answer.style.height = '0px';
            } else {
                item.classList.add('active');
                answer.style.height = answer.scrollHeight + 'px';
            }
        };

        if (button) button.addEventListener('click', toggleFAQ);
        if (question) question.addEventListener('click', toggleFAQ);
    });

    // Open the first FAQ by default to match mockup
    if (faqItems.length > 0) {
        faqItems[0].classList.add('active');
        const firstAnswer = faqItems[0].querySelector('.faq-answer');
        if (firstAnswer) {
            firstAnswer.style.height = firstAnswer.scrollHeight + 'px';
        }
    }
});
