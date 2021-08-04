import React from "react"

import { graphql, useStaticQuery } from "gatsby"
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@material-ui/core"

import ChantierList from "./ChantierList"

const AllChantiers = ({}) => {
  const [expanded, setExpanded] = React.useState("panel1")

  const handleChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false)
  }

  const data = useStaticQuery(query)
  const groupByEtape = data.allStrapiEtape.nodes

  // on affiche le résultat par groupe
  return groupByEtape.map(({ id, ordre, etape, chantiers }) => {
    return (
      <Accordion
        key={id}
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
        id
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
            id
            nom_corrige_dbr
            numero
            eple
          }
          id
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
  }
`

export default AllChantiers
