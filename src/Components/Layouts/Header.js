import React, { Component } from "react"
import { AppBar, Toolbar, Typography } from "@material-ui/core"


const styles = {
  toolBar: {
    backgroundColor: "#212a3f",
    display: "flex",
    justifyContent: "center",
  },
  typography: {
    color: "#fff",
    fontSize: 35,
  },
  greenSpan: {
    color: "#88c773",
  },
};

class Header extends Component {
  render() {
    return(
      <AppBar
        position="static"
        color="default"
      >
        <Toolbar disableGutters style={styles.toolBar}>
          <Typography variant="title" style={styles.typography}>
            Where's My <span style={styles.greenSpan}>Switcheo</span>?
          </Typography>
        </Toolbar>
      </AppBar>
    )
  }
}

export default Header;
