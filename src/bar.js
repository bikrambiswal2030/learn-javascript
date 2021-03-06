import * as d3 from "d3";
import { drawBandAxis } from "./bandAxis.js";
import { drawLinearAxis } from "./linearAxis.js";

export const drawBar = (barArg) => {
  const yScale = drawBandAxis({
    type: barArg.type,
    domainArr: barArg.data.map((d) => d.yAxis),
    rangeMin: 0,
    rangeMax: barArg.graphHeight,
    parentGroup: barArg.graph,
    height: barArg.graphHeight
  });

  const xScale = drawLinearAxis({
    type: barArg.type,
    domainMin: 0,
    domainMax: d3.max(barArg.data, (d) => d.xAxis),
    rangeMin: 0,
    rangeMax: barArg.graphWidth,
    parentGroup: barArg.graph,
    height: barArg.graphHeight
  });

  const rects = barArg.graph.selectAll("rect").data(barArg.data);

  rects
    .enter()
    .append("rect")
    .attr("y", (d) => yScale(d[barArg.yScaleAttrName]))
    .attr("height", yScale.bandwidth())
    .attr("x", 0)
    .attr("width", (d) => xScale(d[barArg.xScaleAttrName]))
    .attr("fill", barArg.barColor);
};
