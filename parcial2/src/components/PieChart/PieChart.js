import React, { useEffect, useRef } from "react";
import { FormattedMessage } from "react-intl";
import * as d3 from "d3";
import "./PieChart.css";

const PieChart = (props) => {
  const pieChart = useRef();

  useEffect(() => {
    const pieArc = d3.arc().innerRadius(0).outerRadius(200);
    const piedata = d3.pie().value((d) => d.powerUsage.value)(props.data);
    const pieColors = d3.scaleOrdinal([
      "#ff6150",
      "#1ac0c6",
      "#dee0e6",
      "#ffa822",
      "#134e6f",
    ]);

    const svg = d3
      .select(pieChart.current)
      .attr("width", 600)
      .attr("height", 600)
      .append("g")
      .attr("transform", "translate(300,300)");

    const mouseHoverTool = d3
      .select("#pieChart")
      .append("div")
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("background-color", "white");

    svg
      .append("g")
      .selectAll("path")
      .data(piedata)
      .join("path")
      .attr("d", pieArc)
      .attr("fill", (d, i) => pieColors(i))
      .attr("stroke", "white")
      .on("mouseover", (e, d) => {
        mouseHoverTool
          .style("visibility", "visible")
          .text(
            `${d.data.name}: ` +
              `${d.data.powerUsage.value}` +
              ` ${d.data.powerUsage.unit}`
          );
      })
      .on("mousemove", (e, d) => {
        mouseHoverTool
          .style("top", e.pageY - 50 + "px")
          .style("left", e.pageX - 50 + "px");
      })
      .on("mouseout", () => {
        mouseHoverTool.style("visibility", "hidden");
      });
  });

  return (
    <div id="pieChart">
      <h3>
        <FormattedMessage id="ChartTitle" />
      </h3>
      <svg ref={pieChart}></svg>
    </div>
  );
};

export default PieChart;
