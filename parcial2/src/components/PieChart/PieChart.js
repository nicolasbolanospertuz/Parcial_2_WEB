import React from "react";
import * as d3 from "d3";

const Arc = ({ data, index, createArc, colors }) => (
  <g key={index} className="arc">
    <path className="arc" d={createArc(data)} fill={colors(index)} />
  </g>
);

const PieChart = (props) => {
  const createPie = d3.pie().value((d) => d.powerUsage.value);
  const createArc = d3
    .arc()
    .innerRadius(props.innerRadius)
    .outerRadius(props.outerRadius);
  const data = createPie(props.data);
  const colors = d3
    .scaleOrdinal()
    .domain(data)
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"]);
  data.map((d, i) => console.log(d));
  return (
    <svg width={props.width} height={props.height}>
      <g transform={`translate(${props.outerRadius} ${props.outerRadius})`}>
        {data.map((d, i) => (
          <Arc
            key={i}
            data={d}
            index={i}
            createArc={createArc}
            colors={colors}
          />
        ))}
      </g>
    </svg>
  );
};

export default PieChart;
