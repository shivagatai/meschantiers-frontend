import React, { useState } from "react"

import { Link } from "gatsby"
import { FaAlignJustify } from "react-icons/fa"
import { AppBar, Tabs, Tab, Toolbar } from "@material-ui/core"
import { useLocation } from "@reach/router"
import { makeStyles } from "@material-ui/styles"

const useStyles = makeStyles(theme => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: "3em",
  },
}))

const Navbar = () => {
  const classes = useStyles()
  const location = useLocation()
  let currentPath = location.pathname

  const a11yProps = index => {
    return {
      id: `tabs-router-${index}`,
      "aria-controls": `tabs-router-${index}`,
    }
  }

  return (
    <>
      <AppBar>
        <Toolbar>
          <Tabs value={currentPath}>
            <Tab
              component={Link}
              to="/"
              value="/"
              label="Home"
              {...a11yProps(0)}
              aria-label="home"
            />
            <Tab
              component={Link}
              to="/sites"
              value="/sites"
              label="Sites"
              {...a11yProps(0)}
              aria-label="sites"
            />

            <Tab
              component={Link}
              to="/chantiers"
              value="/chantiers"
              label="Chantiers"
              {...a11yProps(0)}
              aria-label="chantiers"
            />
          </Tabs>
        </Toolbar>
      </AppBar>
      <div className={classes.toolbarMargin}></div>
    </>
  )
}

export default Navbar
