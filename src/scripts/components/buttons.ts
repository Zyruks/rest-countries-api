type RotateIcons = {
  firstElement: HTMLOrSVGImageElement
  transformProperty: string
  secondElement: HTMLOrSVGImageElement
  transformModifyValue: string
}

export function rotateIcons({
  firstElement,
  secondElement,
  transformProperty,
  transformModifyValue,
}: RotateIcons): void {
  if (localStorage.getItem("darkMode") === "on") {
    // Unhide Element
    setTimeout(() => {
      secondElement.style.opacity = "100%"
    }, 500)

    firstElement.style.setProperty(
      transformProperty,
      "-" + transformModifyValue
    )
    secondElement.style.setProperty(transformProperty, "0")

    // Hide Element
    setTimeout(() => {
      firstElement.style.opacity = "0"
    }, 500)
  } else {
    // Unhide  ELement
    setTimeout(() => {
      firstElement.style.opacity = "100%"
    }, 500)

    //Rotation
    firstElement.style.setProperty(transformProperty, "0")
    secondElement.style.setProperty(
      transformProperty,
      transformModifyValue
    )

    // Hide Element
    setTimeout(() => {
      secondElement.style.opacity = "0"
    }, 500)
  }
}

export function changeText(target: HTMLSpanElement) {
  if (localStorage.getItem("darkMode") === "on") {
    target.style.opacity = "0"
    console.log(target)
    setTimeout(() => {
      target.textContent = "Light Mode"
      target.style.opacity = "100%"
    }, 600)
  } else {
    target.style.opacity = "0"
    console.log(target)
    setTimeout(() => {
      target.textContent = "Dark Mode"
      target.style.opacity = "100%"
    }, 600)
  }
}
