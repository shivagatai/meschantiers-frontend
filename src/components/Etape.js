import React from "react"
import { Typography } from "@material-ui/core"
import { DateTime } from "luxon"

const Etape = ({ etape, livraison }) => {
  let msg = "non renseignée"
  if (etape) {
    //  let msg = `${etape.ordre}. ${etape.etape}`
    msg = etape.etape
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

  return <Typography>Étape : {msg}</Typography>
}

export default Etape
