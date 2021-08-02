import React from "react"

import { Typography } from "@material-ui/core"

import AccountBalanceOutlinedIcon from "@material-ui/icons/AccountBalanceOutlined"

import FriseItem from "./FriseItem"

const MarcheFriseItem = ({ evt_date, type, obs }) => {

  const label = {
    receptdoss : "Date de réception du dossier",
    envoisdm : "Date d'envoi du dossier au service des marchés",
    publicite: "Date de publication de l'appel d'offres",
    remiseoffre: "Date de remise des offres",
    envoiplismoe: "Date d'envoi des offres au MOE",
    analyse: "Date de fin d'analyse",
    envoi_analyse_sdm: "Date d'envoi de l'analyse au service des marchés",
    cao: "Date de la CAO",
    notification: "Date de notification",
  }

  const renderSwitch = () => {
    return (
      <>
        <Typography>{label[type]}</Typography>
        {obs && 
        <Typography>{obs}</Typography>
      }
      </>
    )
  }

  const renderIcon = () => {
    return <AccountBalanceOutlinedIcon />
  }

  return (
    <FriseItem
      item={() => renderSwitch()}
      icon={() => renderIcon()}
      evt_date={evt_date}
      display={true}
    />
  )
}

export default MarcheFriseItem
