import React from "react";
import "./App.css";
import { withRouter } from "react-router-dom";
import { Button, Form } from "semantic-ui-react";
import Input from "./Input";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: [],
      formLoaded: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.getRegistrationAttributes = this.getRegistrationAttributes.bind(this);
  }

  getRegistrationAttributes(props) {
    console.log(props);
    let customerId;
    if (window.customerId) {
      customerId = window.customerId;
    } else {
      customerId = this.props.location.pathname;
    }
    if (customerId.length > 1) {
      fetch("http://localhost:3001" + customerId, {
        method: "GET"
      })
        .then(response => response.json())
        .then(response =>
          this.setState({
            formLoaded: true,
            formData: response.map(field => {
              return { ...field, value: "" };
            })
          })
        )
        .catch(error => console.error("Error:", error));
    }
  }

  handleRegister(e, state) {
    e.preventDefault();

    if (this.validateForm()) {
      let data = state.formData.map(field => ({
        attribute: field.attribute,
        value: field.value
      }));

      console.log(JSON.stringify(data));

      fetch("http://localhost:3001/api/users/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())

        .then(response => console.log("Success:", response))
        .catch(error => console.error("Error:", error));

      alert(
        JSON.stringify(data) +
          JSON.stringify({
            error: 0,
            description: "Account created successfully"
          })
      );
      console.log(
        "JSON obj:  " +
          JSON.stringify(data) +
          JSON.stringify({
            error: 0,
            description: "Account created successfully"
          })
      );
    }
  }

  componentDidMount() {
    this.getRegistrationAttributes(this.props);
  }

  handleChange(attribute, e) {
    // console.log(e);
    const value = e.target.value;

    console.log(value);
    this.setState(state => ({
      formData: state.formData.map(field => ({
        ...field,
        value: attribute === field.attribute ? value : field.value
      }))
    }));
  }

  validateForm() {
    let formIsValid = true;

    this.state.formData.forEach(function(field) {
      if (field.value === "" && field.required === true) {
        alert(field.name + " can not be empty");

        formIsValid = false;
      }
    });

    return formIsValid;
  }
  render() {
    // console.log(this.props.location);
    // console.log(window);

    return (
      <div className="app">
        <div id="header">
          <h1>REGISTER</h1>

          {!this.state.formLoaded ? (
            <h4>in order to register choose organisation you belong to</h4>
          ) : null}
        </div>
        {!this.state.formLoaded ? (
          <div>
            <Button>
              <a href="/customerA" rel="customerA">
                Customer A
              </a>
            </Button>

            <Button>
              <a href="/customerB" rel="customerB">
                Customer B
              </a>
            </Button>
          </div>
        ) : null}
        <div id="registrationForm">
          <Form>
            {this.state.formData.map((props, index) => (
              <Input key={index} send={this.handleChange} f={props} />
            ))}

            <br />
            {this.state.formLoaded ? (
              <Button
                className="submit"
                type="submit"
                onClick={e => this.handleRegister(e, this.state)}
              >
                Register
              </Button>
            ) : null}
          </Form>
          {/*  {this.state.formLoaded ? (
            <div className="result">{JSON.stringify(this.state.formData)}</div>
          ) : null} */}
        </div>
      </div>
    );
  }
}

export default withRouter(App);
