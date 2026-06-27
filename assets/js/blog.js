document.addEventListener("DOMContentLoaded", () => {
    const filtersContainer = document.getElementById("category-filters");
    const postsContainer = document.getElementById("blog-posts-container");

    const categories = ["全部", ...new Set(blogPosts.map(post => post.category))];

    function renderFilters(activeCategory = "全部") {
        filtersContainer.innerHTML = categories.map(category => `
            <button class="btn ${activeCategory === category ? 'btn-primary' : 'btn-outline-primary'} me-2 mb-2 filter-btn" data-category="${category}">
                ${category}
            </button>
        `).join('');

        document.querySelectorAll(".filter-btn").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const selectedCategory = e.target.getAttribute("data-category");
                renderFilters(selectedCategory);
                renderPosts(selectedCategory);
            });
        });
    }

    function renderPosts(filterCategory = "全部") {
        const filteredPosts = filterCategory === "全部" 
            ? blogPosts 
            : blogPosts.filter(post => post.category === filterCategory);

        if (filteredPosts.length === 0) {
            postsContainer.innerHTML = `<div class="col-12"><p class="text-muted">目前這個分類還沒有文章喔！</p></div>`;
            return;
        }

        postsContainer.innerHTML = filteredPosts.map(post => `
            <div class="col-lg-8" data-aos="fade-up" data-aos-delay="100">
                <a href="/blog/article.html?post=${post.id}" class="text-decoration-none">
                    <div class="apple-card p-4 transition-all">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <span class="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-2 py-1 small">${post.category}</span>
                            <small class="text-muted">${post.date}</small>
                        </div>
                        <h4 class="fw-bold text-body mb-2">${post.title}</h4>
                        <p class="text-muted mb-0">${post.excerpt}</p>
                    </div>
                </a><br>
            </div>
        `).join('');
    }

    renderFilters();
    renderPosts();
});