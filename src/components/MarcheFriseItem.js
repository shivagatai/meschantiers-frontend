import React from "react"

import { Typography } from "@material-ui/core"

import AccountBalanceOutlinedIcon from "@material-ui/icons/AccountBalanceOutlined"

import FriseItem from "./FriseItem"

const MarcheFriseItem = ({ evt_date, label, obs }) => {
  const renderSwitch = () => {
    return (
      <>
        <Typography>{label}</Typography>
        <Typography>{obs}</Typography>
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
