 const searchInput = document.getElementById("searchInput");
    const categoryFilter = document.getElementById("categoryFilter");
    const blogCards = document.querySelectorAll(".blog-card");

    function filterBlogs() {
      const searchValue = searchInput.value.toLowerCase();
      const categoryValue = categoryFilter.value;

      blogCards.forEach(card => {
        const title = card.querySelector("h3").textContent.toLowerCase();
        const category = card.getAttribute("data-category");

        if (
          (categoryValue === "all" || category === categoryValue) &&
          title.includes(searchValue)
        ) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    }

    searchInput.addEventListener("input", filterBlogs);
    categoryFilter.addEventListener("change", filterBlogs);
    