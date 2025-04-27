let items = [];
const DISCOUNT_PERCENTAGE = 5;
const CURRENCY_SYMBOL = '₹';

function addItem() {
    const itemName = document.getElementById('itemName').value.trim();
    const itemPrice = parseFloat(document.getElementById('itemPrice').value);

    if (!itemName || isNaN(itemPrice) || itemPrice <= 0) {
        alert('Please enter valid item name and price');
        return;
    }

    items.push({
        name: itemName,
        price: itemPrice
    });

    updateItemsTable();
    updateTotals();
    clearInputs();
}

function deleteItem(index) {
    items.splice(index, 1);
    updateItemsTable();
    updateTotals();
}

function updateItemsTable() {
    const tableBody = document.getElementById('itemsTableBody');
    tableBody.innerHTML = '';

    items.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${CURRENCY_SYMBOL}${item.price.toFixed(2)}</td>
            <td>
                <button class="delete-btn" onclick="deleteItem(${index})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function calculateSubtotal() {
    return items.reduce((total, item) => total + item.price, 0);
}

function calculateDiscount(subtotal) {
    return (subtotal * DISCOUNT_PERCENTAGE) / 100;
}

function updateTotals() {
    const subtotal = calculateSubtotal();
    const discount = calculateDiscount(subtotal);
    const total = subtotal - discount;

    document.getElementById('subtotal').textContent = `${CURRENCY_SYMBOL}${subtotal.toFixed(2)}`;
    document.getElementById('discount').textContent = `${CURRENCY_SYMBOL}${discount.toFixed(2)}`;
    document.getElementById('total').textContent = `${CURRENCY_SYMBOL}${total.toFixed(2)}`;
}

function clearInputs() {
    document.getElementById('itemName').value = '';
    document.getElementById('itemPrice').value = '';
}

// Add event listeners for Enter key
document.getElementById('itemName').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        document.getElementById('itemPrice').focus();
    }
});

document.getElementById('itemPrice').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addItem();
    }
}); 