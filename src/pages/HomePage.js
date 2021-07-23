import React from "react"
import ChantierList from "../components/ChantierList"
import { Typography } from "@material-ui/core"
import { useStaticQuery, graphql } from "gatsby"

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
      <Typography variant="h1">
        Liste des cinq derniers chantiers livrés
      </Typography>
      <Typography variant="h1">Liste des chantiers à venir</Typography>
    </>
  )
}

{
  /*
export const queryDernierChantiersLivres = graphql`
  query DernierChantiersLivres($now: Date) {
    allStrapiChantier(
      sort: { fields: fin_tvx_date_reel, order: DESC }
      filter: { fin_tvx_date_reel: { lt: $now } }
      limit: 5
    ) {
      nodes {
        numero
        fin_tvx_date_reel
      }
    }
  }
`

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
