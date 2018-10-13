import React, { Component } from "react"
import {Grid, Paper, Typography} from "@material-ui/core"
import axios from "axios"


class SwitcheoGridStatistics extends Component {
  constructor(props){
    super(props);
    this.state = {
      switcheoV2Fees: 0,
      switcheoV2FeeAmount: 0,
      switcheoV2FeeAmountWeek: 0,
      switcheoV2FeeAmountMonth: 0,
      switcheoV2FeeAmountQuarter: 0,
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
        typography: {

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
    this.getSwitcheoV2FeeAmount();
  }

  componentDidMount() {
    setInterval(this.getSwitcheoV2FeeAmount, 55000);
  }

  getSwitcheoV2FeeAmount = async () => {
    try {
      const res = await axios.get(this.props.api + '/switcheo/fee/amount');
      const swthFixed8Total = res.data.january_epoch.SWTH / 100000000;
      const swthFixed8Week = res.data.week_epoch.SWTH / 100000000;
      const swthFixed8Month = res.data.thirty_epoch.SWTH / 100000000;
      const swthFixed8Quarter = res.data.ninety_epoch.SWTH / 100000000;
      this.setState({switcheoV2FeeAmount: swthFixed8Total.toLocaleString()});
      this.setState({switcheoV2FeeAmountWeek: swthFixed8Week.toLocaleString()});
      this.setState({switcheoV2FeeAmountMonth: swthFixed8Month.toLocaleString()});
      this.setState({switcheoV2FeeAmountQuarter: swthFixed8Quarter.toLocaleString()});
    } catch (e) {
      console.error(e);
    }
  };

  render() {
    return (
      <Grid container justify="center" spacing={16}>
        <Grid item sm={6}>
          <Grid container justify="center" spacing={16}>
            <Grid key={6} item xs={4}>
              <Paper style={this.state.styles.paperStats}>
                <Typography align="center" style={this.state.styles.typographyMain}>
                  Past Week Burned:
                </Typography>
                <Typography align="center" style={this.state.styles.typographyNumber}>
                  {this.state.switcheoV2FeeAmountWeek}
                </Typography>
              </Paper>
            </Grid>
            <Grid key={7} item xs={4}>
              <Paper style={this.state.styles.paperStats}>
                <Typography align="center" style={this.state.styles.typographyMain}>
                  Past Month Burned:
                </Typography>
                <Typography align="center" style={this.state.styles.typographyNumber}>
                  {this.state.switcheoV2FeeAmountMonth}
                </Typography>
              </Paper>
            </Grid>
            <Grid key={8} item xs={4}>
              <Paper style={this.state.styles.paperStats}>
                <Typography align="center" style={this.state.styles.typographyMain}>
                  Past Quarter Burned:
                </Typography>
                <Typography align="center" style={this.state.styles.typographyNumber}>
                  {this.state.switcheoV2FeeAmountQuarter}
                </Typography>
              </Paper>
            </Grid>
            <Grid key={5} item xs={12}>
              <Paper style={this.state.styles.paperStats}>
                <Typography align="center" style={this.state.styles.typographyBig}>
                  SWTH (v2) Burned:
                </Typography>
                <Typography align="center" style={this.state.styles.typographyBigNumber}>
                  {this.state.switcheoV2FeeAmount}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default SwitcheoGridStatistics;
