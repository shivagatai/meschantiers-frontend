import React from "react"
import { Typography } from "@material-ui/core"
import { DateTime } from "luxon"

const Etape = ({ etape, livraison }) => {
  if (etape) {
    //  let msg = `${etape.ordre}. ${etape.etape}`
    let msg = etape.etape
    // 11 = statut livré
    if (11 === etape.ordre && livraison) {
      msg =
        msg +
        " le " +
        DateTime.fromISO(livraison)
          .setLocale("fr")
          .toLocaleString(DateTime.DATE_FULL)
    }
  }

  return (
    <>
      {etape && <Typography>Étape : {msg}</Typography>}
      {!etape && <Typography>Étape : non renseignée</Typography>}
    </>
  )
}

export default Etape
