import React, { Component } from "react"
import {Grid, Paper, Typography} from "@material-ui/core"
import axios from "axios"


class SwitcheoGridChainStatistics extends Component {
  constructor(props){
    super(props);
    this.state = {
      API: 'https://api.switcheolytics.tech',
      neoBlockheight: 2000000,
      switcheoBlockheight: 2000000,
      switcheoV2Trades: 0,
      switcheoV2FeeCount: 0,
      styles: {
        division: {
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#212a3f",
        },
        greenSpan: {
          color: "#88c773",
        },
        paper: {
          border: '2px solid #88c773',
          backgroundColor: "#212a3f",
        },
        paperStats: {
          backgroundColor: "#212a3f",
        },
        typographyBig: {
          color: "#a8a8a8",
          fontSize: 24,
          justifyContent: "center",
        },
        typographyBigNumber: {
          color: "#88c773",
          fontSize: 32,
          justifyContent: "center",
        },
        typographyMain: {
          color: "#a8a8a8",
          fontSize: 16,
          justifyContent: "center",
        },
        typographyNumber: {
          color: "#fff",
          fontSize: 22,
          justifyContent: "center",
        },
        whiteSpan: {
          color: "#fff",
        },
      },
    };
  }

  componentWillMount() {
    this.getNeoBlockheight();
    this.getSwitcheoBlockheight();
    this.getSwitcheoV2Trades();
    this.getSwitcheoV2FeeCount();
  }

  componentDidMount() {
    setInterval(this.getNeoBlockheight, 30000);
    setInterval(this.getSwitcheoBlockheight, 30000);
    setInterval(this.getSwitcheoV2Trades, 50000);
    setInterval(this.getSwitcheoV2FeeCount, 60000);
  }

  getNeoBlockheight = async () => {
    try {
      const res = await axios.get(this.state.API + '/neo/blockheight');
      this.setState({neoBlockheight: res.data.neo_blockheight.toLocaleString()});
    } catch (e) {
      console.error(e);
    }
  };

  getSwitcheoBlockheight = async () => {
    try {
      const res = await axios.get(this.state.API + '/switcheo/ingested/blockheight');
      this.setState({switcheoBlockheight: res.data.switcheo_blockheight.toLocaleString()});
    } catch (e) {
      console.error(e);
    }
  };

  getSwitcheoV2Trades = async () => {
    try {
      const res = await axios.get(this.state.API + '/switcheo/ingested/fills');
      this.setState({switcheoV2Trades: res.data.switcheo_fee_height.toLocaleString()});
    } catch (e) {
      console.error(e);
    }
  };

  getSwitcheoV2FeeCount = async () => {
    try {
      const res = await axios.get(this.state.API + '/switcheo/fee/count');
      this.setState({switcheoV2FeeCount: res.data.january_epoch.SWTH.toLocaleString()});
    } catch (e) {
      console.error(e);
    }
  };

  render() {
    return (
      <Grid container justify="center" spacing={16}>
        <Grid item sm={6}>
          <Grid container justify="center" spacing={16}>
            <Grid key={1} item xs={6}>
              <Paper style={this.state.styles.paperStats}>
                <Typography align="center" style={this.state.styles.typographyMain}>
                  NEO Block Number:
                </Typography>
                <Typography align="center" style={this.state.styles.typographyNumber}>
                  {this.state.neoBlockheight}
                </Typography>
              </Paper>
            </Grid>
            <Grid key={2} item xs={6}>
              <Paper style={this.state.styles.paperStats}>
                <Typography align="center" style={this.state.styles.typographyMain}>
                  Switcheo Block Number:
                </Typography>
                <Typography align="center" style={this.state.styles.typographyNumber}>
                  {this.state.switcheoBlockheight}
                </Typography>
              </Paper>
            </Grid>
            <Grid key={3} item xs={6}>
              <Paper style={this.state.styles.paperStats}>
                <Typography align="center" style={this.state.styles.typographyMain}>
                  Switcheo (v2) Trades:
                </Typography>
                <Typography align="center" style={this.state.styles.typographyNumber}>
                  {this.state.switcheoV2Trades}
                </Typography>
              </Paper>
            </Grid>
            <Grid key={4} item xs={6}>
              <Paper style={this.state.styles.paperStats}>
                <Typography align="center" style={this.state.styles.typographyMain}>
                  SWTH (v2) Used as Fee:
                </Typography>
                <Typography align="center" style={this.state.styles.typographyNumber}>
                  {this.state.switcheoV2FeeCount}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default SwitcheoGridChainStatistics;
