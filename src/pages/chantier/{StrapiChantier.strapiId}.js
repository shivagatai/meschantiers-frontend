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
import { budgetFormat } from "../../utils/Utils"
import BudgetFriseItem from "../../components/BudgetFriseItem"
import RevueFriseItem from "../../components/RevueFriseItem"
import DatePrevFriseItem from "../../components/DatePrevFriseItem"
import DateReelFriseItem from "../../components/DateReelFriseItem"

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

  // Construction du tableau des événements sur ce chantier
  const events = buildEventArray(budgets, revues, remise_prog_date_prev, notif_moe_date_prev, notif_ent_date_prev, fin_tvx_date_prev, remise_prog_date_reel, notif_moe_date_reel, notif_ent_date_reel, fin_tvx_date_reel)

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

      <Frise events={events.filter(evt => evt.props.display)} />
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


function buildEventArray(budgets, revues, remise_prog_date_prev, notif_moe_date_prev, notif_ent_date_prev, fin_tvx_date_prev, remise_prog_date_reel, notif_moe_date_reel, notif_ent_date_reel, fin_tvx_date_reel) {
  const events = []
  if (budgets) {
    budgets.forEach(budget => {
      const { date_suivi_budget, engagement_total, mandatement_total } = budget
      events.push(
        <BudgetFriseItem evt_date={DateTime.fromISO(date_suivi_budget)}
          engagement_total={engagement_total}
          mandatement_total={mandatement_total} />
      )
    })
  }
  if (revues) {
    revues.forEach(revue => {
      const { date_maj, info_cles, info_marches } = revue
      events.push(
        <RevueFriseItem evt_date={DateTime.fromISO(date_maj)}
          info_cles={info_cles}
          info_marches={info_marches} />
      )
    })
  }

  const date_prev = [
    {
      value: remise_prog_date_prev,
      label: "Date prévue de remise du programme",
    },
    {
      value: notif_moe_date_prev,
      label: "Date prévue de notification du maître d’œuvre",
    },
    {
      value: notif_ent_date_prev,
      label: "Date prévue de notification des entreprises",
    },
    { value: fin_tvx_date_prev, label: "Date prévue de fin des travaux" },
  ]

  date_prev.forEach(({ value, label }) => {
    if (value) {
      events.push(
        <DatePrevFriseItem
          evt_date={DateTime.fromISO(value)}
          label={label} />
      )
    }
  })

  const date_reel = [
    {
      value: remise_prog_date_reel,
      label: "Date réelle de remise du programme",
    },
    {
      value: notif_moe_date_reel,
      label: "Date réelle de notification du maître d’œuvre",
    },
    {
      value: notif_ent_date_reel,
      label: "Date réelle de notification des entreprises",
    },
    { value: fin_tvx_date_reel, label: "Date réelle de fin des travaux" },
  ]

  date_reel.forEach(({ value, label }) => {
    if (value) {
      events.push(
        <DateReelFriseItem
          evt_date={DateTime.fromISO(value)}
          label={label} />
      )
    }
  })
  return events
}

