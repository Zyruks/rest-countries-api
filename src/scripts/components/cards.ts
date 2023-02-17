interface Country {
  name: string
  capital: string
  population: number
  region: string
  flag: string
}

/**
 * It fetches a list of countries from an API, and returns a list of countries
 * @returns An array of countries
 */
export async function fetchCountries(): Promise<Country[]> {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all")
    if (!response.ok) {
      throw new Error(response.status.toString())
    }
    const data = await response.json()
    const countries = data.map((country: any) => {
      return {
        name: country.name.common,
        capital: country.capital ?? "N/A",
        population: country.population ?? 0,
        region: country.region ?? "N/A",
        flag: country.flags.png ?? "",
      }
    })
    return countries
  } catch (error) {
    console.error("An error occurred:", error)
    return []
  }
}

/**
 * We fetch the countries, get the template, get the container, loop through the countries, clone the
 * template, set the content, append the node to the container
 */
export async function renderCountries() {
  const countries = await fetchCountries()
  const cardTemplate = document.getElementById(
    "card-template"
  ) as HTMLTemplateElement
  const container = document.querySelector(".main .container")

  countries.forEach((country) => {
    const node = cardTemplate.content.cloneNode(true) as HTMLElement
    const formattedPopulation: string =
      country.population.toLocaleString()
    node.querySelector("h2")!.textContent = country.name
    node.querySelector("img")!.src = country.flag
    node.querySelector("img")!.alt = `${country.name} Flag`
    node.querySelector(".card-population")!.textContent =
      formattedPopulation
    node.querySelector(".card-region")!.textContent = country.region
    node.querySelector(".card-capital")!.textContent = country.capital

    container!.appendChild(node)
  })
}
