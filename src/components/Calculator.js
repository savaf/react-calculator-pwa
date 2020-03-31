import React from "react";
import CalculatorCore from "./../libs/Calculator";
import Display from "./Display";
import Button from "./Button";

export class Calculator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      display: "0",
      calculator: new CalculatorCore(),
    };

    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  async handleButtonClick(value) {
    await this.setState({
      ...this.state,
      display: this.state.calculator.calculate(value),
    });
    console.log(this.state.calculator);
  }

  render() {
    return (
      <div className="Calculator">
        <Display display={this.state.display} />

        <Button
          value={this.state.calculator.clearable ? "C" : "AC"}
          className="Button-Black"
          onClick={this.handleButtonClick}
        />
        <Button
          value="+/-"
          className="Button-Black"
          onClick={this.handleButtonClick}
        />
        <Button
          value="%"
          className="Button-Black"
          onClick={this.handleButtonClick}
        />
        <Button
          value={"\u00F7"}
          className="Button-Orange"
          onClick={this.handleButtonClick}
        />

        <br />

        <Button
          value="7"
          className="Button Button-Gray"
          onClick={this.handleButtonClick}
        />
        <Button
          value="8"
          className="Button Button-Gray"
          onClick={this.handleButtonClick}
        />
        <Button
          value="9"
          className="Button Button-Gray"
          onClick={this.handleButtonClick}
        />
        <Button
          value="x"
          className="Button Button-Orange"
          onClick={this.handleButtonClick}
        />

        <br />

        <Button
          value="4"
          className="Button Button-Gray"
          onClick={this.handleButtonClick}
        />
        <Button
          value="5"
          className="Button Button-Gray"
          onClick={this.handleButtonClick}
        />
        <Button
          value="6"
          className="Button Button-Gray"
          onClick={this.handleButtonClick}
        />
        <Button
          value="-"
          className="Button Button-Orange"
          onClick={this.handleButtonClick}
        />

        <br />

        <Button
          value="1"
          className="Button Button-Gray"
          onClick={this.handleButtonClick}
        />
        <Button
          value="2"
          className="Button Button-Gray"
          onClick={this.handleButtonClick}
        />
        <Button
          value="3"
          className="Button Button-Gray"
          onClick={this.handleButtonClick}
        />
        <Button
          value="+"
          className="Button Button-Orange"
          onClick={this.handleButtonClick}
        />

        <br />

        <Button
          value="0"
          className="Button Button-Gray Button-Large"
          onClick={this.handleButtonClick}
        />
        <Button
          value="."
          className="Button Button-Gray"
          onClick={this.handleButtonClick}
        />
        <Button
          value="="
          className="Button Button-Orange"
          onClick={this.handleButtonClick}
        />
      </div>
    );
  }
}

export default Calculator;
