import React, { Component } from "react"
import axios from "axios"
import stringify from "json-stable-stringify"
import {Button, Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@material-ui/core"
import {withStyles} from '@material-ui/core/styles'
import Switch from "react-switch"
import { PulseLoader } from "react-spinners"
import { Header } from "./Layouts"
import SwitcheoInput from "./SwitcheoInput"
import BN from "bignumber.js"
import { Provider, withAlert } from "react-alert"
import AlertTemplate from "react-alert-template-basic"


const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: "#212a3f",
    color: theme.palette.common.white,
    fontSize: '15px',
    fontWeight: 'bold',
  },
  body: {
    color: theme.palette.common.white,
    fontSize: '12px',
  },
}))(TableCell);


const API = 'https://api.switcheolytics.tech/switcheo/balance';
const styles = {
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
    width: "85%",
  },
  table: {
    minWidth: 700,
  },
  row: {
    color: "#fff",
  },
  options: {
    timeout: 3000,
    position: "bottom center"
  },
};

const versions = {
  "V1": "Version 1",
  "V1_5": "Version 1.5",
  "V2": "Version 2",
};

class ContractBalance extends Component {
  constructor(props){
    super(props);
    this.state = {
      network: 'main',
      address: '',
      isLoading: false,
      showTable: false,
      color: "#88c773",
      checked: true,
      switchText: 'Mainnet',
      addressError: false,
      message: '',
      balanceString: '',
      balanceJson: '',
      keysJson: [],
    };
    this.handleSwitchChange = this.handleSwitchChange.bind(this);
  }

  getBalance = async () => {
    try {
      if (!this.state.address) {
        this.setState({addressError: true});
        this.props.alert("Invalid Address, Entry cannot be blank!")
      } else {
        this.setState({addressError: false});
        this.setState({isLoading: true});
        const res = await axios.get(API, {
          params: {
            network: this.state.network,
            address: this.state.address,
          }
        });
        this.setState({balanceString: stringify(res.data)});
        this.setState({balanceJson: res.data});
        this.setState({keysJson: Object.keys(res.data)});
        this.setState({isLoading: false});
        this.setState({showTable: true});
      }
    } catch (e) {
      console.error(e);
    }
  };

  handleInputChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSwitchChange(checked) {
    this.setState({ checked });
    if (checked) {
      this.setState({
        switchText: 'Mainnet',
        network: 'main',
        color: "#88c773",
      });
    } else {
      this.setState({
        switchText: 'Testnet',
        network: 'test',
        color: "#fff",
      });
    }
  };

  renderButton() {
    if (this.state.isLoading) {
      return <PulseLoader size={15} margin="1px" color="#88c773"/>;
    } else {
      return "Submit";
    }
  };

  renderTable() {
    if (this.state.showTable) {
      return <Table className={styles.table}>
                <TableHead>
                  <TableRow style={styles.row}>
                    <CustomTableCell>Contract Version</CustomTableCell>
                    <CustomTableCell numeric>Confirmed</CustomTableCell>
                    <CustomTableCell numeric>Confirming</CustomTableCell>
                    <CustomTableCell numeric>Locked</CustomTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.keys(this.state.balanceJson['NEO']).map(rowKey => {
                    return (
                      <TableRow key={'NEO_' + rowKey}>
                        <CustomTableCell component="th" scope="row">
                          {versions[rowKey]}
                        </CustomTableCell>
                        <CustomTableCell>{this.transformJson(this.state.balanceJson['NEO'][rowKey]['confirmed'])}</CustomTableCell>
                        <CustomTableCell>{this.transformConfirmingJson(this.state.balanceJson['NEO'][rowKey]['confirming'])}</CustomTableCell>
                        <CustomTableCell>{this.transformJson(this.state.balanceJson['NEO'][rowKey]['locked'])}</CustomTableCell>
                      </TableRow>
                    );
                  })};
                </TableBody>
              </Table>
    }
  }

  transformJson(message) {
    if (Object.keys(message).length === 0) {
      return "-"
    } else {
      return (
        Object.keys(message).map(key =>
          <li key={key}>{key + ": " + this.fromFixed8(message[key])}</li>
        )
      );
    }
  }

  transformConfirmingJson(message) {
    if (Object.keys(message).length === 0) {
      return "-"
    } else {
      return (
        Object.keys(message).map(key => (
          message[key].map(amt =>
            <li key={key + amt.amount.toString()}>{key + ": " + this.fromFixed8(amt.amount)}</li>
          )
        ))
      );
    }
  }

  fromFixed8(num) {
    return new BN(num).dividedBy(100000000).toString();
  }

  render() {
    return (
      <Provider template={AlertTemplate} {...styles.options}>
        <Grid container justify="center" spacing={16}>
          <Grid item sm={6}>
            <Paper style={styles.paper}>
              <Header/>
              <div style={styles.division}>
                <Grid container justify="center" spacing={8}>
                  <Grid item xs={9}>
                    <SwitcheoInput
                      handleChange={this.handleInputChange}
                      addressError={this.state.addressError}
                      getBalance={this.getBalance}
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <label
                      htmlFor="material-switch"
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginTop: '22px',
                      }}
                    >
                      <Switch
                        checked={this.state.checked}
                        onChange={this.handleSwitchChange}
                        onColor="#88c773"
                        offColor="#fff"
                        onHandleColor="#88c773"
                        offHandleColor="#fff"
                        handleDiameter={15}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                        height={13}
                        width={28}
                        className="react-switch"
                        id="material-switch"
                        style={{marginTop: '55px'}}
                      />
                      <Typography
                        style={{
                          color: this.state.color,
                          paddingLeft: '7px',
                          marginTop: '-3px',
                          fontSize: 16,
                        }}
                      >
                        {this.state.switchText}
                      </Typography>
                    </label>
                  </Grid>
                </Grid>
              </div>
              <div style={styles.division}>
                <Button
                  style={styles.button}
                  onClick={(event) => this.getBalance(event)}
                >
                  { this.renderButton() }
                </Button>
              </div>
              <div style={styles.division}>
                { this.renderTable() }
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Provider>
    );
  }
}

export default withAlert(ContractBalance);
