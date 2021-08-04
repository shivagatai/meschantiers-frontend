import React from "react"

import { Link } from "gatsby"
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from "@material-ui/core"
import Etape from "./Etape"
import ChipChantier from "./ChipChantier"

const ChantierList = ({ chantiers = [] }) => {
  return (
    <section className="cards">
      {0 === chantiers.length && (
        <Typography>Aucun chantier en cours</Typography>
      )}
      {chantiers.map(chantier => {
        const { operation, numero, id, site, etape } = chantier

        return (
          <Card key={id}>
            <CardHeader title={operation} />
            <CardContent>
              <ChipChantier chantier={chantier} />
              <Typography>Code chantier : {numero}</Typography>
              <Etape etape={etape} />
            </CardContent>
            <CardActions>
              <Button to={`/chantier/${id}`} component={Link}>
                Voir le détail
              </Button>
            </CardActions>
          </Card>
        )
      })}
    </section>
  )
}

export default ChantierList
