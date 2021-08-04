import React from "react"

import { Timeline } from "@material-ui/lab"

const Frise = ({ events = [] }) => {
  //  console.log(events)

  // on trie les évènements à afficher par ordre chronologique décroissant
  events.sort((a, b) => a.props.evt_date - b.props.evt_date).reverse()

  events.map(evt => {
    console.log(evt.id)
  })

  // Events are FriseItem components
  return <Timeline align="alternate">{events}</Timeline>
}

export default Frise
