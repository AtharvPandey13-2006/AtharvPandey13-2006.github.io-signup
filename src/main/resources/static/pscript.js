// Sample user data (in a real application, this would come from a backend)
const userData = {
    name: 'John Doe',
    mobile: '+1 234 567 8900',
    email: 'john.doe@example.com',
    address: '123 Main Street, City, Country',
    financial: {
        income: '₹4,00,000/month',
        savings: '₹20,00,000',
        investments: '₹12,00,000'
    }
};

// Function to format currency in Indian Rupees
function formatIndianCurrency(amount) {
    // Remove any existing currency symbol and commas
    amount = amount.replace(/[₹,]/g, '');
    
    // Convert to number
    let num = parseFloat(amount);
    
    // Format with Indian number system (lakhs, crores)
    if (num >= 10000000) { // Convert to crores
        return '₹' + (num / 10000000).toFixed(2) + ' Cr';
    } else if (num >= 100000) { // Convert to lakhs
        return '₹' + (num / 100000).toFixed(2) + ' L';
    } else {
        // Format with Indian number system (thousands)
        return '₹' + num.toLocaleString('en-IN');
    }
}

// Function to update profile information with animation
function updateProfile() {
    const elements = {
        name: document.getElementById('user-name'),
        mobile: document.getElementById('mobile-number'),
        email: document.getElementById('email'),
        address: document.getElementById('address'),
        income: document.getElementById('income'),
        savings: document.getElementById('savings'),
        investments: document.getElementById('investments')
    };

    // Add animation class to each element
    Object.values(elements).forEach(element => {
        element.classList.add('update-animation');
        setTimeout(() => {
            element.classList.remove('update-animation');
        }, 500);
    });

    // Update the content
    elements.name.textContent = userData.name;
    elements.mobile.textContent = userData.mobile;
    elements.email.textContent = userData.email;
    elements.address.textContent = userData.address;
    elements.income.textContent = userData.financial.income;
    elements.savings.textContent = userData.financial.savings;
    elements.investments.textContent = userData.financial.investments;
}

// Function to handle edit button click with enhanced animations
function handleEdit() {
    const editBtn = document.getElementById('edit-profile');
    editBtn.addEventListener('click', () => {
        // Create edit form with animation
        const form = document.createElement('form');
        form.innerHTML = `
            <div class="edit-form">
                <div class="form-group">
                    <label for="edit-name">Name</label>
                    <input type="text" id="edit-name" value="${userData.name}" placeholder="Name">
                </div>
                <div class="form-group">
                    <label for="edit-mobile">Mobile Number</label>
                    <input type="tel" id="edit-mobile" value="${userData.mobile}" placeholder="Mobile Number">
                </div>
                <div class="form-group">
                    <label for="edit-email">Email</label>
                    <input type="email" id="edit-email" value="${userData.email}" placeholder="Email">
                </div>
                <div class="form-group">
                    <label for="edit-address">Address</label>
                    <textarea id="edit-address" placeholder="Address">${userData.address}</textarea>
                </div>
                <div class="form-group">
                    <label for="edit-income">Income (in ₹)</label>
                    <input type="text" id="edit-income" value="${userData.financial.income}" placeholder="Income in ₹">
                </div>
                <div class="form-group">
                    <label for="edit-savings">Savings (in ₹)</label>
                    <input type="text" id="edit-savings" value="${userData.financial.savings}" placeholder="Savings in ₹">
                </div>
                <div class="form-group">
                    <label for="edit-investments">Investments (in ₹)</label>
                    <input type="text" id="edit-investments" value="${userData.financial.investments}" placeholder="Investments in ₹">
                </div>
                <div class="button-group">
                    <button type="submit" class="save-btn">Save Changes</button>
                    <button type="button" id="cancel-edit" class="cancel-btn">Cancel</button>
                </div>
            </div>
        `;

        // Replace profile info with form
        const profileInfo = document.querySelector('.profile-info');
        profileInfo.style.display = 'none';
        profileInfo.parentNode.insertBefore(form, profileInfo);

        // Add input focus effects
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('input-focused');
            });
            
            input.addEventListener('blur', () => {
                input.parentElement.classList.remove('input-focused');
            });
        });

        // Handle form submission with animation
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Add saving animation
            const saveBtn = form.querySelector('.save-btn');
            saveBtn.classList.add('saving');
            
            // Simulate saving delay
            setTimeout(() => {
                // Update user data
                userData.name = document.getElementById('edit-name').value;
                userData.mobile = document.getElementById('edit-mobile').value;
                userData.email = document.getElementById('edit-email').value;
                userData.address = document.getElementById('edit-address').value;
                
                // Format financial data with Indian Rupees
                const income = document.getElementById('edit-income').value;
                const savings = document.getElementById('edit-savings').value;
                const investments = document.getElementById('edit-investments').value;
                
                userData.financial.income = formatIndianCurrency(income);
                userData.financial.savings = formatIndianCurrency(savings);
                userData.financial.investments = formatIndianCurrency(investments);

                // Update display with animation
                updateProfile();
                
                // Remove form and show profile info with fade effect
                form.style.opacity = '0';
                setTimeout(() => {
                    form.remove();
                    profileInfo.style.display = 'block';
                    profileInfo.style.opacity = '0';
                    setTimeout(() => {
                        profileInfo.style.opacity = '1';
                    }, 50);
                }, 300);
            }, 800);
        });

        // Handle cancel button with animation
        document.getElementById('cancel-edit').addEventListener('click', () => {
            form.style.opacity = '0';
            setTimeout(() => {
                form.remove();
                profileInfo.style.display = 'block';
                profileInfo.style.opacity = '0';
                setTimeout(() => {
                    profileInfo.style.opacity = '1';
                }, 50);
            }, 300);
        });
    });
}

// Add hover effects to financial status items
function addFinancialItemEffects() {
    const statusItems = document.querySelectorAll('.status-item');
    statusItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-5px)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0)';
        });
    });
}

// Initialize the dashboard
document.addEventListener('DOMContentLoaded', () => {
    updateProfile();
    handleEdit();
    addFinancialItemEffects();
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .update-animation {
            animation: updatePulse 0.5s ease;
        }
        
        @keyframes updatePulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        .input-focused {
            transform: translateX(5px);
        }
        
        .saving {
            position: relative;
            pointer-events: none;
        }
        
        .saving::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            animation: saving 1s infinite;
        }
        
        @keyframes saving {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }
        
        .form-group {
            margin-bottom: 15px;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 5px;
            color: #666;
            transition: color 0.3s ease;
        }
        
        .form-group input:focus + label,
        .form-group textarea:focus + label {
            color: #4a90e2;
        }
        
        .button-group {
            display: flex;
            gap: 10px;
            margin-top: 20px;
        }
        
        .button-group button {
            flex: 1;
        }
    `;
    document.head.appendChild(style);
}); 