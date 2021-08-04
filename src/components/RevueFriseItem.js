import React from "react"
import { makeStyles } from "@material-ui/core/styles"

import { Typography, Divider } from "@material-ui/core"

import AssignmentOutlinedIcon from "@material-ui/icons/AssignmentOutlined"
import ChatOutlinedIcon from "@material-ui/icons/ChatOutlined"

import FriseItem from "./FriseItem"

const useStyles = makeStyles(theme => ({
  revue: {
    paddingRight: "3px",
    marginTop: "2px",
  },
}))

const RevueFriseItem = ({ id, evt_date, info_cles, info_marches }) => {
  const classes = useStyles()
  const renderSwitch = () => {
    return (
      <>
        <Typography>
          <ChatOutlinedIcon fontSize="small" className={classes.revue} />
          {info_cles}
        </Typography>
        <Divider light />

        <Typography>
          <ChatOutlinedIcon fontSize="small" className={classes.revue} />
          {info_marches}
        </Typography>
      </>
    )
  }

  const renderIcon = () => {
    return <AssignmentOutlinedIcon />
  }

  const getKey = () => {
    return `frise${id}`
  }

  return (
    <FriseItem
      id={() => getKey()}
      key={() => getKey()}
      item={() => renderSwitch()}
      icon={() => renderIcon()}
      evt_date={evt_date}
      display={true}
    />
  )
}

export default RevueFriseItem
