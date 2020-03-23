const draw = (data) => {
  const margin = {
    top: data.top,
    right: data.right,
    bottom: data.bottom,
    left: data.left
  };
  const graphWidth = data.width - margin.left - margin.right;
  const graphHeight = data.height - margin.top - margin.bottom;
  const radius =
    Math.min(
      graphWidth + margin.left + margin.right,
      graphHeight + margin.top + margin.bottom
    ) / 3;

  const svg = d3
    .select(".canvas")
    .append("svg")
    .attr("width", graphWidth + margin.left + margin.right)
    .attr("height", graphHeight + margin.top + margin.bottom);

  const graph = svg
    .append("g")
    .attr("width", graphWidth)
    .attr("height", graphHeight)
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const color = d3.scaleOrdinal(d3["schemeSet1"]);

  const pie = d3.pie()(data.value.map((d) => d.orders));

  var path = d3
    .arc()
    .outerRadius(radius)
    .innerRadius(0);

  var label = d3
    .arc()
    .outerRadius(radius)
    .innerRadius(radius - data.inLabel);

  switch (data.type) {
    case "line":
      const yScaleLine = drawLinearAxis(
        0,
        d3.max(data.value, (d) => d.orders),
        graphHeight,
        0,
        graph
      );
      const xScaleLine = drawBandAxis(
        data.value.map((d) => d.name),
        0,
        graphWidth,
        graph,
        graphHeight
      );
      drawLine(xScaleLine, yScaleLine, data.value, "name", "orders", graph);
      break;
    case "bar":
      const yScaleBar = drawLinearAxis(
        0,
        d3.max(data.value, (d) => d.orders),
        graphHeight,
        0,
        graph
      );
      const xScaleBar = drawBandAxis(
        data.value.map((d) => d.name),
        0,
        graphWidth,
        graph,
        graphHeight
      );
      drawBar(
        xScaleBar,
        yScaleBar,
        graph,
        data.value,
        "name",
        "orders",
        graphHeight,
        xScaleBar.bandwidth
      );
      break;
    case "pie":
      drawPie(
        pie,
        path,
        label,
        graph,
        svg,
        (d, x) => data.value[x].name,
        (d, x) => color(x)
      );
      break;
    default:
      break;
  }
};