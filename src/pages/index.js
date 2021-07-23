import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import AllCommunes from "../components/AllCommunes"
import HomePage from "./HomePage"

const IndexPage = () => (
  <Layout>
    <HomePage />
  </Layout>
)

export default IndexPage
