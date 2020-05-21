import React from "react"
import { Link } from "gatsby"

import SEO from "../components/seo"

import HomeHero from "../components/home_hero"

const IndexPage = () => (
  <>
    <SEO title="Home" />
    <HomeHero />
    <Link to="/page-2/">Go to page 2</Link>
  </>
)

export default IndexPage
