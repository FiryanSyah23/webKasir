

//* style
const menuSidebar = document.querySelector(".menu-sidebar");

menuSidebar.addEventListener("click", () => {
  const sidebarList = document.querySelector(".sidebar-list");
  sidebarList.classList.toggle("transisi-slide");
});

const sidebarList = document.querySelector(".sidebar-list ul");

sidebarList.addEventListener("click", (e) => {
  const li = e.target.closest("li"); // Mencari <li> terdekat dari elemen yang diklik
  const anchor = li.querySelector("a");
  if (anchor) {
    anchor.click();
  }
});
