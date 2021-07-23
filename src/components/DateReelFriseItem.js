import React from "react"

import { Typography } from "@material-ui/core"

import EventOutlinedIcon from "@material-ui/icons/EventOutlined"
import DoneOutlineOutlinedIcon from "@material-ui/icons/DoneOutlineOutlined"
import { DateTime } from "luxon"

import FriseItem from "./FriseItem"

const DateReelFriseItem = ({ evt_date, label }) => {
  const renderSwitch = () => {
    return <Typography>{label}</Typography>
  }

  const renderIcon = () => {
    return label === "Date réelle de fin des travaux" ? (
      <DoneOutlineOutlinedIcon />
    ) : (
      <EventOutlinedIcon />
    )
  }

  // On n’affiche que les dates réelles situées dans le passé
  const displayItem = evt_date <= DateTime.now()

  return (
    <FriseItem
      item={() => renderSwitch()}
      icon={() => renderIcon()}
      evt_date={evt_date}
      display={displayItem}
    />
  )
}

export default DateReelFriseItem
