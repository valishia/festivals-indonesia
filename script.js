//SEARCH BAR GENERAL (PAGE HOME & FESTIVALS)
document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const festivalCards = document.querySelectorAll(".festival-card");

  if (searchInput && festivalCards.length > 0) {
    searchInput.addEventListener("input", function () {
      const searchTerm = searchInput.value.toLowerCase();
      festivalCards.forEach(card => {
        const title = card.querySelector("h3").textContent.toLowerCase();
        const desc = card.querySelector("p").textContent.toLowerCase();
        card.style.display = (title.includes(searchTerm) || desc.includes(searchTerm)) ? "block" : "none";
      });
    });
  }
});

//POP-UP FESTIVALS & FORM PENDAFTARAN
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const festivalCards = document.querySelectorAll(".festival-card");

  if (searchInput && festivalCards.length > 0) {
    searchInput.addEventListener("input", function () {
      const searchTerm = searchInput.value.toLowerCase();
      festivalCards.forEach(card => {
        const title = card.querySelector("h3").textContent.toLowerCase();
        const desc = card.querySelector("p").textContent.toLowerCase();
        card.style.display = (title.includes(searchTerm) || desc.includes(searchTerm)) ? "block" : "none";
      });
    });
  }

  const cards = document.querySelectorAll(".festival-card");
  const popup = document.getElementById("festival-popup");
  const popupImg = document.getElementById("popup-img");
  const popupTitle = document.getElementById("popup-title");
  const popupDesc = document.getElementById("popup-desc");
  const closeBtn = popup?.querySelector(".close");

  const registerPopup = document.getElementById("register-popup");
  const openRegisterBtn = document.getElementById("open-register");
  const registerForm = document.getElementById("register-form");
  const festivalNameInput = document.getElementById("festival-name");

  const successPopup = document.getElementById("success-popup");
  const homeBtn = document.getElementById("home-btn");

  //MUNCULIN POP-UP FESTIVAL CARD
  if (cards.length > 0 && popup) {
    cards.forEach(card => {
      card.addEventListener("click", () => {
        const img = card.querySelector("img")?.src || "";
        const title = card.querySelector("h3")?.textContent || "";
        const desc = card.querySelector("p")?.textContent || "";

        popupImg.src = img;
        popupTitle.textContent = title;
        popupDesc.textContent = desc;
        popup.classList.remove("hidden");
        popup.style.display = "flex";
      });
    });
  }

  //BUTTON CLOSE FESTIVAL POP-UP
  closeBtn?.addEventListener("click", () => {
    popup.classList.add("hidden");
    popup.style.display = "none";
  });

  //POP-UP FORM PENDAFTARAN
  openRegisterBtn?.addEventListener("click", () => {
    popup.classList.add("hidden");
    popup.style.display = "none";
    registerPopup.classList.remove("hidden");
    registerPopup.style.display = "flex";
    if (festivalNameInput) {
      festivalNameInput.value = popupTitle.textContent;
    }
  });

  //SUBMIT FORM PENDAFTARAN
  registerForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    registerPopup.classList.add("hidden");
    registerPopup.style.display = "none";
    successPopup.classList.remove("hidden");
    successPopup.style.display = "flex";
  });

  //BUTTON UNTUK KEMBALI KE HOME
  homeBtn?.addEventListener("click", () => {
    window.location.href = "index.html";
  });

  //KALAU KLIK DILUAR KOTAK AREA FORM AKAN CLOSE
  window.addEventListener("click", (e) => {
    if (e.target === popup) popup.classList.add("hidden");
    if (e.target === registerPopup) registerPopup.classList.add("hidden");
    if (e.target === successPopup) successPopup.classList.add("hidden");
  });
});

//ADD YOURS REVIEW
document.addEventListener("DOMContentLoaded", () => {
  const reviewPage = document.querySelector(".reviews-container");

  if (!reviewPage) {
      return
    }

  const addBtn = document.getElementById("add-yours-btn");
  const reviewPopup = document.getElementById("review-popup");
  const successPopup = document.getElementById("success-review-popup");
  const homeBtn = document.getElementById("home-btn");
  const reviewForm = document.getElementById("review-form");

  let editIndex = null;
  let deleteIndex = null;

  //MEMASUKKAN REVIEW DARI LOCAL STORAGE
  function saveReviewToLocal(name, festival, comment) {
    const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    reviews.push({ name, festival, comment });
    localStorage.setItem("reviews", JSON.stringify(reviews));
  }

  function updateReviewInLocal(index, name, festival, comment) {
    const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    reviews[index] = { name, festival, comment };
    localStorage.setItem("reviews", JSON.stringify(reviews));
  }

  function loadReviews() {
    const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    const container = document.querySelector(".reviews-container");

    container.querySelectorAll(".review-card.dynamic").forEach(el => el.remove());

    container.querySelectorAll(".review-card.dynamic").forEach(el => el.remove());

    reviews.forEach((r, index) => {
      const newCard = document.createElement("div");
      newCard.classList.add("review-card", "dynamic");
      newCard.innerHTML = `
        <h3>${r.name}</h3>
        <p><i>${r.festival}</i></p>
        <hr>
        <p>${r.comment}</p>
        <div class="review-actions">
          <button class="edit-btn">Edit</button>
          <button class="delete-btn">Delete</button>
        </div>
      `;

      //BUTTON EDIT
      newCard.querySelector(".edit-btn").addEventListener("click", () => {
        document.getElementById("review-name").value = r.name;
        document.getElementById("review-festival").value = r.festival;
        document.getElementById("review-comment").value = r.comment;
        editIndex = index;
        reviewPopup.classList.remove("hidden");
        reviewPopup.style.display = "flex";
      });

      //BUTTON DELETE
      newCard.querySelector(".delete-btn").addEventListener("click", () => {
        deleteIndex = index;
        const deletePopup = document.getElementById("delete-confirm-popup");
        deletePopup.classList.remove("hidden");
        deletePopup.style.display = "flex";
      });

      container.appendChild(newCard);
    });
  }

  //AGAR REVIEW DARI LOCAL STORAGE MUNCUL SAAT PAGE DI LOAD
  loadReviews();

  //POP-UP ADD REVIEW
  addBtn?.addEventListener("click", () => {
    editIndex = null;
    reviewForm.reset();
    reviewPopup.classList.remove("hidden");
    reviewPopup.style.display = "flex";
  });

  //BUTTON SELESAI
  reviewForm?.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("review-name").value;
    const festival = document.getElementById("review-festival").value;
    const comment = document.getElementById("review-comment").value;

    if (editIndex !== null) {
      updateReviewInLocal(editIndex, name, festival, comment);
    } else {
      saveReviewToLocal(name, festival, comment);
    }

    loadReviews();

    //POP-UP SUCCESS ISI REVIEW
    reviewPopup.classList.add("hidden");
    reviewPopup.style.display = "none";
    successPopup.classList.remove("hidden");
    successPopup.style.display = "flex";

    reviewForm.reset();
    editIndex = null;
  });

  //BUTTON UNTUK KEMBALI KE HOME
  homeBtn?.addEventListener("click", () => {
    window.location.href = "index.html";
  });

  //POP-UP CONFIRM DELETE REVIEW
  const deletePopup = document.getElementById("delete-confirm-popup");
  const cancelDelete = document.getElementById("cancel-delete");
  const confirmDelete = document.getElementById("confirm-delete");

  cancelDelete?.addEventListener("click", () => {
    deletePopup.classList.add("hidden");
    deletePopup.style.display = "none";
    deleteIndex = null;
  });

  confirmDelete?.addEventListener("click", () => {
    if (deleteIndex !== null) {
      const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
      reviews.splice(deleteIndex, 1);
      localStorage.setItem("reviews", JSON.stringify(reviews));
      loadReviews();
    }
    deletePopup.classList.add("hidden");
    deletePopup.style.display = "none";
    deleteIndex = null;
  })

  //CLOSE POP-UP SAAT KLIK DILUAR KOTAK
  window.addEventListener("click", (e) => {
    if (e.target === reviewPopup) {
      reviewPopup.style.display = "none";
      reviewPopup.classList.add("hidden");
   }

    if (e.target === successPopup) {
      successPopup.style.display = "none";
      successPopup.classList.add("hidden");
    }

    const deletePopup = document.getElementById("delete-confirm-popup");
    if (e.target === deletePopup) {
      deletePopup.style.display = "none";
      deletePopup.classList.add("hidden");
    }
  })
});

//FILTER BUTTON & SEARCH FESTIVALS
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".festival-card");

  function filterFestivals() {
    const searchText = searchInput.value.toLowerCase();
    const activeBtn = document.querySelector(".filter-btn.active");
    const selectedRegion = activeBtn ? activeBtn.dataset.region : "all";

    cards.forEach(card => {
      const title = card.querySelector("h3").textContent.toLowerCase();
      const desc = card.querySelector("p").textContent.toLowerCase();
      const region = card.dataset.region;

      const matchSearch = title.includes(searchText) || desc.includes(searchText);
      const matchRegion = (selectedRegion === "all" || selectedRegion === region);

      card.style.display = (matchSearch && matchRegion) ? "block" : "none";
    });
  }

  //SEARCH BAR
  searchInput.addEventListener("input", filterFestivals);

  //FILTER BUTTONS
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      filterFestivals();
    });
  });

  filterFestivals();
});

// BUTTON NAVBAR
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  toggleBtn?.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
});
