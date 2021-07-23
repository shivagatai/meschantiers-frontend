import React from "react"

import { Typography } from "@material-ui/core"

import EventOutlinedIcon from "@material-ui/icons/EventOutlined"

import { DateTime } from "luxon"

import FriseItem from "./FriseItem"

const DatePrevFriseItem = ({ evt_date, label }) => {
  const renderSwitch = () => {
    return <Typography>{label}</Typography>
  }

  const renderIcon = () => {
    return <EventOutlinedIcon />
  }

  // On n’affiche que les dates prévisionnelles situées dans le futur
  const displayItem = evt_date >= DateTime.now()

  const getDate = () => {
    return evt_date
  }

  return (
    <FriseItem
      item={() => renderSwitch()}
      icon={() => renderIcon()}
      evt_date={evt_date}
      display={displayItem}
    />
  )
}

export default DatePrevFriseItem
