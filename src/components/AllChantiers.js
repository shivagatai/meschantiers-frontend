import React from "react"

import { graphql, useStaticQuery } from "gatsby"
import CommuneList from "./CommuneList"
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@material-ui/core"
import Etape from "./Etape"
import ChantierList from "./ChantierList"

const AllChantiers = () => {
  const [expanded, setExpanded] = React.useState("panel1")

  const handleChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false)
  }

  const data = useStaticQuery(query)
  const groupByEtape = data.allStrapiEtape.nodes

  // graphql trie par défaut ordre alphabétique, si bien que 10 est devant 2
  // donc on retrie le tableau en forçant la comparaison numérique
  //groupByEtape.sort(function (a, b) {
  //  return Number(a.nodes[0].etape.ordre) - Number(b.nodes[0].etape.ordre)
  //})

  // on affiche le résultat par groupe
  return groupByEtape.map(({ ordre, etape, chantiers }) => {
    return (
      <Accordion
        square
        expanded={expanded === `step${ordre}`}
        onChange={handleChange(`step${ordre}`)}
      >
        <AccordionSummary
          aria-controls={`panel${ordre}d-content`}
          id={`panel${ordre}d-content`}
        >
          {ordre}. {etape} : {chantiers.length} chantiers
        </AccordionSummary>
        <AccordionDetails>
          <ChantierList chantiers={chantiers} />
        </AccordionDetails>
      </Accordion>
    )
  })
}

const query = graphql`
  {
    allStrapiEtape(sort: { fields: ordre }) {
      nodes {
        ordre
        etape
        chantiers {
          operation
          priorite
          cpe
          dfap
          plan_relance
          comite_proj
          numero
          site {
            nom_corrige_dbr
            numero
            eple
          }
          id
          etape {
            etape
            ordre
          }
        }
      }
    }
  }
`

export default AllChantiers
