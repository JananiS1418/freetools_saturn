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
        submitBtn.addEventListener('click', function (e) {
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

    // ----------------------------------------------------
    // 5. Custom Select Dropdowns for Form
    // ----------------------------------------------------
    const nativeSelects = document.querySelectorAll('.saturn-calc-form select');

    // Helper to populate options based on the first dummy option
    const populateSelect = (select) => {
        if (select.options.length > 1) return; // already populated

        const firstOpt = select.options[0].text.trim();
        if (firstOpt === 'Day') {
            for (let i = 1; i <= 31; i++) {
                let opt = document.createElement('option');
                opt.value = i; opt.text = i.toString().padStart(2, '0');
                select.add(opt);
            }
        } else if (firstOpt === 'Month') {
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            months.forEach((m, idx) => {
                let opt = document.createElement('option');
                opt.value = idx + 1; opt.text = m;
                select.add(opt);
            });
        } else if (firstOpt === 'Year') {
            const currentYear = new Date().getFullYear();
            for (let i = currentYear; i >= 1940; i--) {
                let opt = document.createElement('option');
                opt.value = i; opt.text = i;
                select.add(opt);
            }
        } else if (firstOpt === 'Hour') {
            for (let i = 1; i <= 12; i++) {
                let opt = document.createElement('option');
                opt.value = i; opt.text = i.toString().padStart(2, '0');
                select.add(opt);
            }
        } else if (firstOpt === 'Minute' || firstOpt === 'Second') {
            for (let i = 0; i <= 59; i++) {
                let opt = document.createElement('option');
                opt.value = i; opt.text = i.toString().padStart(2, '0');
                select.add(opt);
            }
        } else if (firstOpt === 'AM/PM') {
            let opt1 = document.createElement('option'); opt1.value = 'AM'; opt1.text = 'AM';
            let opt2 = document.createElement('option'); opt2.value = 'PM'; opt2.text = 'PM';
            select.add(opt1); select.add(opt2);
        }
    };

    nativeSelects.forEach(select => {
        populateSelect(select);

        // Hide native select
        select.style.display = 'none';

        // Create custom wrapper
        const wrapper = document.createElement('div');
        wrapper.className = 'custom-select-wrapper';
        select.parentNode.insertBefore(wrapper, select.nextSibling);

        // Create trigger
        const trigger = document.createElement('div');
        trigger.className = 'custom-select-trigger';
        trigger.innerHTML = `<span>${select.options[select.selectedIndex].text}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
            </svg>`;
        wrapper.appendChild(trigger);

        // Create options container
        const optionsList = document.createElement('div');
        optionsList.className = 'custom-select-options';

        // Populate custom options
        Array.from(select.options).forEach((opt, index) => {
            const item = document.createElement('div');
            item.className = 'custom-select-item';
            item.textContent = opt.text;
            if (index === select.selectedIndex) item.classList.add('selected');

            item.addEventListener('click', () => {
                // Update native select
                select.selectedIndex = index;
                // Update trigger text
                trigger.querySelector('span').textContent = opt.text;
                // Update selected class
                optionsList.querySelectorAll('.custom-select-item').forEach(i => i.classList.remove('selected'));
                item.classList.add('selected');
                // Close dropdown
                wrapper.classList.remove('open');
            });
            optionsList.appendChild(item);
        });

        wrapper.appendChild(optionsList);

        // Toggle dropdown
        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = wrapper.classList.contains('open');
            // Close all other dropdowns
            document.querySelectorAll('.custom-select-wrapper').forEach(w => w.classList.remove('open'));
            if (!isOpen) {
                wrapper.classList.add('open');
            }
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', () => {
        document.querySelectorAll('.custom-select-wrapper').forEach(w => w.classList.remove('open'));
    });
});
