import React, { Component } from "react"
import {Grid, Paper, Typography} from "@material-ui/core"
import axios from "axios"


class SwitcheoGridStatistics extends Component {
  constructor(props){
    super(props);
    this.state = {
      switcheoV2Fees: 0,
      switcheoFeeAmount: 0,
      switcheoFeeAmountWeek: 0,
      switcheoFeeAmountMonth: 0,
      switcheoFeeAmountQuarter: 0,
      switcheoBurnAddressFeeAmount: 0,
      switcheoV1FeeAmount: 0,
      switcheoV2FeeAmount: 0,
      switcheoV3FeeAmount: 0,
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
    this.getSwitcheoFeeAmount();
  }

  componentDidMount() {
    setInterval(this.getSwitcheoFeeAmount, 55000);
  }

  getSwitcheoFeeAmount = async () => {
    try {
      const res = await axios.get(this.props.api + '/switcheo/burnt');
      const swthFixed8Total = res.data.all_burnt.all_epoch / 100000000;
      const swthFixed8Week = res.data.all_burnt.week_epoch / 100000000;
      const swthFixed8Month = res.data.all_burnt.thirty_epoch / 100000000;
      const swthFixed8Quarter = res.data.all_burnt.ninety_epoch / 100000000;
      const swthBurnAddressFixed8Total = res.data.burn_address / 100000000;
      const swthV1Fixed8Total = res.data.V1 / 100000000;
      const swthV2Fixed8Total = res.data.V2.all_epoch / 100000000;
      const swthV3Fixed8Total = res.data.V3.all_epoch / 100000000;
      this.setState({switcheoFeeAmount: Math.round(swthFixed8Total).toLocaleString()});
      this.setState({switcheoFeeAmountWeek: Math.round(swthFixed8Week).toLocaleString()});
      this.setState({switcheoFeeAmountMonth: Math.round(swthFixed8Month).toLocaleString()});
      this.setState({switcheoFeeAmountQuarter: Math.round(swthFixed8Quarter).toLocaleString()});
      this.setState({switcheoBurnAddressFeeAmount: Math.round(swthBurnAddressFixed8Total).toLocaleString()});
      this.setState({switcheoV1FeeAmount: Math.round(swthV1Fixed8Total).toLocaleString()});
      this.setState({switcheoV2FeeAmount: Math.round(swthV2Fixed8Total).toLocaleString()});
      this.setState({switcheoV3FeeAmount: Math.round(swthV3Fixed8Total).toLocaleString()});
    } catch (e) {
      console.error(e);
    }
  };

  render() {
    return (
      <Grid container justify="center" spacing={16}>
        <Grid item sm={6}>
          <Grid container justify="center" spacing={16}>
            <Grid key={5} item xs={12}>
              <Paper style={this.state.styles.paperStats}>
                <Typography align="center" style={this.state.styles.typographyBig}>
                  Total Switcheo Burned:
                </Typography>
                <Typography align="center" style={this.state.styles.typographyBigNumber}>
                  {this.state.switcheoFeeAmount}
                </Typography>
              </Paper>
            </Grid>
            <Grid key={6} item xs={4}>
              <Paper style={this.state.styles.paperStats}>
                <Typography align="center" style={this.state.styles.typographyMain}>
                  Burned Last 7 Days:
                </Typography>
                <Typography align="center" style={this.state.styles.typographyNumber}>
                  {this.state.switcheoFeeAmountWeek}
                </Typography>
              </Paper>
            </Grid>
            <Grid key={7} item xs={4}>
              <Paper style={this.state.styles.paperStats}>
                <Typography align="center" style={this.state.styles.typographyMain}>
                  Burned Last 30 Days:
                </Typography>
                <Typography align="center" style={this.state.styles.typographyNumber}>
                  {this.state.switcheoFeeAmountMonth}
                </Typography>
              </Paper>
            </Grid>
            <Grid key={8} item xs={4}>
              <Paper style={this.state.styles.paperStats}>
                <Typography align="center" style={this.state.styles.typographyMain}>
                  Burned Last 90 Days:
                </Typography>
                <Typography align="center" style={this.state.styles.typographyNumber}>
                  {this.state.switcheoFeeAmountQuarter}
                </Typography>
              </Paper>
            </Grid>
            <Grid key={9} item xs={3}>
              <Paper style={this.state.styles.paperStats}>
                <Typography align="center" style={this.state.styles.typographyMain}>
                  SWH (V1) Burned:
                </Typography>
                <Typography align="center" style={this.state.styles.typographyNumber}>
                  {this.state.switcheoV1FeeAmount}
                </Typography>
              </Paper>
            </Grid>
            <Grid key={10} item xs={3}>
              <Paper style={this.state.styles.paperStats}>
                <Typography align="center" style={this.state.styles.typographyMain}>
                  SWTH (V2) Burned:
                </Typography>
                <Typography align="center" style={this.state.styles.typographyNumber}>
                  {this.state.switcheoV2FeeAmount}
                </Typography>
              </Paper>
            </Grid>
            <Grid key={11} item xs={3}>
              <Paper style={this.state.styles.paperStats}>
                <Typography align="center" style={this.state.styles.typographyMain}>
                  SWTH (V3) Burned:
                </Typography>
                <Typography align="center" style={this.state.styles.typographyNumber}>
                  {this.state.switcheoV3FeeAmount}
                </Typography>
              </Paper>
            </Grid>
            <Grid key={12} item xs={3}>
              <Paper style={this.state.styles.paperStats}>
                <Typography align="center" style={this.state.styles.typographyMain}>
                  SWTH (Manual) Burned:
                </Typography>
                <Typography align="center" style={this.state.styles.typographyNumber}>
                  {this.state.switcheoBurnAddressFeeAmount}
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
