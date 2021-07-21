import React from "react"

import { graphql, useStaticQuery } from "gatsby"
import CommuneList from "./CommuneList"
import { Typography } from "@material-ui/core"

const AllCommunes = () => {
  const data = useStaticQuery(query)
  const communes = data.allStrapiCommune.nodes

  // on répartit les communes par département
  const allCommunes = {}
  communes.forEach(commune => {
    const { nom } = commune.departement
    if (allCommunes[nom]) {
      allCommunes[nom] = allCommunes[nom].concat(commune)
    } else {
      allCommunes[nom] = [commune]
    }
  })
  return (
    // affichage par département
    Object.entries(allCommunes).map((item, index) => {
      //     console.log(item)
      const departement = item[0]
      const communeList = item[1]
      return (
        <>
          <Typography variant="h2">{departement}</Typography>
          <CommuneList communes={communeList} />
        </>
      )
    })
  )
}

const query = graphql`
  {
    allStrapiCommune(sort: { order: ASC, fields: departement___dpt }) {
      nodes {
        commune_nv
        insee_nv
        strapiId
        departement {
          dpt
          nom
        }
        epci {
          epci
          etiq_epci
        }
        sites {
          eple
          etiquet
          etiquet_s
          nom_corrige_dbr
          numero
        }
      }
      totalCount
    }
  }
`

export default AllCommunes
