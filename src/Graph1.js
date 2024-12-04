import { Component } from "react";
import * as d3 from "d3";

class Streamgraph extends Component {
  state = {
    data: [],
  };

  componentDidMount() {
    this.setState({ ...this.state });
  }

  componentDidUpdate() {
    var data = this.state.data;

    var margin = { top: 30, bot: 30, left: 40, right: 40 };
    var w = 600 - margin.left - margin.right;
    var h = 500 - margin.top - margin.bot;

    var container = d3
      .select(".graphContainer")
      .attr("width", w + margin.left + margin.right)
      .attr("height", h + margin.top + margin.bot)
      .select(".g1")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);
  }

  render() {
    return (
      <div>
        <svg className="graphContainer">
          <g className="g1"></g>
        </svg>
      </div>
    );
  }
}

export default Streamgraph;
