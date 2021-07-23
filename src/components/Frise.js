import React from "react"

import { Timeline } from "@material-ui/lab"

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

const Frise = ({ events = [] }) => {
  //  console.log(events)

  // on trie les évènements à afficher par ordre chronologique décroissant
  events.sort((a, b) => a.props.evt_date - b.props.evt_date).reverse()

  // Events are FriseItem components
  return <Timeline align="alternate">{events}</Timeline>
}

Frise.EventType = EventType

export default Frise
