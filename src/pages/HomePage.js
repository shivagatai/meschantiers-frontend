import React from "react"
import ChantierList from "../components/ChantierList"
import { Typography } from "@material-ui/core"
import { useStaticQuery, graphql } from "gatsby"
import LastChantierLivres from "../components/LastChantierLivres"
import ChantierAVenir from "../components/ChantierAVenir"

const chantiersComiteProjQuery = graphql`
  {
    allStrapiChantier(filter: { comite_proj: { eq: true } }) {
      nodes {
        id: strapiId
        numero
        operation
        comite_proj
        etape {
          etape
          ordre
        }
      }
      totalCount
    }
  }
`

const HomePage = () => {
  const data = useStaticQuery(chantiersComiteProjQuery)
  const chantiers = data.allStrapiChantier.nodes

  return (
    <>
      <Typography variant="h1">
        {data.allStrapiChantier.totalCount} chantiers à passer en revue au
        prochain comité de projet
      </Typography>
      <ChantierList chantiers={chantiers} />
      <LastChantierLivres />
      <ChantierAVenir />
    </>
  )
}

{
  /*

export const queryProchainChantiersLivres = graphql`
  query ProchainChantiersLivres($now: Date, $delai: Date) {
    allStrapiChantier(
      sort: { fields: fin_tvx_date_prev, order: ASC }
      filter: { fin_tvx_date_prev: { gte: $now, lt: $delai } }
    ) {
      nodes {
        numero
        fin_tvx_date_prev
      }
    }
  }
`
*/
}

export default HomePage
