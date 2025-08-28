// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    // Get the mobile menu button and the mobile menu itself
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = menuBtn.querySelector('svg');

    // Add a click event listener to the menu button
    menuBtn.addEventListener('click', () => {
        // Toggle the 'hidden' class to show/hide the mobile menu
        mobileMenu.classList.toggle('hidden');

        // Change the hamburger icon to a close icon (X) and back
        if (mobileMenu.classList.contains('hidden')) {
            // Menu is closed, show hamburger icon
            menuIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>`;
        } else {
            // Menu is open, show close icon
            menuIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>`;
        }
    });

    // Set the current year in the footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
