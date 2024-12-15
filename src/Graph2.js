import { Component } from "react";
import * as d3 from "d3";
import "./Graph2.css";
import "./age-slider";


class Graph2 extends Component {
    constructor(props) {
      super(props);
      this.state = {
        minAge: 26,
        maxAge: 49
      };
    }

    componentDidMount() {
        this.renderChart();
      }
    
      componentDidUpdate() {
        this.renderChart();
      }


    renderChart() {

        //initial setup
        const { csv_data } = this.props;
        const { minAge, maxAge } = this.state;


        //data to be filtered
        let filteredData = csv_data;

        // filter by ages

        if (minAge > 26|| maxAge < 49) {
        filteredData = filteredData.filter((d) => {
            return d["Age"] >= minAge && d["Age"] <= maxAge;
        });
        }

        //graph measurements

        const margin = { top: 50, right: 10, bottom: 50, left: 30 },
            width = 600 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;


        //chart cleaner
        d3.select(".chart1").selectAll("*").remove();
        
        const svg = d3
              .select(".chart1")
              .append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .append("g")
              .attr("transform", `translate(${margin.left},${margin.top})`);
        
            const xData = filteredData.map((d) => d["BPM Diff"]);
            const xScale = d3
              .scaleLinear()
              .domain([d3.min(xData) - 5, d3.max(xData)])
              .range([0, width]);
        
            const yData = filteredData.map((d) => d["Calories Burned"]);
            const yScale = d3
              .scaleLinear()
              .domain([d3.min(yData), d3.max(yData)])
              .range([height, 0]);

            
            svg
                .append("text")
                .attr("text-anchor", "middle")
                .attr("x", width / 2)
                .attr("y", 0 - margin.top + 20)
                .text("BPM Diff vs. Calories Burned")
                .attr("font-weight", "bold")
                .style("font-size", "16px");
        
            // x-axis
            svg
                .append("g")
                .call(d3.axisBottom(xScale))
                .attr("transform", `translate(${margin.left},${height})`);
        
            // x-axis label
            svg
                .append("text")
                .attr("text-anchor", "middle")
                .attr("x", width / 2)
                .attr("y", height + margin.bottom - 10)
                .text("BPM Diff")
                .style("font-size", "14px");
        
            // y-axis
            svg
                .append("g")
                .call(d3.axisLeft(yScale))
                .attr("transform", `translate(${margin.left}, 0)`);
        
            // y-axis label
            svg
                .append("text")
                .attr("text-anchor", "middle")
                .attr("transform", "rotate(-90)")
                .attr("x", -height / 2)
                .attr("y", -margin.left + 20)
                .text("Calories Burned")
                .style("font-size", "14px");
            

          // adding data to chart

          // scale for radius
          const radScale = d3.scaleLinear()
            .domain([0.35, 3])
            .range([2, 15])

          //session duration to circle radius scale for chart:


            svg
                .data(filteredData)
                .enter()
                .each((d) => {
                const color = d["Gender"] === "Male" ? "#4FC3F7" : "#F48FB1";
                    svg
                        .append("circle")
                        .attr("cx", (xScale(d["BPM Diff"])))
                        .attr("cy", yScale(d["Calories Burned"]))
                        .attr("r", radScale(d["Session Duration (hours)"]))
                        .attr("fill", color)
                        .attr("stroke", color);
                }
                );

            //legend

    const legend = d3
          .select(".chart1")
          .append("svg")
          .attr("width", 200)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", `translate(${margin.left},${margin.top})`);
    
        legend
          .append("text")
          .attr("x", -10)
          .attr("y", -5)
          .attr("font-size", "16px")
          .attr("font-weight", "bold")
          .attr("dy", ".35em")
          .text("Session Duration");
    
        legend
          .append("circle")
          .attr("cx", 0)
          .attr("cy", 15)
          .attr("r", radScale(0.5))
          .attr("fill", "gray")
          .attr("stroke", "gray");
    
        legend
            .append("circle")
            .attr("cx", 0)
            .attr("cy", 34)
            .attr("r", radScale(1))
          .attr("fill", "gray")
          .attr("stroke", "gray");
    
        legend
        .append("circle")
        .attr("cx", 0)
        .attr("cy", 53)
        .attr("r", radScale(1.5))
        .attr("fill", "gray")
        .attr("stroke", "gray");
    
        legend
        .append("circle")
        .attr("cx", 0)
        .attr("cy", 74)
        .attr("r", radScale(2))
        .attr("fill", "gray")
        .attr("stroke", "gray");
    
        legend.append("text").attr("x", 15).attr("y", 20).text("0.5");
    
        legend.append("text").attr("x", 15).attr("y", 40).text("1.00");
    
        legend.append("text").attr("x", 15).attr("y", 58.5).text("1.50");
    
        legend.append("text").attr("x", 15).attr("y", 77.5).text("2.00");
    
        legend
          .append("text")
          .attr("x", -10)
          .attr("y", 115)
          .attr("font-size", "16px")
          .attr("font-weight", "bold")
          .attr("dy", ".35em")
          .text("Gender");
    
        legend
          .append("circle")
          .attr("cx", 0)
          .attr("cy", 135)
          .attr("r", 5)
          .attr("fill", "#4FC3F7");
    
        legend
          .append("circle")
          .attr("cx", 0)
          .attr("cy", 155)
          .attr("r", 5)
          .attr("fill", "#F48FB1");
    
        legend.append("text").attr("x", 15).attr("y", 140).text("Male");
    
        legend.append("text").attr("x", 15).attr("y", 160).text("Female");
        

    }
      
    
    render() {
        return (
          <div className="graph2">
            <div className="selectors2" display="flex" flex-direction="row">
          <p id="weight">
            <b>Age: </b>
          </p>
          <div className="age-slider">
            <input
              type="range"
              min={26}
              max={49}
              value={this.state.minAge}
              step="1"
              onChange={(e) => {
                this.setState({ minAge: e.target.value });
              }}
            />
            <input
              type="range"
              min={26}
              max={49}
              step="1"
              value={this.state.maxAge}
              onChange={(e) => {
                this.setState({ maxAge: e.target.value });
              }}
            />
            <div class="rangeMin">0</div>
            <div class="rangeMax">0</div>
          </div>
            </div>
            <div className="chart1"></div>
            
          </div>
        );
      }
}


export default Graph2;