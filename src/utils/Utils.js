const budgetFormat = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
})

const percentFormat = new Intl.NumberFormat("fr-FR", {
  style: "percent",
  maximumFractionDigits: 0,
})

export { budgetFormat, percentFormat }
