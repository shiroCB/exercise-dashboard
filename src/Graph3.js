import { Component } from "react";
import * as d3 from "d3";

class Graph3 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.renderChart();
  }

  componentDidUpdate() {
    this.renderChart();
  }

  renderChart() {
    const { csv_data } = this.props;
    const margin = { top: 50, right: 10, bottom: 50, left: 30 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    d3.select(".graph3").selectAll("*").remove();

    const svg = d3
      .select(".graph3")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const xData = csv_data.map(d => d["Calories Burned"]);
    const xScale = d3.scaleLinear().domain([0, d3.max(xData)]).range([0, width]);

    const yData = csv_data.map(d => d["Fat Percentage"]);
    const yScale = d3.scaleLinear().domain([0, d3.max(yData)]).range([height, 0]);

    // x-axis
    svg.append("g")
      .call(d3.axisBottom(xScale))
      .attr("transform", `translate(${margin.left},${height})`);

    // x-axis label
    svg.append("text")
      .attr("text-anchor", "middle")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom - 10) 
      .text("Calories Burned")
      .style("font-size", "14px");
    
    // y-axis
    svg.append("g")
      .call(d3.axisLeft(yScale))
      .attr("transform", `translate(${margin.left}, 0)`);
      
    // y-axis label
    svg.append("text")
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)") 
      .attr("x", -height / 2) 
      .attr("y", -margin.left + 20)
      .text("Fat Percentage")
      .style("font-size", "14px");

  }
  
  render() {
    return (
    <div className="graph3">

    </div>);
  }
}

export default Graph3;
