// Menu page functionality

document.addEventListener('DOMContentLoaded', function() {
    // Menu filtering
    const categoryButtons = document.querySelectorAll('.category-btn');
    const menuItems = document.querySelectorAll('.menu-item');
    
    if (categoryButtons.length > 0 && menuItems.length > 0) {
        // Set up click handlers for category buttons
        categoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                categoryButtons.forEach(btn => {
                    btn.classList.remove('active');
                });
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get filter value
                const filter = this.getAttribute('data-filter');
                
                // Filter menu items
                filterMenuItems(filter);
                
                // Scroll to appropriate section if needed
                if (filter !== 'all') {
                    const section = document.getElementById(filter);
                    if (section) {
                        section.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        });
        
        // Function to filter menu items
        function filterMenuItems(filter) {
            if (filter === 'all') {
                // Show all items
                menuItems.forEach(item => {
                    item.classList.remove('hidden');
                    
                    // Add animation
                    item.classList.remove('visible');
                    void item.offsetWidth; // Trigger reflow
                    item.classList.add('visible');
                });
                
                // Show all sections
                const sections = document.querySelectorAll('.menu-section');
                sections.forEach(section => {
                    section.style.display = 'block';
                });
            } else {
                // Hide all sections first
                const sections = document.querySelectorAll('.menu-section');
                sections.forEach(section => {
                    if (section.id === filter) {
                        section.style.display = 'block';
                    } else {
                        section.style.display = 'none';
                    }
                });
                
                // Show items matching the filter
                menuItems.forEach(item => {
                    if (item.getAttribute('data-category') === filter) {
                        item.classList.remove('hidden');
                        
                        // Add animation
                        item.classList.remove('visible');
                        void item.offsetWidth; // Trigger reflow
                        item.classList.add('visible');
                    } else {
                        item.classList.add('hidden');
                    }
                });
            }
        }
        
        // Initialize with all items showing
        filterMenuItems('all');
    }
    
    // Smooth scrolling for anchor links
    const menuLinks = document.querySelectorAll('a[href^="#"]');
    
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId !== '#') {
                e.preventDefault();
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Menu item animation on scroll
    const animateMenuItems = function() {
        const menuItems = document.querySelectorAll('.menu-item:not(.hidden)');
        
        menuItems.forEach(item => {
            const itemPosition = item.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            const elementVisible = 150;
            
            if (itemPosition < windowHeight - elementVisible) {
                item.classList.add('visible');
            }
        });
    };
    
    window.addEventListener('scroll', animateMenuItems);
    window.addEventListener('load', animateMenuItems);
});