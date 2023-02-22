export class CustomSelectOptions {
  selector: HTMLSelectElement
  parentElement: HTMLDivElement

  constructor(selector: HTMLSelectElement) {
    this.selector = selector
    this.parentElement = selector.parentElement as HTMLDivElement
  }

  // Method to create the custom select options
  createOptions() {
    this.selector.setAttribute("aria-expanded", "true")
    this.parentElement.style.setProperty("--rotate-select-icon", "-180deg")

    // Create the options container
    const customSelect: HTMLUListElement = document.createElement("ul")
    customSelect.className = "select-custom-options"
    const originalOptionsElements = Array.from(this.selector.children) as HTMLOptionElement[]

    // Add the custom select options

    originalOptionsElements.forEach((child: HTMLOptionElement) => {
      const customSelectOptions: HTMLLIElement = document.createElement("li")

      // This is if check if the child is selected and have a value of ""
      // If so skip to the next iteration
      // This if won't show the first option if this one is selected
      if (child.selected === true && child.value === "") {
        return
      }

      child.value === ""
        ? (customSelectOptions.textContent = "All regions")
        : (customSelectOptions.textContent = child.textContent)

      customSelect.appendChild(customSelectOptions)

      // Add an event listener for when an option is clicked
      customSelectOptions.addEventListener("mousedown", (event) => {
        event.stopPropagation()
        this.selector.value = child.value
        this.selector.setAttribute("aria-expanded", "false")
        this.selector.dispatchEvent(new Event("change"))
        this.parentElement.dispatchEvent(new Event("change"))

        // Animation before removing the customSelect

        customSelect.style.animationName = "anime-fade-out"
        this.parentElement.style.setProperty("--rotate-select-icon", "0")

        setTimeout(() => {
          customSelect.remove()
        }, 500)
      })
    })

    // Add the custom options to the page
    this.parentElement.append(customSelect)
  }

  // Method for hiding the custom options when a click occurs outside of it
  hideOnClickOutsideElement() {
    document.body.addEventListener("click", (event: Event) => {
      if (
        !this.selector.contains(event.target as HTMLElement) &&
        this.selector.getAttribute("aria-expanded") === "true"
      ) {
        const customOptions = this.parentElement.querySelector(
          ".select-custom-options"
        ) as HTMLUListElement
        customOptions.style.animationName = "anime-fade-out"
        this.parentElement.style.setProperty("--rotate-select-icon", "0")
        setTimeout(() => {
          customOptions.remove()
        }, 500)
        this.selector.setAttribute("aria-expanded", "false")
      }
    })
  }
  /* TODO updateCardVisibility()
  - [ ] create a transition for when the cards are re-arranged
  */
  updateCardVisibility() {
    const cards: NodeListOf<HTMLDivElement> = document.querySelectorAll(".card")

    cards.forEach((card: HTMLDivElement) => {
      // Make sure the card is visible by removing the "dp-none" class
      card.classList.remove("dp-none")

      // If the region selector is empty, show all cards
      if (this.selector.value === "") {
        card.classList.remove("dp-none")

        return
      }

      // If the region selector has a value and it doesn't match the card's region data attribute, hide the card
      if (this.selector.value.toLocaleLowerCase() !== card.dataset.region) {
        card.classList.add("dp-none")

        return
      }
    })
  }
}
