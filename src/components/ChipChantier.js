import React from "react"

import { Chip } from "@material-ui/core"

import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
}))

const ChipChantier = params => {
  const classes = useStyles()

  const {
    cpe,
    dfap,
    plan_relance,
    comite_proj,
    priorite,
    categorie_travaux,
    fonction_associee,
  } = params.chantier

  const handleClick = evt => {
    console.info("You clicked the Chip.")
    console.info(evt)
  }

  const handleClickCPE = evt => {
    console.info("You clicked the Chip.")
    console.info({ filter: { CPE: true } })
  }

  const handleClickPriorite = evt => {
    console.info("You clicked the Chip.")
    console.info({ filter: { priorite: priorite } })
  }

  return (
    <div className={classes.root}>
      {cpe && <Chip label="CPE" onClick={handleClickCPE} color="secondary" />}
      {dfap && <Chip label="DFAP" onClick={handleClick} color="secondary" />}
      {plan_relance && (
        <Chip label="Plan de relance" onClick={handleClick} color="secondary" />
      )}
      {comite_proj && (
        <Chip
          label="Comité de projet"
          onClick={handleClick}
          color="secondary"
        />
      )}
      {categorie_travaux && (
        <Chip
          label={categorie_travaux}
          onClick={handleClick}
          color="secondary"
        />
      )}
      {fonction_associee && (
        <Chip
          label={fonction_associee}
          onClick={handleClick}
          color="secondary"
        />
      )}
      {priorite && (
        <Chip
          label={`Priorité ${priorite}`}
          onClick={handleClickPriorite}
          color="secondary"
        />
      )}
    </div>
  )
}

export default ChipChantier
