import React from "react"

import { Typography } from "@material-ui/core"

import EuroSymbolOutlinedIcon from "@material-ui/icons/EuroSymbolOutlined"

import { budgetFormat, percentFormat } from "../utils/Utils"
import FriseItem from "./FriseItem"

const BudgetFriseItem = ({
  id,
  evt_date,
  mandatement_total,
  engagement_total,
}) => {
  const renderSwitch = () => {
    return (
      <>
        <Typography>
          Consommation budget :{" "}
          {percentFormat.format(mandatement_total / engagement_total)}
        </Typography>
        <Typography>
          Mandatement total : {budgetFormat.format(mandatement_total)}
        </Typography>
        <Typography>
          Engagement total : {budgetFormat.format(engagement_total)}
        </Typography>
      </>
    )
  }

  const renderIcon = () => {
    return <EuroSymbolOutlinedIcon />
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

export default BudgetFriseItem
