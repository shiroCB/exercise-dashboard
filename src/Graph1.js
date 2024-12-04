import { Component } from "react";
import "./Graph1.css";
import * as d3 from "d3";

class Graph1 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.setState({ data: this.props.data });
  }

  componentDidUpdate() {
    var data = this.state.data.map((d) => {
      return {
        "Workout Type": d["Workout Type"],
        "Experience Level": d["Experience Level"],
        "Water Intake (liters)": d["Water Intake (liters)"],
      };
    });
    console.log(data);

    var margin = { top: 30, bot: 30, left: 50, right: 50 };
    var w = 1000 - margin.left - margin.right;
    var h = 400 - margin.top - margin.bot;

    var container = d3
      .select(".graphContainer")
      .attr("width", w + margin.left + margin.right)
      .attr("height", h + margin.top + margin.bot)
      .select(".g1")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // y-axis (labels)
    var workoutTypeCount = {};
    data.map((d) => {
      workoutTypeCount[d["Workout Type"]] =
        workoutTypeCount[d["Workout Type"]] + 1 || 1;
    });
    console.log(workoutTypeCount);

    // experimental. groups first by workot type, then by expreriene level
    const testTypes = d3.groups(
      data,
      (d) => d["Workout Type"],
      (d) => d["Experience Level"]
    );
    console.log(testTypes);

    const workoutTypes = Object.keys(workoutTypeCount);
    const y_scale = d3
      .scaleBand()
      .domain(workoutTypes)
      .range([0, h])
      .padding(0.2);
    container
      .selectAll(".y_axis")
      .data([0])
      .join("g")
      .attr("class", "y_axis")
      .call(d3.axisLeft(y_scale));

    // x-axis (count)
    const x_scale = d3
      .scaleLinear()
      .domain([0, d3.max(Object.values(workoutTypeCount))])
      .range([0, w])
      .nice();
    container
      .selectAll(".x_axis")
      .data([0])
      .join("g")
      .attr("class", "x_axis")
      .attr("transform", `translate(0, ${h})`)
      .call(d3.axisBottom(x_scale));

    // actual bars
    container.selectAll("rect").data(testTypes).join("rect").attr('x', d=>x_scale())
  }

  render() {
    return (
      <div className="graph1">
        <svg className="graphContainer">
          <g className="g1"></g>
        </svg>
      </div>
    );
  }
}

export default Graph1;
