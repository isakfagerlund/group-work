function popupMenu() {
  const popup = document.getElementById("popup");
  const hamburger = document.getElementById("hamburger");
  const closePopup = document.getElementById("popupClose");

  // Open menu
  hamburger.onclick = function () {
    popup.classList.add("showPopup");
  };
  // Close Menu
  closePopup.onclick = function () {
    popup.classList.remove("showPopup");
  };

};

export default popupMenu;