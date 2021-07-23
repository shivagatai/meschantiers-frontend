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

import { DateTime } from "luxon"

import { FormControl } from "@material-ui/core"
import Frise from "../../components/Frise"

const ChantierTemplate = ({ data }) => {
  const {
    ap_est,
    comite_proj,
    cpe,
    date_deliberation,
    dfap,
    etape,
    etat,
    id,
    notif_ent_date_prev,
    notif_moe_date_prev,
    remise_prog_date_prev,
    fin_tvx_date_prev,
    notif_ent_date_reel,
    notif_moe_date_reel,
    remise_prog_date_reel,
    fin_tvx_date_reel,
    numero,
    operation,
    plan_relance,
    priorite,
    strapiId,
    site,
    categorie_travaux,
    fonction_associee,
    budgets,
    revues,
  } = data.strapiChantier
  console.log(cpe)
  const budgetFormat = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  })

  // Construction du tableau des événements sur ce chantier
  const events = []
  if (budgets) {
    budgets.forEach(budget => {
      const { date_suivi_budget, engagement_total, mandatement_total } = budget
      events.push({
        evt_date: DateTime.fromISO(date_suivi_budget),
        evt_type: Frise.EventType.BUDGET,
        engagement_total,
        mandatement_total,
      })
    })
  }
  if (revues) {
    revues.forEach(revue => {
      const { date_maj, info_cles, info_marches } = revue
      events.push({
        evt_date: DateTime.fromISO(date_maj),
        evt_type: Frise.EventType.REVUE,
        info_cles,
        info_marches,
      })
    })
  }
  if (remise_prog_date_prev) {
    events.push({
      evt_date: DateTime.fromISO(remise_prog_date_prev),
      evt_type: Frise.EventType.DATE_PREV,
      label: "Date prévue de remise du programme",
    })
  }
  if (notif_moe_date_prev) {
    events.push({
      evt_date: DateTime.fromISO(notif_moe_date_prev),
      evt_type: Frise.EventType.DATE_PREV,
      label: "Date prévue de notification du maître d’œuvre",
    })
  }
  if (notif_ent_date_prev) {
    events.push({
      evt_date: DateTime.fromISO(notif_ent_date_prev),
      evt_type: Frise.EventType.DATE_PREV,
      label: "Date prévue de notification des entreprises",
    })
  }
  if (fin_tvx_date_prev) {
    events.push({
      evt_date: DateTime.fromISO(fin_tvx_date_prev),
      evt_type: Frise.EventType.DATE_PREV,
      label: "Date prévue de fin des travaux",
    })
  }
  if (remise_prog_date_reel) {
    events.push({
      evt_date: DateTime.fromISO(remise_prog_date_reel),
      evt_type: Frise.EventType.DATE_REEL,
      label: "Date réelle de remise du programme",
    })
  }
  if (notif_moe_date_reel) {
    events.push({
      evt_date: DateTime.fromISO(notif_moe_date_reel),
      evt_type: Frise.EventType.DATE_REEL,
      label: "Date réelle de notification du maître d’œuvre",
    })
  }
  if (notif_ent_date_reel) {
    events.push({
      evt_date: DateTime.fromISO(notif_ent_date_reel),
      evt_type: Frise.EventType.DATE_REEL,
      label: "Date réelle de notification des entreprises",
    })
  }
  if (fin_tvx_date_reel) {
    events.push({
      evt_date: DateTime.fromISO(fin_tvx_date_reel),
      evt_type: Frise.EventType.DATE_REEL,
      label: "Date réelle de fin des travaux",
    })
  }

  //  console.log(events)

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

      <Typography>Catégorie travaux : {categorie_travaux}</Typography>
      <Typography>Fonction associée : {fonction_associee}</Typography>
      <Typography>Priorité : {priorite}</Typography>
      <Typography>
        Estimation SMOCT : {budgetFormat.format(parseFloat(ap_est))}
      </Typography>
      {budgets && 0 !== budgets.length && (
        <Typography>
          Estimation GDA :{" "}
          {budgetFormat.format(
            parseFloat(budgets.pop().cout_previsionnel_operation)
          )}
        </Typography>
      )}

      <Typography> Etape : {etape ? etape.etape : "non renseignée"}</Typography>

      <Frise events={events} />
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
      fin_tvx_date_prev
      id
      notif_ent_date_prev
      notif_moe_date_prev
      numero
      operation
      plan_relance
      priorite
      strapiId
      remise_prog_date_prev
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
      revues {
        date_maj
        info_cles
        info_marches
      }
      fin_tvx_date_reel
      fonction_associee
      categorie_travaux
      dfap
      remise_prog_date_reel
      notif_ent_date_reel
      budgets {
        cout_previsionnel_operation
        date_suivi_budget
        engagement_total
        mandatement_exercice_en_cours
        mandatement_total
        reste_a_engager_sur_operation
        reste_a_mandater_sur_engagement
        reste_a_mandater_sur_operation
      }
    }
  }
`

export default ChantierTemplate
