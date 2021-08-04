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
import { DateTime } from "luxon"

const ChantierList = ({ chantiers = [] }) => {
  const extractDateDerniereRevue = revues => {
    if (0 < revues.length) {
      if (1 == revues.length) {
        return DateTime.fromISO(revues[0].date_maj)
      } else {
        const lastRevue = revues
          .sort(function (a, b) {
            return DateTime.fromISO(a.date_maj) - DateTime.fromISO(b.date_maj)
          })
          .shift()
        return DateTime.fromISO(lastRevue.date_maj)
      }
    }
  }

  const chantierCards = chantiers.map(chantier => {
    const { operation, numero, id, site, etape, revues } = chantier

    let dateLastRevue
    if (revues) {
      dateLastRevue = extractDateDerniereRevue(revues)
    }

    return (
      <Card key={id}>
        <CardHeader title={operation} />
        <CardContent>
          <ChipChantier chantier={chantier} />
          <Typography>Code chantier : {numero}</Typography>
          {site && site.nom_corrige_dbr && (
            <Typography>
              Site :{" "}
              <Link to={`/sites/${site.id}`}>{site.nom_corrige_dbr}</Link>
            </Typography>
          )}
          <Etape etape={etape} />
          {dateLastRevue && (
            <Typography>
              Dernière revue le {dateLastRevue.setLocale("fr").toLocaleString()}
            </Typography>
          )}
        </CardContent>
        <CardActions>
          <Button to={`/chantier/${id}`} component={Link}>
            Voir le détail
          </Button>
        </CardActions>
      </Card>
    )
  })

  return (
    <section className="cards">
      {0 === chantiers.length && (
        <Typography>Aucun chantier en cours</Typography>
      )}
      {chantierCards}
    </section>
  )
}

export default ChantierList
