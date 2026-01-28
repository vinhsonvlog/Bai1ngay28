const API_URL = 'https://api.escuelajs.co/api/v1/products';

async function loadData() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Lỗi khi load data:', error);
        throw error;
    }
}

function displayProducts(products) {
    const container = document.getElementById('app');
    container.innerHTML = '';

    const tableContainer = document.createElement('div');
    tableContainer.className = 'table-container';

    const table = document.createElement('table');
    table.className = 'products-table';

    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th><i class="fas fa-image"></i>Image</th>
            <th><i class="fas fa-hashtag"></i>ID</th>
            <th><i class="fas fa-tag"></i>Title</th>
            <th><i class="fas fa-link"></i>Slug</th>
            <th><i class="fas fa-dollar-sign"></i>Price</th>
            <th><i class="fas fa-info-circle"></i>Description</th>
            <th><i class="fas fa-folder"></i>Category</th>
        </tr>
    `;
    table.appendChild(thead);

    const tbody = document.createElement('tbody');

    for (var product in products) {
        const item = products[product];
        const row = document.createElement('tr');

        const imageUrl = item.images && item.images[0] ? item.images[0].replace(/[\[\]"]/g, '') : 'https://via.placeholder.com/80x80?text=No+Image';

        row.innerHTML = `
            <td><img src="${imageUrl}" alt="${item.title}" class="product-image" onerror="this.src='https://via.placeholder.com/80x80?text=No+Image'"></td>
            <td>${item.id}</td>
            <td>${item.title}</td>
            <td><code class="slug-code">${item.slug}</code></td>
            <td><span class="price-highlight">$${item.price}</span></td>
            <td>${item.description}</td>
            <td><span class="category-badge">${item.category?.name || 'No Category'}</span></td>
        `;

        tbody.appendChild(row);
    }

    table.appendChild(tbody);
    tableContainer.appendChild(table);

    container.appendChild(tableContainer);
}

function showLoading() {
    const container = document.getElementById('app');
    container.innerHTML = `
        <div class="loading">
            <i class="fas fa-spinner"></i>
            <p>Đang tải sản phẩm...</p>
        </div>
    `;
}

function showError(error) {
    const container = document.getElementById('app');
    container.innerHTML = `
        <div class="error">
            <i class="fas fa-exclamation-triangle"></i>
            <h2>Có lỗi xảy ra!</h2>
            <p>${error.message}</p>
        </div>
    `;
}

async function main() {
    try {
        showLoading();

        const products = await loadData();

        displayProducts(products);

    } catch (error) {
        console.error('Error:', error);
        showError(error);
    }
}

document.addEventListener('DOMContentLoaded', main);