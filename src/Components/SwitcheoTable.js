import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import {Button, Grid, Paper} from '@material-ui/core'
import {PulseLoader} from 'react-spinners'
import RichListTable from './SwitcheoTableRichList'
import AddressFeesTable from './SwitcheoTableAddressFees'
import TradeCountTable from './SwitcheoTableTradeCount'
import TradeAmountTable from './SwitcheoTableTradeAmount'
import AddressTakerTable from './SwitcheoTableAddressTaker'
import AddressMakerTable from './SwitcheoTableAddressMaker'
import OpenOffersTable from './SwitcheoTableOpenOffers'

const buttonStyles = {
  division: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#212a3f",
  },
  paper: {
    border: '2px solid #88c773',
  },
  button: {
    color: "#88c773",
    backgroundColor: "#212a3f",
    fontSize: 15,
    width: "100%",
  },
};

const styles = theme => ({
  root: {
    justifyContent: "center",
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

class SwitcheoTable extends Component {
  state = {
    order: 'desc',
    orderBy: 'total',
    selected: [],
    data: [],
    page: 0,
    rowsPerPage: 5,
    renderTable: 'richList',
    isLoadingRichList: false,
    isLoadingAddressFees: false,
    isLoadingTradeAmount: false,
    isLoadingTradeCount: false,
    isLoadingAddressTaker: false,
    isLoadingAddressMaker: false,
    isLoadingOpenOffers: false,
  };

  getRichList() {
    this.setState({isLoadingRichList: true});
    this.setState({renderTable: 'richList'});
    this.setState({isLoadingRichList: false});
  };

  renderRichListButton() {
    if (this.state.isLoadingRichList) {
      return <PulseLoader size={15} margin="1px" color="#88c773"/>;
    } else {
      return "Switcheo Rich List";
    }
  };

  getAddressFees() {
    this.setState({isLoadingAddressFees: true});
    this.setState({renderTable: 'addressFees'});
    this.setState({isLoadingAddressFees: false});
  };

  renderAddressFeesButton() {
    if (this.state.isLoadingAddressFees) {
      return <PulseLoader size={15} margin="1px" color="#88c773"/>;
    } else {
      return "Fees Paid";
    }
  };

  getTradeAmount() {
    this.setState({isLoadingTradeAmount: true});
    this.setState({renderTable: 'tradeAmount'});
    this.setState({isLoadingTradeAmount: false});
  };

  renderAddressTradeAmountButton() {
    if (this.state.isLoadingTradeAmount) {
      return <PulseLoader size={15} margin="1px" color="#88c773"/>;
    } else {
      return "Trade Amount";
    }
  };

  getTradeCount() {
    this.setState({isLoadingTradeCount: true});
    this.setState({renderTable: 'tradeCount'});
    this.setState({isLoadingTradeCount: false});
  };

  renderAddressTradeCountButton() {
    if (this.state.isLoadingTradeCount) {
      return <PulseLoader size={15} margin="1px" color="#88c773"/>;
    } else {
      return "Number of Trades";
    }
  };

  getAddressTaker() {
    this.setState({isLoadingAddressTaker: true});
    this.setState({renderTable: 'addressTaker'});
    this.setState({isLoadingAddressTaker: false});
  };

  renderAddressTakerButton() {
    if (this.state.isLoadingAddressTaker) {
      return <PulseLoader size={15} margin="1px" color="#88c773"/>;
    } else {
      return "Taker Trades by Address";
    }
  };

  getAddressMaker() {
    this.setState({isLoadingAddressMaker: true});
    this.setState({renderTable: 'addressMaker'});
    this.setState({isLoadingAddressMaker: false});
  };

  renderAddressMakerButton() {
    if (this.state.isLoadingAddressMaker) {
      return <PulseLoader size={15} margin="1px" color="#88c773"/>;
    } else {
      return "Maker Trades by Address";
    }
  };

  getOpenOffers() {
    this.setState({isLoadingOpenOffers: true});
    this.setState({renderTable: 'openOffers'});
    this.setState({isLoadingOpenOffers: false});
  };

  renderSwitcheoOpenOffersButton() {
    if (this.state.isLoadingOpenOffers) {
      return <PulseLoader size={15} margin="1px" color="#88c773"/>;
    } else {
      return "Switcheo Open Offers";
    }
  };

  render() {
    return (
      <Grid container justify="center" spacing={24}>
        <Grid item sm={9}>
          <Grid justify="center" container spacing={16}>
            <Grid item xs={10}>
              <Paper style={buttonStyles.paper}>
                <div style={buttonStyles.division}>
                  <Button
                    style={buttonStyles.button}
                    onClick={(event) => this.getRichList(event)}
                  >
                    {this.renderRichListButton()}
                  </Button>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper style={buttonStyles.paper}>
                <div style={buttonStyles.division}>
                  <Button
                    style={buttonStyles.button}
                    onClick={(event) => this.getAddressFees(event)}
                  >
                    {this.renderAddressFeesButton()}
                  </Button>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper style={buttonStyles.paper}>
                <div style={buttonStyles.division}>
                  <Button
                    style={buttonStyles.button}
                    onClick={(event) => this.getTradeAmount(event)}
                  >
                    {this.renderAddressTradeAmountButton()}
                  </Button>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper style={buttonStyles.paper}>
                <div style={buttonStyles.division}>
                  <Button
                    style={buttonStyles.button}
                    onClick={(event) => this.getTradeCount(event)}
                  >
                    {this.renderAddressTradeCountButton()}
                  </Button>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper style={buttonStyles.paper}>
                <div style={buttonStyles.division}>
                  <Button
                    style={buttonStyles.button}
                    onClick={(event) => this.getAddressTaker(event)}
                  >
                    {this.renderAddressTakerButton()}
                  </Button>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper style={buttonStyles.paper}>
                <div style={buttonStyles.division}>
                  <Button
                    style={buttonStyles.button}
                    onClick={(event) => this.getAddressMaker(event)}
                  >
                    {this.renderAddressMakerButton()}
                  </Button>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={10}>
              <Paper style={buttonStyles.paper}>
                <div style={buttonStyles.division}>
                  <Button
                    style={buttonStyles.button}
                    onClick={(event) => this.getOpenOffers(event)}
                  >
                    {this.renderSwitcheoOpenOffersButton()}
                  </Button>
                </div>
              </Paper>
            </Grid>
          </Grid>
          {this.state.renderTable === 'richList' &&(
            <RichListTable api={this.props.api}/>
          )}
          {this.state.renderTable === 'addressFees' &&(
            <AddressFeesTable api={this.props.api}/>
          )}
          {this.state.renderTable === 'tradeAmount' &&(
            <TradeAmountTable api={this.props.api}/>
          )}
          {this.state.renderTable === 'tradeCount' &&(
            <TradeCountTable api={this.props.api}/>
          )}
          {this.state.renderTable === 'addressTaker' &&(
            <AddressTakerTable api={this.props.api}/>
          )}
          {this.state.renderTable === 'addressMaker' &&(
            <AddressMakerTable api={this.props.api}/>
          )}
          {this.state.renderTable === 'openOffers' &&(
            <OpenOffersTable api={this.props.api}/>
          )}
        </Grid>
      </Grid>
    );
  }
}

SwitcheoTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SwitcheoTable);
