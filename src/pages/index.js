import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import AllCommunes from "../components/AllCommunes"

const IndexPage = () => (
  <Layout>
    <AllCommunes />
  </Layout>
)

export default IndexPage
