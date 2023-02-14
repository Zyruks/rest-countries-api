/* imports */
import { rotateIcons, changeText } from "./scripts/components/buttons"
import { updateColorScheme, setContrastingProperties } from "./scripts/components/colorMode"
import { CustomSelectOptions } from "./scripts/components/select"
/* imports end */

/* variable declarations */
const darkLightBtn = document.querySelector(
  '.btn[data-type="dark-light"]'
) as HTMLButtonElement

const sunIcon = document.querySelector(
  ".sun-icon"
) as HTMLOrSVGImageElement
const moonIcon = document.querySelector(
  ".moon-icon"
) as HTMLOrSVGImageElement

const defaultColorScheme: boolean = window.matchMedia(
  "(prefers-color-scheme: dark)"
).matches

const regionsContainer = document.querySelector(".select-container") as HTMLDivElement

/* variable declaration end */

/* Checking if the user's browser has a default color scheme of dark mode. If it does, it sets the
local storage to "on" and sets the data attribute to "on". If it doesn't, it sets the local storage
to "off" and sets the data attribute to "off". */
if (defaultColorScheme) {
  localStorage.setItem("darkMode", "on")
  document.body.setAttribute("data-dark-mode", "on")
} else {
  localStorage.setItem("darkMode", "off")
  document.body.setAttribute("data-dark-mode", "off")
}

setContrastingProperties({
  target: regionsContainer,
  firstCustomProperty: "--select-icon-for-dark-mode",
  secondCustomProperty: "--select-icon-for-light-mode",
  activeValue: "100%",
  inactiveValue: "0",
})
darkLightBtn.addEventListener("click", () => {
  rotateIcons({
    firstElement: moonIcon,
    secondElement: sunIcon,
    transformProperty: "--rotate",
    transformModifyValue: "180deg",
  })
  changeText(darkLightBtnText)
  updateColorScheme()
  setContrastingProperties({
    target: regionsContainer,
    firstCustomProperty: "--select-icon-for-dark-mode",
    secondCustomProperty: "--select-icon-for-light-mode",
    activeValue: "100%",
    inactiveValue: "0",
  })
})
