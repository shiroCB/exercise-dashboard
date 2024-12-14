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
      .append("span")
      .html("<strong>Categorical Attributes: </strong>")
      .style("font-size", "14pt")

    categorical.forEach((category, index) => {
      attributes
        .append("text")
        .text(category)
        .attr("id", category)
        .style("font-size", "14pt")

      if (index < categorical.length - 1) {
        attributes.append("span").text(", ");
      }
    });

    attributes
      .append("span")
      .html("<br/><strong>Numerical Attributes: </strong>")
      .style("font-size", "14pt")
    
    numerical.forEach((category, index) => {
      attributes
        .append("text")
        .text(category)
        .attr("id", category)
        .style("font-size", "14pt")

      if (index < numerical.length - 1) {
        attributes.append("span").text(", ");
      }
    });

    attributes
      .selectAll("text")
      .on("mousemove", (event, d) => {
        d3.select(".tooltip")
          .style("width", "300px")
          .style("height", "300px")
          .style("background-color", "white")
          .style("border", "2px solid black")
          .style("visibility", "visible")
          .style("position", "absolute")
          .style("top", `${event.clientY + 10}px`)
          .style("left", `${event.clientX + 10}px`)
      })
      .on("mouseout", () => {
        d3.select(".tooltip").style("visibility", "hidden");
      });
  }

  render() {
    return (
      <>
        <div className="attributes"></div>
        <div className="tooltip"></div>
      </>
    );
  }
}

export default Attributes;