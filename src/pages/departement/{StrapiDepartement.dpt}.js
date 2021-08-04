import React from "react"

import { graphql } from "gatsby"
import Layout from "../../components/layout"
import { Typography } from "@material-ui/core"
import CommuneList from "../../components/CommuneList"

const DepartementTemplate = ({ data }) => {
  const { dpt, nom, communes } = data.strapiDepartement
  return (
    <Layout>
      <Typography variant="h1">{nom}</Typography>
      <CommuneList communes={communes} />
    </Layout>
  )
}

export const query = graphql`
  query getDepartementByNumero($dpt: Int) {
    strapiDepartement(dpt: { eq: $dpt }) {
      communes {
        commune_nv
        insee_nv
        epci {
          epci
          etiq_epci
        }
        sites {
          id
          numero
          nom_corrige_dbr
          eple
        }
      }
      dpt
      nom
    }
  }
`

export default DepartementTemplate
