import React, { Component } from "react"
import {Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts"
import {Grid, Paper} from "@material-ui/core"
import axios from "axios"

const styles = {
  blue: "#212a3f",
  green: "#88c773",
  toolBar: {
    backgroundColor: "#212a3f",
    display: "flex",
    justifyContent: "center",
  },
  lineChart: {
    backgroundColor: "#212a3f",
  },
  typography: {
    color: "#fff",
    fontSize: 35,
  },
  paper: {
    backgroundColor: "#212a3f",
  },
};

class SwitcheoReChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showChart: false,
      switcheoFeeAmount: 0
    };
  }

  componentDidMount() {
    this.getSwitcheoFeeAmount();
  }

  getSwitcheoFeeAmount = async () => {
    try {
      const res = await axios.get(this.props.api + '/switcheo/fee/amount/graph');
      this.setState({switcheoFeeAmount: res.data.SWTH});
      this.setState({showChart: true})
    } catch (e) {
      console.error(e);
    }
  };

  renderChart() {
    if (this.state.showChart) {
      return <Paper style={styles.paper}>
               <ResponsiveContainer width='100%' aspect={1.75/0.9}>
                 <LineChart data={this.state.switcheoFeeAmount} margin={{top: 10, right: 15, bottom: 40, left: 15}}>
                   <XAxis dataKey="block_date" label="Date" axisLine={false} hide={true} />
                   <YAxis hide={true}/>
                   <Tooltip/>
                   <Line type='monotone' dataKey='fee_amount' stroke="#88c773" strokeWidth={3} />
                 </LineChart>
               </ResponsiveContainer>
             </Paper>
    }
  }

  render() {
    return(
      <Grid container justify="center" spacing={16}>
        <Grid item sm={6}>
          { this.renderChart() }
        </Grid>
      </Grid>
    )
  }
}

export default SwitcheoReChart;
