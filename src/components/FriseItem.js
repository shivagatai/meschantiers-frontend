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
import { DateTime } from "luxon"

const useStyles = makeStyles(theme => ({
  paper: {
    padding: "6px 16px",
  },
  dateItem: {
    fontWeight: "bolder",
    fontSize: "1.2 rem",
  },
}))

const FriseItem = ({ key, evt_date, item, icon, display = true }) => {
  const classes = useStyles()

  return (
    <>
      {display && (
        <TimelineItem key={key}>
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
      )}
    </>
  )
}

export default FriseItem
