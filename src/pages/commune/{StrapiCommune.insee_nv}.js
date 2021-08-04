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
  Avatar,
  Grid,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import ApartmentOutlinedIcon from "@material-ui/icons/ApartmentOutlined"
import SchoolOutlinedIcon from "@material-ui/icons/SchoolOutlined"

const useStyles = makeStyles({
  root: {
    minWidth: 300,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
})

const CommuneTemplate = ({ data }) => {
  const classes = useStyles()
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
      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="flex-start"
        spacing={2}
      >
        {sites.map(site => {
          const {
            id,
            eple,
            etiquet,
            etiquet_s,
            nom_corrige_dbr,
            numero,
            chantiers,
          } = site
          const siteIcon =
            eple === "EPLE" ? <SchoolOutlinedIcon /> : <ApartmentOutlinedIcon />

          return (
            <Grid item xm key={id}>
              <Card className={classes.root}>
                <CardHeader
                  avatar={<Avatar>{siteIcon}</Avatar>}
                  title={nom_corrige_dbr}
                />
                <CardContent>
                  {!chantiers && (
                    <Typography>Pas de chantier recensé sur ce site</Typography>
                  )}
                  {chantiers && 0 == chantiers.length && (
                    <Typography>Pas de chantier recensé sur ce site</Typography>
                  )}
                  {chantiers && 1 == chantiers.length && (
                    <Typography>1 chantier</Typography>
                  )}
                  {chantiers && 1 < chantiers.length && (
                    <Typography>{chantiers.length} chantiers</Typography>
                  )}
                </CardContent>
                <CardActions>
                  <Button size="small" to={`/sites/${id}`} component={Link}>
                    Voir le détail
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          )
        })}
      </Grid>
    </Layout>
  )
}

export const query = graphql`
  query getCommuneByInsee($insee_nv: Int) {
    strapiCommune(insee_nv: { eq: $insee_nv }) {
      sites {
        id
        eple
        etiquet
        etiquet_s
        nom_corrige_dbr
        numero
        chantiers {
          id
        }
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
