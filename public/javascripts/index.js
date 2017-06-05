d3.csv("data/freer.csv", function (error, roomData) {
  roomData.forEach(function (d) {
    d['Bottom'] = +d['Bottom'];
    d['Top'] = +d['Top'];
    d['Left'] = +d['Left'];
    d['Right'] = +d['Right'];
    d['Width'] = d['Right']-d['Left'];
    d['Height'] = d['Bottom']-d['Top'];
  });
  console.log(roomData);

  var svg = d3.select("body").append("svg")
            .attr("width", 1500)
            .attr("height", 1300);

  var rects = svg.selectAll("rect")
            .data(roomData)
            .enter()
            .append("rect");

  var rectAttributes = rects
            .attr("x", function (d) { return d.Left; })
            .attr("y", function (d) { return (d.Top-200); })
            .attr("width", function (d) { return d.Width; })
            .attr("height", function (d) { return d.Height; })
            .style("fill", "green");

  var text = svg.selectAll("text")
            .data(roomData)
            .enter()
            .append("text");

  var textLabels = text
            .attr("x", function(d) { return d.Left; })
            .attr("y", function(d) { return (d.Top-200); })
            .text(function (d) { return "Room #" + d.RoomNum; })
            .attr("font-family", "sans-serif")
            .attr("font-size", "20px")
            .attr("fill", "red");
});
