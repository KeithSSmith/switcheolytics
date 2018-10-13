import React, {Component} from "react"
import {Grid, Paper, Typography} from "@material-ui/core"

class SwitcheoHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exchangeState: true,
      exchangeStateText: 'Up!',
      exchangeStateColor: {
        color:"#00ff00",
      },
      paperExchangeBorderColor: "#88c773",
      styles: {
        greenSpan: {
          color: "#88c773",
        },
        paper: {
          border: '2px solid #88c773',
          backgroundColor: "#212a3f",
        },
        typography: {
          color: "#a8a8a8",
          fontSize: 35,
          justifyContent: "center",
        },
      }
    };
    this.handleExchangeChange = this.handleExchangeChange.bind(this);
  }

  handleExchangeChange(exchangeState) {
    this.setState({ exchangeState });
    if (exchangeState) {
      this.setState({
        exchangeStateText: 'Up!',
        exchangeStateColor: {
          color: "#00ff00",
        },
        paperExchangeBorderColor: {
          color: "#88c773",
        },
      });
    } else {
      this.setState({
        exchangeStateText: 'Down!',
        exchangeStateColor: {
          color: "#ff0000",
        },
        paperExchangeBorderColor: {
          color: "#ff0000",
        },
      });
    }
  }

  render() {
    return (
      <Grid container justify="center" spacing={16}>
        <Grid item sm={6}>
          <Grid container justify="center" spacing={16}>
            <img src={require('./images/switcheo-analytics-490.png')} alt="SwitcheoLytics Logo" width="380" height="70"/>
            <Grid key={0} item xs={12}>
              <Paper style={this.state.styles.paper}>
                <Typography align="center" style={this.state.styles.typography}>
                  The <span style={this.state.styles.greenSpan}>Switcheo</span> <span style={this.state.styles.whiteSpan}>Exchange</span> is <span style={this.state.exchangeStateColor}>{this.state.exchangeStateText}</span>
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default SwitcheoHeader
