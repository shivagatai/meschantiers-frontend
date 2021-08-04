import React from "react"

import ChantierList from "../../../components/ChantierList"
import Layout from "../../../components/layout"
import { graphql, Link } from "gatsby"

const ChantierTemplateByPriorite = ({ data }) => {
  const chantiers = data.allStrapiChantier.nodes
  return (
    <Layout>
      <ChantierList chantiers={chantiers} />
    </Layout>
  )
}

export const query = graphql`
  query getAllChantierByPriorite($priorite: Int) {
    allStrapiChantier(filter: { priorite: { eq: $priorite } }) {
      nodes {
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
        numero
        operation
        plan_relance
        priorite
        id: strapiId
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
      totalCount
    }
  }
`
export default ChantierTemplateByPriorite
