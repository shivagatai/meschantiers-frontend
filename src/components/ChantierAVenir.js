import React from "react"
import ChantierList from "./ChantierList"
import { Typography } from "@material-ui/core"
import { useStaticQuery, graphql } from "gatsby"
import { DateTime } from "luxon"

const queryChantiersAVenir = graphql`
  {
    allStrapiChantier(
      sort: { fields: prevu___fin_tvx, order: DESC }
      filter: { etape: { ordre: { eq: 10 } } }
    ) {
      nodes {
        id: strapiId
        numero
        prevu {
          fin_tvx
        }
        operation
        site {
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

const ChantierAVenir = () => {
  const data = useStaticQuery(queryChantiersAVenir)
  const nextChantiers = data.allStrapiChantier.nodes

  const nextChantiersWithFinTvxNotNull = nextChantiers.filter(
    chantier => chantier.prevu.fin_tvx
  )
  const twoMonthsNextChantiersLivres = nextChantiersWithFinTvxNotNull.filter(
    chantier =>
      DateTime.fromISO(chantier.prevu.fin_tvx) <=
      DateTime.now().plus({ months: 1 })
  )

  return (
    <>
      <Typography variant="h1">
        {twoMonthsNextChantiersLivres.length} chantiers à livrer le mois
        prochain
      </Typography>
      <ChantierList chantiers={twoMonthsNextChantiersLivres} />
    </>
  )
}

export default ChantierAVenir
