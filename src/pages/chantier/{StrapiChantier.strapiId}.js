import React from "react"

import { graphql, Link } from "gatsby"
import Layout from "../../components/layout"
import {
  Breadcrumbs,
  Typography,
  Paper,
  Switch,
  FormGroup,
  FormControlLabel,
} from "@material-ui/core"
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@material-ui/lab"
import { FormControl } from "@material-ui/core"

const ChantierTemplate = ({ data }) => {
  const {
    ap_est,
    comite_proj,
    cpe,
    date_deliberation,
    dfap,
    etape,
    etat,
    fin_tvx_date_prev,
    id,
    notif_ent_date_prev,
    notif_moe_date_prev,
    numero,
    operation,
    plan_relance,
    priorite,
    strapiId,
    remise_prog_date_prev,
    site,
  } = data.strapiChantier
  console.log(cpe)
  return (
    <Layout>
      {site && (
        // un chantier peut-être multi-site, auquel cas on ne peut pas afficher le fil d’ariane
        <Breadcrumbs>
          <Link to={`/departement/${site.commune.departement.dpt}`}>
            {site.commune.departement.nom}
          </Link>
          <Link to={`/commune/${site.commune.insee_nv}`}>
            {site.commune.commune_nv}
          </Link>
          <Link to={`/sites/${site.numero}`}>{site.nom_corrige_dbr}</Link>
        </Breadcrumbs>
      )}
      <Typography variant="h1">{operation}</Typography>
      <FormControl component="fieldset">
        <FormGroup aria-label="position" row>
          <FormControlLabel
            control={<Switch checked={cpe} color="primary" />}
            label="CPE"
            labelPlacement="top"
          />
          <FormControlLabel
            control={<Switch checked={dfap} color="primary" />}
            label="DFAP"
            labelPlacement="top"
          />
          <FormControlLabel
            control={<Switch checked={plan_relance} color="primary" />}
            label="Plan de relance"
            labelPlacement="top"
          />
          <FormControlLabel
            control={<Switch checked={comite_proj} color="primary" />}
            label="Comité de projet"
            labelPlacement="top"
          />
        </FormGroup>
      </FormControl>

      <Typography>Priorité : {priorite}</Typography>
      <Typography>Montant estimé : {ap_est}</Typography>
      <Timeline align="alternate">
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Paper elevation={3}>
              <Typography>{remise_prog_date_prev}</Typography>
              <Typography>Remise prog date prev</Typography>
            </Paper>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Paper elevation={3}>
              <Typography>{notif_moe_date_prev}</Typography>
              <Typography>Notification MOE date prev</Typography>
            </Paper>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Paper elevation={3}>
              <Typography>{notif_ent_date_prev}</Typography>
              <Typography>Notification entreprise date prev</Typography>
            </Paper>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Paper elevation={3}>
              <Typography>{fin_tvx_date_prev}</Typography>
              <Typography>Remise prog date prev</Typography>
            </Paper>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
      <Typography> Etape : {etape ? etape.etape : "non renseignée"}</Typography>
    </Layout>
  )
}

export const query = graphql`
  query getChantierById($strapiId: Int) {
    strapiChantier(strapiId: { eq: $strapiId }) {
      ap_est
      comite_proj
      cpe
      date_deliberation
      etape {
        etape
        ordre
        id
      }
      etat
      fin_tvx_date_prev(formatString: "DD/MM/YYYY")
      id
      notif_ent_date_prev(formatString: "DD/MM/YYYY")
      notif_moe_date_prev(formatString: "DD/MM/YYYY")
      numero
      operation
      plan_relance
      priorite
      strapiId
      remise_prog_date_prev(formatString: "DD/MM/YYYY")
      site {
        commune {
          insee_nv
          commune_nv
          departement {
            dpt
            nom
          }
        }
        nom_corrige_dbr
        etiquet_s
        etiquet
        numero
        code_uai_rattachement
      }
    }
  }
`

export default ChantierTemplate
