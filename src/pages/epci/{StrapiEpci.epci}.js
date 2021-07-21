import React from "react"
import CommuneList from "../../components/CommuneList"
import { graphql, Link } from "gatsby"
import Layout from "../../components/layout"
import { Breadcrumbs, Typography } from "@material-ui/core"

const EpciTemplate = ({ data }) => {
  const { communes, epci, etiq_epci } = data.strapiEpci

  const { nom, dpt } = data.strapiDepartement
  return (
    <Layout>
      <Breadcrumbs>
        <Link to={`/departement/${dpt}`}>{nom}</Link>
      </Breadcrumbs>
      <Typography variant="h1">{etiq_epci}</Typography>
      <CommuneList communes={data.allStrapiCommune.nodes} />
    </Layout>
  )
}
export const query = graphql`
  query getEpciByInsee($epci: Int) {
    strapiEpci(epci: { eq: $epci }) {
      communes {
        commune_nv
        departement {
          nom
          dpt
        }
        insee_nv
        epci {
          epci
          etiq_epci
        }
        sites {
          numero
          nom_corrige_dbr
          eple
        }
      }
      epci
      etiq_epci
      strapiId
    }
  }
`

export default EpciTemplate
