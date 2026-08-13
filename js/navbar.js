document.addEventListener('DOMContentLoaded', () => {
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
});
