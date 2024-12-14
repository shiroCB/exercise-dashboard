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
    const categorical = ["Gender", "Workout Type"]
    const numerical = ["Age", 
                       "BPM Diff", 
                       "Calories Burned", 
                       "Experience Level", 
                       "Fat Percentage", 
                       "Height (m)", 
                       "Session Duration (hours)", 
                       "Water Intake (liters)", 
                       "Weight (kg)", 
                       "Workout Frequency (days/week)"]

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
          .style("width", "600px")
          .style("height", "225px")
          .style("background-color", "white")
          .style("border", "2px solid black")
          .style("visibility", "visible")
          .style("position", "absolute")
          .style("top", `${event.clientY + 10}px`)
          .style("left", `${event.clientX + 10}px`)

        this.generateBarChart(event.target.id);
      })
      .on("mouseout", () => {
        d3.select(".tooltip").style("visibility", "hidden");
      });
  }

  generateBarChart(attribute) {
    const { csv_data } = this.props;

    const margin = {top: 10, right: 10, bottom: 10, left: 10},
    width = 600 - margin.left - margin.right,
    height = 200 - margin.top - margin.bottom;

    const filteredData = csv_data.map(d => d[attribute]);
    if (attribute === 'Height (m)') console.log(filteredData);
    const data = {};
    filteredData.forEach(element => data[element] = (data[element] || 0) + 1);
    const formattedData = Object.keys(data).map(key => ({ Key: key, Value: data[key] }));

    console.log(formattedData);

    d3.select(".tooltip").selectAll("*").remove();

    const svg = d3.select(".tooltip")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    
    const xScale = d3.scaleBand().range([0, width]).domain(formattedData.map(d => d.Key)).padding(0.2);
    
    const yScale = d3.scaleLinear().range([height, 0]).domain([0, d3.max(formattedData, d => d.Value)]);
    
    svg
      .append("g")
      .attr("fill", "steelblue")
      .selectAll()
      .data(formattedData)
      .join("rect")
      .attr("x", (d) => xScale(d.Key))
      .attr("y", (d) => yScale(d.Value))
      .attr("height", (d) => yScale(0) - yScale(d.Value))
      .attr("width", xScale.bandwidth());
  
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