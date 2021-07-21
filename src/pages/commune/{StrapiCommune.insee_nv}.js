import React from "react"

import { graphql, Link } from "gatsby"
import Layout from "../../components/layout"
import {
  Breadcrumbs,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from "@material-ui/core"

import ApartmentOutlinedIcon from "@material-ui/icons/ApartmentOutlined"
import SchoolOutlinedIcon from "@material-ui/icons/SchoolOutlined"

const CommuneTemplate = ({ data }) => {
  const {
    commune_nv,
    insee_nv,
    strapiId,
    epci: { epci, etiq_epci },
    departement: { dpt, nom },
    sites,
  } = data.strapiCommune

  return (
    <Layout>
      <Breadcrumbs>
        <Link to={`/departement/${dpt}`}>{nom}</Link>
      </Breadcrumbs>
      <Typography variant="h1">Commune {commune_nv}</Typography>
      {sites.map(site => {
        const { eple, etiquet, etiquet_s, nom_corrige_dbr, numero } = site
        const siteIcon =
          eple === "EPLE" ? <SchoolOutlinedIcon /> : <ApartmentOutlinedIcon />

        return (
          <Card>
            <CardHeader title={nom_corrige_dbr} />
            <CardContent>
              <Typography>{siteIcon}</Typography>
            </CardContent>
            <CardActions>
              <Button to={`/sites/${numero}`} component={Link}>
                Voir le détail
              </Button>
            </CardActions>
          </Card>
        )
      })}
    </Layout>
  )
}

export const query = graphql`
  query getCommuneByInsee($insee_nv: Int) {
    strapiCommune(insee_nv: { eq: $insee_nv }) {
      sites {
        eple
        etiquet
        etiquet_s
        nom_corrige_dbr
        numero
      }
      commune_nv
      epci {
        epci
        etiq_epci
      }
      insee_nv
      strapiId
      departement {
        dpt
        nom
      }
    }
  }
`

export default CommuneTemplate
