export class Search {
  input: HTMLInputElement
  cards: NodeListOf<HTMLDivElement>

  constructor(input: HTMLInputElement) {
    this.input = input
    this.cards = document.querySelectorAll(".card")
  }

  /**
  This method updates the card visibility based on the user's input in the search bar.
   */
  searchUpdate() {
    this.cards.forEach((card) => {
      this.input.addEventListener("change", () => {
        if (this.input.value === "") {
          card.classList.remove("dp-none")
        }
      })

      this.input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          const cardName = card.querySelector("h2")?.textContent
          card.classList.remove("dp-none")

          if (this.input.value === "") {
            card.classList.remove("dp-none")
            return
          }
          if (this.input.value.toLocaleLowerCase() !== cardName?.toLocaleLowerCase()) {
            card.classList.add("dp-none")
          }
        }
      })
    })
  }

  /**
   * We're creating a new option element for each card, setting the value of the option to the card
   * name, and appending the option to the select element
   */
  createOptions() {
    const searchOptions = document.querySelector("#card-name")

    this.cards.forEach((card) => {
      const cardName = card.querySelector("h2")?.textContent as string
      const option = document.createElement("option")
      option.setAttribute("value", cardName)
      searchOptions?.appendChild(option)
    })
  }
}
