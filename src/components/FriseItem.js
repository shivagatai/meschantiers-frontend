import React from "react"
import { makeStyles } from "@material-ui/core/styles"

import { Typography, Paper, Divider } from "@material-ui/core"

import {
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
} from "@material-ui/lab"

const useStyles = makeStyles(theme => ({
  paper: {
    padding: "6px 16px",
  },
  dateItem: {
    fontWeight: "bolder",
    fontSize: "1.2 rem",
  },
}))

const FriseItem = ({ evt_date, item, icon, display = true }) => {
  const classes = useStyles()

  return (
    <TimelineItem>
      <TimelineOppositeContent>
        <Typography className={classes.dateItem}>
          {evt_date.setLocale("fr").toLocaleString()}
        </Typography>
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineDot color="primary">{icon()}</TimelineDot>
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>
        <Paper elevation={3} className={classes.paper}>
          {item()}
        </Paper>
      </TimelineContent>
    </TimelineItem>
  )
}

export default FriseItem
