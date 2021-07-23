import React from "react"
import { makeStyles } from "@material-ui/core/styles"

import { Typography, Paper, Divider } from "@material-ui/core"

import { DateTime } from "luxon"

import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from "@material-ui/lab"

import EuroSymbolOutlinedIcon from "@material-ui/icons/EuroSymbolOutlined"
import AssignmentOutlinedIcon from "@material-ui/icons/AssignmentOutlined"
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined"
import EventOutlinedIcon from "@material-ui/icons/EventOutlined"
import DoneOutlineOutlinedIcon from "@material-ui/icons/DoneOutlineOutlined"
import ChatOutlinedIcon from "@material-ui/icons/ChatOutlined"

import green from "@material-ui/core/colors/green"

class EventType {
  static get DATE_REEL() {
    return "date_reel"
  }
  static get DATE_PREV() {
    return "date_prev"
  }
  static get BUDGET() {
    return "budget"
  }
  static get REVUE() {
    return "revue"
  }
}

const useStyles = makeStyles(theme => ({
  paper: {
    padding: "6px 16px",
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
  dateItem: {
    fontWeight: "bolder",
    fontSize: "1.2 rem",
  },
  revue: {
    paddingRight: "3px",
    marginTop: "2px",
  },
}))

const Frise = ({ events = [] }) => {
  const classes = useStyles()

  const budgetFormat = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  })

  const percentFormat = new Intl.NumberFormat("fr-FR", {
    style: "percent",
    maximumFractionDigits: 0,
  })

  const renderSwitch = evt => {
    console.log(evt.evt_type)
    switch (evt.evt_type) {
      case EventType.REVUE:
        return (
          <>
            <Typography>
              <ChatOutlinedIcon fontSize="small" className={classes.revue} />
              {evt.info_cles}
            </Typography>
            <Divider light />

            <Typography>
              <ChatOutlinedIcon fontSize="small" className={classes.revue} />
              {evt.info_marches}
            </Typography>
          </>
        )
      case EventType.BUDGET:
        return (
          <>
            <Typography>
              Consommation budget :{" "}
              {percentFormat.format(
                evt.mandatement_total / evt.engagement_total
              )}
            </Typography>
            <Typography>
              Mandatement total : {budgetFormat.format(evt.mandatement_total)}
            </Typography>
            <Typography>
              Engagement total : {budgetFormat.format(evt.engagement_total)}
            </Typography>
          </>
        )
      case EventType.DATE_PREV:
      case EventType.DATE_REEL:
        return <Typography>{evt.label}</Typography>
      default:
        console.error("Unknown type event : " + evt.evt_type)
    }
  }

  const renderIcon = evt => {
    switch (evt.evt_type) {
      case EventType.REVUE:
        return <AssignmentOutlinedIcon />
      case EventType.BUDGET:
        return <EuroSymbolOutlinedIcon />

      case EventType.DATE_PREV:
        return <EventOutlinedIcon />
      case EventType.DATE_REEL:
        return evt.label === "Date réelle de fin des travaux" ? (
          <DoneOutlineOutlinedIcon />
        ) : (
          <EventOutlinedIcon />
        )
      default:
        return <ErrorOutlineOutlinedIcon />
    }
  }

  /** Fonction de tri dédiée au tableau d‘évènements */
  const custom_sort = (a, b) => {
    return a.evt_date - b.evt_date
  }
  const eventsFiltered = events.filter(
    evt => evt.evt_type !== EventType.DATE_PREV && evt.evt_date < DateTime.now()
  )
  eventsFiltered.sort(custom_sort).reverse()

  console.log(eventsFiltered)

  return (
    <Timeline align="alternate">
      {eventsFiltered.map((evt, id) => {
        return (
          <TimelineItem key={id}>
            <TimelineOppositeContent>
              <Typography className={classes.dateItem}>
                {evt.evt_date.setLocale("fr").toLocaleString()}
              </Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="primary">{renderIcon(evt)}</TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Paper elevation={3} className={classes.paper}>
                {renderSwitch(evt)}
              </Paper>
            </TimelineContent>
          </TimelineItem>
        )
      })}
    </Timeline>
  )
}

Frise.EventType = EventType

export default Frise
