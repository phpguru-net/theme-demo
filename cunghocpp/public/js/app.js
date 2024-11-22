document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Toggle
  const menuToggle = document.getElementById("menu-toggle");
  const menuClose = document.getElementById("menu-close");
  const mobileMenu = document.getElementById("topnav-mobile");

  menuToggle.addEventListener("click", () => {
    mobileMenu.classList.remove("hidden");
  });

  menuClose.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
  });

  const toggles = document.querySelectorAll(".submenu-toggle");

  toggles.forEach((toggle) => {
    toggle.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent default link behavior

      const allSubmenus = document.querySelectorAll(".submenu");
      const submenu = toggle.nextElementSibling;

      // Hide all other submenus
      allSubmenus.forEach((sm) => {
        if (sm !== submenu) {
          sm.classList.remove("visible");
          sm.classList.add("hidden");
        }
      });

      // Toggle the clicked submenu
      submenu.classList.toggle("hidden");
      submenu.classList.toggle("visible");
    });
  });
});
