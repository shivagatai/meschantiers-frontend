import React from "react"
import ChantierList from "../components/ChantierList"
import { Typography } from "@material-ui/core"
import { useStaticQuery, graphql } from "gatsby"

const queryDernierChantiersLivres = graphql`
  {
    allStrapiChantier(
      sort: { fields: reel___fin_tvx, order: DESC }
      filter: { etape: { ordre: { eq: 11 } } }
    ) {
      nodes {
        id: strapiId
        numero
        reel {
          fin_tvx
        }
        operation
        cpe
        plan_relance
        comite_proj
        dfap
        priorite
        site {
          id
          nom_corrige_dbr
          eple
          numero
        }
        etape {
          etape
          ordre
        }
      }
    }
  }
`

const LastChantierLivres = () => {
  const data = useStaticQuery(queryDernierChantiersLivres)
  const lastChantiers = data.allStrapiChantier.nodes

  const lastChantiersWithFinTvxNotNull = lastChantiers.filter(
    chantier => chantier.reel.fin_tvx
  )
  const fiveLastChantiersLivres = lastChantiersWithFinTvxNotNull.slice(0, 5)

  return (
    <>
      <Typography variant="h1">
        Liste des cinq derniers chantiers livrés
      </Typography>
      <ChantierList chantiers={fiveLastChantiersLivres} />
    </>
  )
}

export default LastChantierLivres
