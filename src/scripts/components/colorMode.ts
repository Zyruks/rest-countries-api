/**
 * It checks if the dark mode is on or off, and then toggles it
 */
export default function updateColorScheme() {
  if (localStorage.getItem("darkMode") === "on") {
    document.body.setAttribute("data-dark-mode", "off")

    localStorage.setItem("darkMode", "off")
  } else {
    document.body.setAttribute("data-dark-mode", "on")

    localStorage.setItem("darkMode", "on")
  }
}
