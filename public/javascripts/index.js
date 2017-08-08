d3.csv("data/freer.csv", function (error, roomData) {
  roomData.forEach(function (d) {
    d['Bottom'] = +d['Bottom'];
    d['Top'] = +d['Top'];
    d['Left'] = +d['Left'];
    d['Right'] = +d['Right'];
    d['Width'] = d['Right']-d['Left'];
    d['Height'] = d['Bottom']-d['Top'];
  });

  // obtain theme data from main data file
  var themes = Array.from(new Set(roomData.map(function(d){return d.Theme})))
                    .filter(function(d){
                      return d.length !== 0
                    });
  // create selection box
  var selectBox = d3.select("body").append("div")
                    .attr("id", "controlBar")
                    .append("select")
                    .attr("id", "selectBox");

  // append options to the selection box
  d3.select("#selectBox").selectAll("option")
  .data(themes)
  .enter()
  .append("option")
  .attr("value", function(d){
    return d;
  })
  .text(function(d){
    return d;
  });

  var svg = d3.select("body").append("svg")
            .attr("width", 1500)
            .attr("height", 1300)
            .attr("id", "map");

  var rects = svg.selectAll("rect")
            .data(roomData)
            .enter()
            .append("rect")
            .attr("class", "rooms");

  var rectAttributes = rects
            .attr("x", function (d) { return d.Left; })
            .attr("y", function (d) { return d.Top; })
            .attr("width", function (d) { return d.Width; })
            .attr("height", function (d) { return d.Height; })
            .attr("id", function(d){return "Room" + d.RoomNum})
            .style("fill", "green");

  var text = svg.selectAll("text")
            .data(roomData)
            .enter()
            .append("text");

  var textLabels = text
            .attr("x", function(d) { return (d.Left + d.Right)/2; })
            .attr("y", function(d) { return (d.Top + (d.Bottom - d.Top)/2); })
            .text(function (d) { return "Room #" + d.RoomNum; })
            .attr("font-family", "sans-serif")
            .attr("font-size", "20px")
            .attr("fill", "red")
            .style("text-anchor", "middle");


  // what happen when an option is selected
  d3.select("#selectBox").on("change", function(d){
    var selectedTheme = d3.select(this).property("value");
        d3.selectAll(".rooms").style("fill", "green");
        d3.selectAll(".rooms").filter(function(e){
          return e.Theme === selectedTheme;
        }).style("fill", "yellow");
  });
});
