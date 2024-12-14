import { Component } from "react";
import * as d3 from "d3";
import "./Attributes.css";

class Attributes extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.renderAttributes();
  }

  componentDidUpdate() {
    this.renderAttributes();
  }

  renderAttributes() {
    const { csv_data } = this.props;
    
    const categorical = ["Gender", "Workout Type"]
    const numerical = ["Age", 
                       "BPM Diff", 
                       "Calories Burned", 
                       "Experience Level", 
                       "Fat Percentages", 
                       "Height (m)", 
                       "Session Duration (hours)", 
                       "Water Intake (liters)", 
                       "Weight (kg)", 
                       "Workout Frequency (days/week)"]

    const categoricalData = csv_data.map(row => {
      let data = {};
      categorical.forEach(category => {
        data[category] = row[category];
      });
      return data;
    });

    const numericalData = csv_data.map(row => {
      let data = {};
      numerical.forEach(number => {
        data[number] = row[number];
      });
      return data;
    });

    d3.select(".attributes").selectAll("*").remove();

    const attributes = d3.select(".attributes")

    attributes
      .append("text")
      .html("<strong>Categorical Attributes: </strong>")
      .style("font-size", "14pt")

    categorical.forEach((category, index) => {
      attributes
        .append("text")
        .text(category)
        .attr("id", category)
        .style("font-size", "14pt")

      if (index < categorical.length - 1) {
        attributes.append("text").text(", ");
      }
    });

    attributes
      .append("text")
      .html("<br/><strong>Numerical Attributes: </strong>")
      .style("font-size", "14pt")
    
    numerical.forEach((category, index) => {
      attributes
        .append("text")
        .text(category)
        .attr("id", category)
        .style("font-size", "14pt")

      if (index < numerical.length - 1) {
        attributes.append("text").text(", ");
      }
    });
  }

  render() {
    return (
      <div className="attributes"></div>
    );
  }
}

export default Attributes;