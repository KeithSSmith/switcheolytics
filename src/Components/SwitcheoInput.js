import React, { Component } from "react"
import {FormControl, Input, InputLabel} from "@material-ui/core";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core/styles";


const styles = {
  division: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#212a3f",
  },
  form: {
    width: "95%",
  },
  inputLabel: {
    fontSize: 19,
    color: "#88c773",
  },
  input: {
    color: "#fff",
    fontSize: 25,
  },
};

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#88c773"
    },
  },
  overrides: {
    MuiInputLabel: {
      root: {
        color: "#fff",
      },
    },
  },
});

class SwitcheoInput extends Component {
  catchReturn = event => {
    if (event.key === 'Enter') {
      this.props.getBalance(event);
    }
  };

  render() {
    return (
      <FormControl style={styles.form}>
        <MuiThemeProvider theme={theme}>
          <InputLabel
            style={styles.inputLabel}
            error={this.props.addressError}
            filled
            htmlFor="custom-css-input"
          >
            Enter Switcheo Address
          </InputLabel>
          <Input
            style={styles.input}
            onChange={this.props.handleChange('address')}
            onKeyPress={this.catchReturn}
            id="custom-css-input"
          />
        </MuiThemeProvider>
      </FormControl>
    )
  }
}

export default SwitcheoInput;
