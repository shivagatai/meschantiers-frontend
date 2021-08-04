import React from "react"
import { graphql, Link } from "gatsby"
import ChantierList from "../../components/ChantierList"
import Layout from "../../components/layout"
import { Breadcrumbs, Typography } from "@material-ui/core"

const SiteTemplate = ({ data }) => {
  const {
    etiquet_s,
    etiquet,
    eple,
    numero,
    nom_corrige_dbr,
    commune: { epci, commune_nv, insee_nv, departement },
    code_uai_rattachement,
    chantiers,
  } = data.strapiSite
  return (
    <Layout>
      <Breadcrumbs>
        <Link to={`/departement/${departement.dpt}`}>{departement.nom}</Link>
        <Link to={`/commune/${insee_nv}`}>{commune_nv}</Link>
      </Breadcrumbs>
      <Typography variant="h1">{nom_corrige_dbr}</Typography>

      <ChantierList chantiers={chantiers} />
    </Layout>
  )
}

export const query = graphql`
  query getSiteById($strapiId: Int) {
    strapiSite(strapiId: { eq: $strapiId }) {
      etiquet_s
      etiquet
      eple
      strapiId
      numero
      nom_corrige_dbr
      commune {
        epci
        commune_nv
        insee_nv
        departement {
          dpt
          nom
        }
      }
      code_uai_rattachement
      chantiers {
        operation
        numero
        cpe
        dfap
        plan_relance
        comite_proj
        priorite
        fonction_associee
        categorie_travaux
        id
        site
        etape {
          etape
          ordre
        }
        revues {
          date_maj
        }
      }
    }
  }
`

export default SiteTemplate
