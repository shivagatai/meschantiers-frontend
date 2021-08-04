import React from "react"

import { graphql, Link } from "gatsby"
import Layout from "../../components/layout"
import { Breadcrumbs, Typography } from "@material-ui/core"

import { DateTime } from "luxon"

import { makeStyles } from "@material-ui/core/styles"

import Frise from "../../components/Frise"
import { budgetFormat } from "../../utils/Utils"
import BudgetFriseItem from "../../components/BudgetFriseItem"
import RevueFriseItem from "../../components/RevueFriseItem"
import DatePrevFriseItem from "../../components/DatePrevFriseItem"
import DateReelFriseItem from "../../components/DateReelFriseItem"
import MarcheFriseItem from "../../components/MarcheFriseItem"
import Etape from "../../components/Etape"
import ChipChantier from "../../components/ChipChantier"

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
    prevu,
    reel,
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
    evt_marches,
  } = data.strapiChantier

  // Construction du tableau des événements sur ce chantier
  const events = buildEventArray(budgets, revues, prevu, reel, evt_marches)

  //  console.log(events)
  const toto = {
    cpe,
    dfap,
    plan_relance,
    comite_proj,
    priorite,
    categorie_travaux,
    fonction_associee,
  }
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

      <ChipChantier chantier={toto} />
      <Typography>Code chantier : {numero}</Typography>
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
      <Etape etape={etape} livraison={reel["fin_tvx"]} />
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
      id
      numero
      operation
      plan_relance
      priorite
      strapiId
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
      fonction_associee
      categorie_travaux
      dfap
      prevu {
        remise_prog
        notif_moe
        notif_ent
        fin_tvx
      }
      reel {
        remise_prog
        notif_moe
        notif_ent
        fin_tvx
      }
      budgets {
        cout_previsionnel_operation
        date_suivi_budget
        engagement_total
        mandatement_exercice_en_cours
        mandatement_total
        reste_a_engager_sur_operation
        reste_a_mandater_sur_engagement
        reste_a_mandater_sur_operation
        id
      }
      evt_marches {
        jalon_date
        observations
        type
        id
      }
    }
  }
`

export default ChantierTemplate

/**
 *
 * @param {*} budgets
 * @param {*} revues
 * @param {*} prevu Composant Strapi Projet.planning
 * @param {*} reel Composant Strapi Projet.planning
 * @returns
 */
function buildEventArray(budgets, revues, prevu, reel, evt_marches) {
  const events = []
  if (budgets) {
    budgets.forEach(budget => {
      const {
        date_suivi_budget,
        engagement_total,
        mandatement_total,
        id,
      } = budget
      events.push(
        <BudgetFriseItem
          key={id}
          evt_date={DateTime.fromISO(date_suivi_budget)}
          engagement_total={engagement_total}
          mandatement_total={mandatement_total}
        />
      )
    })
  }
  if (revues) {
    revues.forEach(revue => {
      const { date_maj, info_cles, info_marches, id } = revue
      events.push(
        <RevueFriseItem
          key={id}
          evt_date={DateTime.fromISO(date_maj)}
          info_cles={info_cles}
          info_marches={info_marches}
        />
      )
    })
  }

  const date_prev = [
    {
      value: prevu.remise_prog,
      label: "Date prévue de remise du programme",
    },
    {
      value: prevu.notif_moe,
      label: "Date prévue de notification du maître d’œuvre",
    },
    {
      value: prevu.notif_ent,
      label: "Date prévue de notification des entreprises",
    },
    { value: prevu.fin_tvx, label: "Date prévue de fin des travaux" },
  ]

  // console.log(date_prev)
  //  console.log(events)

  date_prev.forEach(({ value, label }) => {
    if (value) {
      events.push(
        <DatePrevFriseItem evt_date={DateTime.fromISO(value)} label={label} />
      )
    }
  })
  // console.log(events)

  const date_reel = [
    {
      value: reel.remise_prog,
      label: "Date réelle de remise du programme",
    },
    {
      value: reel.notif_moe,
      label: "Date réelle de notification du maître d’œuvre",
    },
    {
      value: reel.notif_ent,
      label: "Date réelle de notification des entreprises",
    },
    { value: reel.fin_tvx, label: "Date réelle de fin des travaux" },
  ]

  date_reel.forEach(({ value, label }) => {
    if (value) {
      events.push(
        <DateReelFriseItem evt_date={DateTime.fromISO(value)} label={label} />
      )
    }
  })

  if (evt_marches) {
    evt_marches.forEach(({ jalon_date, observations, type }) => {
      events.push(
        <MarcheFriseItem
          evt_date={DateTime.fromISO(jalon_date)}
          type={type}
          obs={observations}
        />
      )
    })
  }
  return events
}
