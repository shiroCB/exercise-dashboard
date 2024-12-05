import { Component } from "react";
import * as d3 from "d3";

class Graph3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      frequency: "All", 
    };
  }

  componentDidMount() {
    this.renderChart();
  }

  componentDidUpdate() {
    this.renderChart();
  }

  renderChart() {
    const { csv_data } = this.props;
    const { frequency } = this.state;

    let filteredData = "";
    if (frequency !== "All") {
      filteredData = csv_data.filter((d) => {
        return (d["Workout Frequency (days/week)"] === parseInt(frequency));
      });
    } else {
      filteredData = csv_data;
    }
    const margin = { top: 50, right: 10, bottom: 50, left: 30 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    d3.select(".chart").selectAll("*").remove();

    const svg = d3
      .select(".chart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const xData = filteredData.map(d => d["Calories Burned"]);
    const xScale = d3.scaleLinear().domain([0, d3.max(xData)]).range([0, width]);

    const yData = filteredData.map(d => d["Fat Percentage"]);
    const yScale = d3.scaleLinear().domain([0, d3.max(yData)]).range([height, 0]);

    // title
    svg.append("text")
      .attr("text-anchor", "middle")
      .attr("x", width / 2)
      .attr("y", 0 - margin.top + 20) 
      .text("Calories Burned vs. Fat Percentage")
      .attr("font-weight", "bold")
      .style("font-size", "16px");
    
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

    // adding datapoints
    svg
      .data(filteredData)
      .enter()
      .each(d => {
        const color = d["Gender"] === 'Male' ? "#4FC3F7" : "#F48FB1";
        switch (d["Workout Frequency (days/week)"]) {
          case 2:
            svg
              .append("circle")
              .attr("cx", xScale(d["Calories Burned"]))
              .attr("cy", yScale(d["Fat Percentage"]))
              .attr("r", 5)
              .attr("fill", "none")
              .attr("stroke", color);
            break;
          case 3:
            svg
              .append("rect")
              .attr("x", xScale(d["Calories Burned"]) - 5)
              .attr("y", yScale(d["Fat Percentage"]) - 5) 
              .attr("width", 10)
              .attr("height", 10)
              .attr("fill", "none")
              .attr("stroke", color);
            break;
          case 4:
            svg
              .append("text")
              .attr("x", xScale(d["Calories Burned"]))
              .attr("y", yScale(d["Fat Percentage"]))
              .attr("font-size", "20px") 
              .attr("font-weight", "bold")
              .attr("text-anchor", "middle") 
              .attr("dy", ".35em") 
              .text("+")
              .attr("fill", color); 
            break;
          case 5:
            svg
              .append("text")
              .attr("x", xScale(d["Calories Burned"]))
              .attr("y", yScale(d["Fat Percentage"]))
              .attr("font-family", "Verdana, sans-serif")
              .attr("font-size", "18px") 
              .attr("text-anchor", "middle") 
              .attr("dy", ".35em") 
              .text("x")
              .attr("fill", color); 
            break;
        }
      });
  }
  
  render() {
    const options = ["All", "2", "3", "4", "5"];
    return (
    <div className="graph3">
      <div className="selectors">
        {/* <p style={{ display: "inline" }}><b>Weight: </b></p> */}
        <p style={{ display: "inline" }}><b>Frequency: </b></p>
        {options.map((frequency) => (
          <label key={frequency}>
            <input
              type="radio"
              value={frequency}
              checked={this.state.frequency === frequency}
              onChange={e => {this.setState({frequency: e.target.value})}}
            />
            {frequency}
          </label>
        ))}
      </div>
      <div className="chart"></div>
    </div>);
  }
}

export default Graph3;
