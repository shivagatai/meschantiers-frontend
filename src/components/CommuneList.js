import React from "react"

import { Link } from "gatsby"
import { IoSchoolOutline, IoBusinessOutline } from "react-icons/io5"
import { Button, Card, CardContent, CardHeader } from "@material-ui/core"
import { FaLink } from "react-icons/fa"
import ApartmentOutlinedIcon from "@material-ui/icons/ApartmentOutlined"
import SchoolOutlinedIcon from "@material-ui/icons/SchoolOutlined"

const CommuneList = ({ communes = [] }) => {
  return (
    <section className="cards">
      {communes.map(commune => {
        const {
          commune_nv,
          insee_nv,
          strapiId,
          epci: { epci, etiq_epci },
          sites,
        } = commune

        return (
          <Card key={insee_nv}>
            <CardHeader title={commune_nv} />

            <CardContent>
              {sites.map(site => {
                const { eple, nom_corrige_dbr, numero } = site
                const siteIcon =
                  eple === "EPLE" ? (
                    <SchoolOutlinedIcon />
                  ) : (
                    <ApartmentOutlinedIcon />
                  )

                return (
                  <Button
                    key={numero}
                    to={`/sites/${numero}`}
                    component={Link}
                    startIcon={siteIcon}
                  >
                    {nom_corrige_dbr}
                  </Button>
                )
              })}
            </CardContent>
          </Card>
        )
      })}
    </section>
  )
}

export default CommuneList
