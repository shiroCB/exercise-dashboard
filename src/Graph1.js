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

    var margin = { top: 30, bot: 100, left: 50, right: 50 };
    var w = 1000 - margin.left - margin.right;
    var h = 400 - margin.top - margin.bot;

    var container = d3
      .select(".graphContainer")
      .attr("width", w + margin.left + margin.right)
      .attr("height", h + margin.top + margin.bot)
      .select(".g1")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    /**
     * y-axis
     */
    var workoutTypeCount = {};
    data.map((d) => {
      workoutTypeCount[d["Workout Type"]] =
        workoutTypeCount[d["Workout Type"]] + 1 || 1;
    });
    const workoutTypes = Object.keys(workoutTypeCount);
    const y_scale = d3
      .scaleBand()
      .domain(workoutTypes)
      .range([0, h])
      .padding(0.3);
    container
      .selectAll(".y_axis")
      .data([0])
      .join("g")
      .attr("class", "y_axis")
      .call(d3.axisLeft(y_scale));

    /**
     * x-axis
     */
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
      .call(d3.axisBottom(x_scale))
      .selectAll("path, line")
      .remove();

    /**
     * Draw the bars
     */
    const expKeys = ["exp1", "exp2", "exp3"];
    const color = d3
      .scaleOrdinal()
      .domain(expKeys)
      .range(d3[`schemeTableau10`]);

    const groupedData = d3.group(
      data,
      (d) => d["Workout Type"],
      (d) => d["Experience Level"],
    );

    const arrCounts = [];
    workoutTypes.map((d) => {
      arrCounts.push({
        workoutType: d,
        exp1: groupedData.get(d).get(1).length,
        exp2: groupedData.get(d).get(2).length,
        exp3: groupedData.get(d).get(3).length,
      });
    });

    const stack = d3.stack().keys(expKeys)(arrCounts);

    container
      .selectAll(".expLevel")
      .data(stack)
      .join("g")
      .attr("class", "expLevel")
      .attr("fill", (d) => color(d.key))

      .selectAll(".subBar")
      .data((D) => D.map((d) => ((d.key = D.key), d)))
      .join("rect")
      .attr("class", "subBar")
      .attr("y", (d) => y_scale(d.data.workoutType))
      .attr("x", (d) => x_scale(d[0]))
      .attr("height", y_scale.bandwidth())
      .attr("width", (d) => x_scale(d[1] - d[0]));

    // container.selectAll('path, line').remove()
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
