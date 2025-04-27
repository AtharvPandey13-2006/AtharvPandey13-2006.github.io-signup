// Cart functionality
let cartItems = [];

// Show/hide pulses panel
function showPulsesPanel(event) {
    event.preventDefault(); // Prevent any default button behavior
    const panel = document.getElementById('pulsesPanel');
    
    // Toggle panel display
    if (panel.style.display === 'block') {
        panel.style.display = 'none';
    } else {
        panel.style.display = 'block';
        // Position panel below the navigation
        const nav = document.querySelector('.nav');
        const navRect = nav.getBoundingClientRect();
        panel.style.position = 'relative';
        panel.style.top = '0';
        panel.style.left = '0';
        panel.style.width = '100%';
        
        // Add click outside handler
        const closePanel = function(e) {
            if (!panel.contains(e.target) && !event.currentTarget.contains(e.target)) {
                panel.style.display = 'none';
                document.removeEventListener('click', closePanel);
            }
        };
        
        // Add the event listener after a small delay to prevent immediate closing
        setTimeout(() => {
            document.addEventListener('click', closePanel);
        }, 100);
    }
}

// Add item to cart
function addToCart(productName, price) {
    cartItems.push({name: productName, price: price});
    updateCartCount();
    showNotification(productName + ' कार्ट में जोड़ दिया गया है');
}

// Update cart count display
function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        cartCount.textContent = cartItems.length;
        cartCount.style.display = cartItems.length > 0 ? 'flex' : 'none';
    }
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    // Add styles
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.left = '50%';
    notification.style.transform = 'translateX(-50%)';
    notification.style.backgroundColor = '#4CAF50';
    notification.style.color = 'white';
    notification.style.padding = '15px 25px';
    notification.style.borderRadius = '5px';
    notification.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
    notification.style.zIndex = '1000';
    notification.style.transition = 'opacity 0.3s';

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Search functionality
function handleSearch() {
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        const searchTerm = searchInput.value;
        if (searchTerm.trim() !== '') {
            showNotification('आपने खोजा: ' + searchTerm);
        }
    }
}

// Initialize event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Add click event to pulses button
    const pulsesButton = document.querySelector('.category-btn:nth-child(2)');
    if (pulsesButton) {
        pulsesButton.addEventListener('click', showPulsesPanel);
    }

    // Add click event to search button
    const searchButton = document.querySelector('.search-bar button');
    if (searchButton) {
        searchButton.addEventListener('click', handleSearch);
    }

    // Add enter key event to search input
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });
    }
}); 