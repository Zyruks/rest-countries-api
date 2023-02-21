import { Country } from "../tools/fetch"

export class Cards {
  async renderCards(fetchData: Country[]) {
    const countries = fetchData
    const cardTemplate = document.getElementById("card-template") as HTMLTemplateElement
    const container = document.querySelector(".card-section .container") as HTMLDivElement

    countries.forEach((country) => {
      const node = cardTemplate.content.cloneNode(true) as HTMLElement
      const card = node.querySelector(".card") as HTMLDivElement

      card.dataset.cardId = country.name.toLocaleLowerCase()

      node.querySelector("h2")!.textContent = country.name
      node.querySelector("img")!.src = country.flag
      node.querySelector("img")!.alt = `${country.name} Flag`
      node.querySelector(".card-population")!.textContent = country.population.toLocaleString()
      node.querySelector(".card-region")!.textContent = country.region
      node.querySelector(".card-capital")!.textContent = country.capital

      container.appendChild(node)
    })
  }
}
