/**
 * It checks if the dark mode is on or off, and then toggles it
 */
export function updateColorScheme() {
  if (localStorage.getItem("darkMode") === "on") {
    document.body.setAttribute("data-dark-mode", "off")

    localStorage.setItem("darkMode", "off")
  } else {
    document.body.setAttribute("data-dark-mode", "on")

    localStorage.setItem("darkMode", "on")
  }
}

type SetContrastingProperties = {
  target: HTMLDivElement
  firstCustomProperty: string
  secondCustomProperty: string
  activeValue: string
  inactiveValue: string
}

/**
 * If dark mode is on, set the first custom property to the active value and the second custom property
 * to the inactive value. Otherwise, set the first custom property to the inactive value and the second
 * custom property to the active value.
 * @param {SetContrastingProperties}  - SetContrastingProperties
 */
export function setContrastingProperties({
  target,
  firstCustomProperty,
  secondCustomProperty,
  activeValue,
  inactiveValue,
}: SetContrastingProperties) {
  if (document.body.dataset.darkMode === "on") {
    target.style.setProperty(firstCustomProperty, activeValue)
    target.style.setProperty(secondCustomProperty, inactiveValue)
  } else {
    target.style.setProperty(firstCustomProperty, inactiveValue)
    target.style.setProperty(secondCustomProperty, activeValue)
  }
}
