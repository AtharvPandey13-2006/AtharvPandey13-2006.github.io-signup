document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    const closeModal = document.querySelector('.close-modal');
    const closeSignupModal = document.querySelector('.close-signup-modal');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const loginBtn = document.querySelector('.login-btn');
    const signupBtn = document.querySelector('.signup-btn');
    const langToggle = document.getElementById('languageToggle');
    let isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    // Language Translations
    const translations = {
        en: {
            welcome: "Welcome to Financial Dashboard",
            grocery: "Grocery Management",
            debt: "Debt Management",
            future: "Future Planning",
            contact: "Contact Us",
        },
        hi: {
            welcome: "वित्तीय डैशबोर्ड में आपका स्वागत है",
            grocery: "किराना प्रबंधन",
            debt: "ऋण प्रबंधन",
            future: "भविष्य की योजना",
            contact: "संपर्क करें",
        }
    };

    // INIT
    if (isLoggedIn) {
        showLoggedInUI();
    }

    const currentLang = localStorage.getItem("lang") || "en";
    if (langToggle) {
        langToggle.value = currentLang;
        updateLanguage(currentLang);
        langToggle.addEventListener("change", () => {
            const newLang = langToggle.value;
            localStorage.setItem("lang", newLang);
            updateLanguage(newLang);
        });
    }

    // LOGIN HANDLER
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = loginForm.querySelector('input[type="email"]').value;
        const password = loginForm.querySelector('input[type="password"]').value;

        try {
            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const message = await response.text();

            if (response.ok) {
                alert('Login successful!');
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userEmail', email);
                hideLoginModal();
                showLoggedInUI();
            } else {
                alert('Login failed: ' + message);
            }
        } catch (err) {
            alert('Server error. Please try again later.');
        }
    });

    // SIGNUP HANDLER
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const [nameInput, emailInput, passInput, confirmPassInput] = signupForm.querySelectorAll('input');
        const name = nameInput.value;
        const email = emailInput.value;
        const password = passInput.value;
        const confirmPassword = confirmPassInput.value;

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });

            const message = await response.text();

            if (response.ok) {
                alert('Signup successful! You are now logged in.');
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userEmail', email);
                hideSignupModal();
                showLoggedInUI();
            } else {
                alert('Signup failed: ' + message);
            }
        } catch (err) {
            alert('Server error. Please try again later.');
        }
    });

    // SHOW MODALS
    loginBtn.addEventListener('click', () => {
        if (localStorage.getItem('isLoggedIn') === 'true') {
            window.location.href = 'profile.html';
        } else {
            showLoginModal();
        }
    });

    signupBtn.addEventListener('click', () => {
        if (localStorage.getItem('isLoggedIn') === 'true') {
            localStorage.clear();
            alert('Logged out!');
            window.location.reload();
        } else {
            showSignupModal();
        }
    });

    // CLOSE MODALS
    closeModal.addEventListener('click', hideLoginModal);
    closeSignupModal.addEventListener('click', hideSignupModal);

    function showLoginModal() {
        modal.style.display = 'block';
    }

    function hideLoginModal() {
        modal.style.display = 'none';
    }

    function showSignupModal() {
        signupModal.style.display = 'block';
    }

    function hideSignupModal() {
        signupModal.style.display = 'none';
    }

    function showLoggedInUI() {
        loginBtn.innerHTML = '<i class="fas fa-user"></i> Profile';
        loginBtn.onclick = () => window.location.href = 'profile.html';
        signupBtn.innerHTML = '<i class="fas fa-sign-out-alt"></i> Logout';
    }

    // Auto-close modals on outside click
    window.addEventListener('click', (e) => {
        if (e.target === modal) hideLoginModal();
        if (e.target === signupModal) hideSignupModal();
    });

    // Update language
    function updateLanguage(lang) {
        document.querySelector("h2").textContent = translations[lang].welcome;
        document.querySelector('[data-section="grocery"] h3').innerHTML = `<i class="fas fa-shopping-cart"></i> ${translations[lang].grocery}`;
        document.querySelector('[data-section="debt"] h3').innerHTML = `<i class="fas fa-money-bill-wave"></i> ${translations[lang].debt}`;
        document.querySelector('[data-section="future"] h3').innerHTML = `<i class="fas fa-chart-line"></i> ${translations[lang].future}`;
        document.querySelector(".contact-section h2").textContent = translations[lang].contact;
    }
});

// 📊 Chart Data
function renderCharts() {
    const groceryCtx = document.getElementById('overviewGroceryChart')?.getContext('2d');
    const debtCtx = document.getElementById('overviewDebtChart')?.getContext('2d');
    const futureCtx = document.getElementById('overviewFutureChart')?.getContext('2d');
    const debtDetailCtx = document.getElementById('debtChart')?.getContext('2d');
    const futureDetailCtx = document.getElementById('futureChart')?.getContext('2d');

    if (groceryCtx) {
        new Chart(groceryCtx, {
            type: 'doughnut',
            data: {
                labels: ['Spent', 'Remaining'],
                datasets: [{
                    data: [320, 130],
                    backgroundColor: ['#e74c3c', '#2ecc71']
                }]
            }
        });
    }

    if (debtCtx) {
        new Chart(debtCtx, {
            type: 'bar',
            data: {
                labels: ['Total Debt', 'Monthly Payment'],
                datasets: [{
                    label: 'Debt Overview',
                    data: [15000, 2500],
                    backgroundColor: ['#3498db', '#9b59b6']
                }]
            }
        });
    }

    if (futureCtx) {
        new Chart(futureCtx, {
            type: 'pie',
            data: {
                labels: ['Saved', 'Remaining Goal'],
                datasets: [{
                    data: [10000, 15000],
                    backgroundColor: ['#f1c40f', '#95a5a6']
                }]
            }
        });
    }

    if (debtDetailCtx) {
        new Chart(debtDetailCtx, {
            type: 'pie',
            data: {
                labels: ['Credit Card', 'Car Loan', 'Student Loan'],
                datasets: [{
                    data: [5000, 8000, 15000],
                    backgroundColor: ['#e67e22', '#16a085', '#2980b9']
                }]
            }
        });
    }

    if (futureDetailCtx) {
        new Chart(futureDetailCtx, {
            type: 'bar',
            data: {
                labels: ['Stocks', 'Bonds', 'Savings'],
                datasets: [{
                    label: 'Investments',
                    data: [5000, 3000, 2000],
                    backgroundColor: ['#1abc9c', '#f39c12', '#34495e']
                }]
            }
        });
    }
}

renderCharts();
