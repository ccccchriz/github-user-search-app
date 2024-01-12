const lightModeButton = document.getElementById("light-mode");
const darkModeButton = document.getElementById("dark-mode");

const turnToDarkMode = () => {
  lightModeButton.classList.remove("hidden");
  lightModeButton.focus();
  darkModeButton.classList.add("hidden");
  document.body.classList.add("dark-mode");
};

const turnToLightMode = () => {
  darkModeButton.classList.remove("hidden");
  darkModeButton.focus();
  lightModeButton.classList.add("hidden");
  document.body.classList.remove("dark-mode");
};

darkModeButton.addEventListener("click", turnToDarkMode);
lightModeButton.addEventListener("click", turnToLightMode);

if (window.matchMedia("(prefers-color-scheme: light)").matches) {
  turnToLightMode();
}
