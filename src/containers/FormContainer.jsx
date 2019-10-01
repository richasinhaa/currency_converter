import React, { Component } from "react";
import Select from "react-select";

/* Import Components */
/*import Select from "../components/Select";*/
import Button from "../components/Button";
import Input from "../components/Input";
import 'bootstrap/dist/css/bootstrap.css';
import '../css/App.css';
import { ReactComponent as USD } from "../svg/us.svg";
import { ReactComponent as SGD } from "../svg/sg.svg";
import { ReactComponent as INR } from "../svg/in.svg";
import { ReactComponent as AED } from "../svg/ae.svg";
import { ReactComponent as AMD } from "../svg/am.svg";
import { ReactComponent as ARS } from "../svg/ar.svg";
import { ReactComponent as BBD } from "../svg/bb.svg";
import { ReactComponent as CAD } from "../svg/ca.svg";
import { ReactComponent as EUR } from "../svg/eu.svg";

class FormContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
        amount: "",
        fromCurrency: "",
        toCurrency: "",
        conversion_rate : "",
        converted_rate : "",

      currencyOptions : [
        {
          icon: <USD/>,
          value: "USD",
          label: "USD"
        },
        {
          icon: <SGD/>,
          value: "SGD",
          label: "SGD"
        },
        {
          icon: <INR/>,
          value: "INR",
          label: "INR",
        },
        {
          icon: <AED/>,
          value: "AED",
          label: "AED"
        },
        {
          icon: <AMD/>,
          value: "AMD",
          label: "AMD"
        },
        {
          icon: <ARS/>,
          value: "ARS",
          label: "ARS"
        },
        {
          icon: <BBD/>,
          value: "BBD",
          label: "BBD"
        },
        {
          icon: <CAD/>,
          value: "CAD",
          label: "CAD"
        },
        {
          icon: <EUR/>,
          value: "EUR",
          label: "EUR"
        },
      ]

      };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleToCurrencyInput = this.handleToCurrencyInput.bind(this);
    this.handleFromCurrencyInput = this.handleFromCurrencyInput.bind(this);
    this.handleAmount= this.handleAmount.bind(this);
  }

  /* This lifecycle hook gets executed when the component mounts */


  handleToCurrencyInput(e) {
    console.log(this.state.toCurrency);
    this.setState({
      toCurrency: e.target.value
    });
  }

  handleFromCurrencyInput(e) {
  console.log(this.state, this.state);
    this.setState({
      fromCurrency: e.target.value
    });
  }

  handleAmount(e) {
    let value = e.target.value;
    console.log("suuceess3 "+ value);
    let name = e.target.name;
    this.setState({amount : value});
  }


  handleFormSubmit(e) {
    e.preventDefault();
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append("Access-Control-Allow-Origin", "*");
    headers.append("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS")


    fetch("http://localhost:5000/converter?base=INR&to=USD", {
        method: 'GET',
        headers: headers,
    })
    .then(r =>  {
      r.json().then(data => {
        this.setState({conversion_rate : data.rate})
        let value = this.state.conversion_rate * this.state.amount
        this.setState({converted_rate  : value})
        console.log("Successful : "+data.rate);
    }) })
    return (
       <h2> The value is + {this.state.conversion_rate} </h2>
    );
  }


  render() {
    return (
      <form className="form-horizontal" onSubmit={this.handleFormSubmit}>
         <div className="form-group">
            <Input
              inputtype={"number"}
              name={"amount"}
              value={this.state.amount}
              placeholder={"Enter amount"}
              onChange={this.handleAmount}
            />{" "}
             <table className="table table-borderless">
              <tbody>
              <tr>
              <td STYLE="flex: 1; min-width: 0;">
                <Select
                  title={"From Currency"}
                  name={"from_cur"}
                  options={this.state.currencyOptions}
                  value={this.state.fromCurrency}
                  placeholder={"From Currency"}
                  components={{ SingleValue: customSingleValue }}
                  onChange={this.handleFromCurrencyInput}
                />
                {this.state.fromCurrency}
                </td>
                <td STYLE="flex: 1; min-width: 0;">
                <Select
                  title={"To Currency"}
                  name={"to_cur"}
                  options={this.state.currencyOptions}
                  value={this.state.toCurrency}
                  placeholder={"To Currency"}
                  components={{ SingleValue: customSingleValue }}
                  onChange={this.handleToCurrencyInput}
                />
                {this.state.toCurrency}
              </td>
              </tr></tbody></table>
              <div className="col text-center">
                <Button className="btn-group"
                  action={this.handleFormSubmit}
                  type={"primary"}
                  title={"Submit"}
                />{" "}
              </div>
      </div>
   </form>
    );
  }
}

const customSingleValue = ({ data }) => (
    <div className="input-select">
        <div className="input-select__single-value">
            { data.icon && <span className="input-select__icon">{ data.icon } </span> }
            <span>{ data.label }</span>
        </div>
    </div>
);

/*const buttonStyle = {
  margin: "10px 10px 10px 0px",
  justifyContent: "center"
};*/



export default FormContainer;
