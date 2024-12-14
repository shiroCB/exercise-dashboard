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
    console.log(this.state.data);
    var data = this.state.data.map((d) => {
      return {
        "Workout Type": d["Workout Type"],
        "Experience Level": d["Experience Level"],
        "Water Intake (liters)": d["Water Intake (liters)"],
      };
    });

    var margin = { top: 40, bot: 70, left: 50, right: 50 };
    var w = 1200 - margin.left - margin.right;
    var h = 400 - margin.top - margin.bot;

    var container = d3
      .select(".graphContainer")
      .attr("width", w + margin.left + margin.right)
      .attr("height", h + margin.top + margin.bot)
      .select(".g1")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    /**
     * Title and axis labels
     */
    container
      .selectAll(".title")
      .data([0])
      .join("text")
      .text("Workout Types and Experience levels")
      .attr("font-size", "20px")
      .attr("font-weight", "bold");

    container
      .selectAll(".x-label")
      .data([0])
      .join("text")
      .text("Count of Workout Type")
      .attr("transform", `translate(${w / 2 - 75}, ${h + 45})`);

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
      .call(d3.axisLeft(y_scale))
      .selectAll("path, line")
      .remove();

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
      .selectAll("path")
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
      (d) => d["Experience Level"]
    );

    const arrCounts = [];
    workoutTypes.map((d) => {
      arrCounts.push({
        workoutType: d,
        exp1: groupedData.get(d).get(1).length,
        exp2: groupedData.get(d).get(2).length,
        exp3: groupedData.get(d).get(3).length,
        exp1data: groupedData.get(d).get(1),
        exp2data: groupedData.get(d).get(2),
        exp3data: groupedData.get(d).get(3),
      });
    });

    const stack = d3.stack().keys(expKeys)(arrCounts);

    var bar_groups = container
      .selectAll(".expLevel")
      .data(stack)
      .join("g")
      .attr("class", "expLevel")
      .attr("fill", (d) => {
        // console.log(d);
        return color(d.key);
      });

    var bars = bar_groups
      .selectAll(".subBar")
      .enter()
      .data((d) => d);

    bars
      .join("rect")
      .attr("class", "subBar")
      .attr("y", (d) => y_scale(d.data.workoutType))
      .attr("x", (d) => x_scale(d[0]))
      .attr("height", y_scale.bandwidth())
      .attr("width", (d) => x_scale(d[1] - d[0]));

    /**
     * Labels that go over each section of the bars
     */
    const totalCount = data.length;
    bars
      .join("text")
      .text((d) => {
        const subL = d[1] - d[0];
        return `${((100 * subL) / totalCount).toFixed(2)}% (${subL})`;
      })
      .style("text-anchor", "middle")
      .style("fill", "black")
      .attr("x", (d) => x_scale((d[0] + d[1]) / 2))
      .attr("y", (d) => y_scale(d.data.workoutType) + 20)
      .style("font-size", "12px");

    bars
      .join("text")
      .text((d) => {
        const subL = d[1] - d[0];
        var expLevel =
          subL === d.data.exp1
            ? "exp1data"
            : subL === d.data.exp2
              ? "exp2data"
              : subL === d.data.exp3
                ? "exp3data"
                : 0;
        var liters = d.data[expLevel].map(
          (val) => val["Water Intake (liters)"]
        );
        return `Water Intake ${d3.mean(liters).toFixed(2)} Liters`;
      })
      .style("text-anchor", "middle")
      .style("fill", "black")
      .attr("x", (d) => x_scale((d[0] + d[1]) / 2))
      .attr("y", (d) => y_scale(d.data.workoutType) + 37)
      .style("font-size", "12px");
  }

  render() {
    return (
      <div className="graph1">
        <svg className="graphContainer">
          <g className="g1"></g>
        </svg>

        <div className="legend">
          <div>Experience Level</div>

          <div className="legendItem">
            <div
              className="box"
              style={{ backgroundColor: "#4e79a7", margin: 3 }}
            ></div>
            Level 1
          </div>

          <div className="legendItem">
            <div
              className="box"
              style={{ backgroundColor: "#f28e2c", margin: 3 }}
            ></div>
            Level 2
          </div>

          <div className="legendItem">
            <div
              className="box"
              style={{ backgroundColor: "#e15759", margin: 3 }}
            ></div>
            Level 3
          </div>
        </div>
      </div>
    );
  }
}

export default Graph1;
