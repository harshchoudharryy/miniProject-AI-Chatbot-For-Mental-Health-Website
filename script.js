// Get all links in the sidebar
const links = document.querySelectorAll('.sidebar a');

// Get the current page's path
const currentPage = window.location.pathname;

// Loop through each link and check if it matches the current page URL
links.forEach(link => {
    const linkPath = new URL(link.href).pathname; // Extract the path from the full URL

    // Compare the path of the current link with the current page's path
    if (linkPath === currentPage) {
        link.classList.add('active');  // Add the 'active' class to the matching link
    }
});
