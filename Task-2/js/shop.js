document.addEventListener("DOMContentLoaded", () => {
    const PRODUCTS_PER_PAGE = 3;
    let currentPage = 1;

    const allProducts = Array.from(document.querySelectorAll(".product-box"));
    const pagination = document.getElementById("pagination");
    const categoryFilter = document.getElementById("filter-category");
    const priceSort = document.getElementById("sort-price");
    const searchInput = document.getElementById("search-input");

    let filteredProducts = [...allProducts];

    function renderProducts(page = 1) {
        const start = (page - 1) * PRODUCTS_PER_PAGE;
        const end = start + PRODUCTS_PER_PAGE;

        allProducts.forEach(product => product.style.display = "none");
        filteredProducts.slice(start, end).forEach(product => product.style.display = "block");

        renderPagination();
    }

    function renderPagination() {
        pagination.innerHTML = "";
        const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

        for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement("button");
            btn.textContent = i;
            btn.className = currentPage === i ? "active" : "";
            btn.addEventListener("click", () => {
                currentPage = i;
                renderProducts(currentPage);
            });
            pagination.appendChild(btn);
        }
    }

    function applyFilters() {
        const selectedCategory = categoryFilter.value;
        const sortOrder = priceSort.value;
        const query = searchInput.value.toLowerCase();

        filteredProducts = allProducts.filter(product => {
            const name = product.getAttribute("data-name").toLowerCase();
            const category = product.getAttribute("data-category");
            return (selectedCategory === "all" || category === selectedCategory) && name.includes(query);
        });

        if (sortOrder === "asc") {
            filteredProducts.sort((a, b) => +a.getAttribute("data-price") - +b.getAttribute("data-price"));
        } else if (sortOrder === "desc") {
            filteredProducts.sort((a, b) => +b.getAttribute("data-price") - +a.getAttribute("data-price"));
        }

        currentPage = 1;
        renderProducts(currentPage);
    }

    categoryFilter.addEventListener("change", applyFilters);
    priceSort.addEventListener("change", applyFilters);
    searchInput.addEventListener("input", applyFilters);

    applyFilters();
});
