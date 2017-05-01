var canvas = d3.select("canvas").node(),
    context = canvas.getContext("2d");
    // path = d3.geoPath().projection(null).context(context); //v4
var path = d3.geo.path().projection(null).context(context); //v3

d3.json("/javascripts/freer1.json", function(error, ca) {
  if (error) throw error;

  context.beginPath();
  path(topojson.feature(ca, ca.objects.rooms));
  context.fillStyle = "#baa"; //base color
  context.fill();

// d3.json("/javascripts/freer1.json", function(error, ca) {
//   if (error) return console.error(error);
//
//   var subunits = topojson.feature(ca, ca.objects.rooms);
  // features.selectAll("path") // "features" is not defined
  // .data(topojson.feature(ca, ca.objects.rooms).features)
  // .enter()
  // .append("path")
  // .attr("d", path)
//
//   Sets colors of fill and stroke for each district. Sets stroke width, too.
//   .attr("fill", "#baa")
//   .attr("stroke", "#aaa")
//   .attr("stroke-width", .3)
});

// var map = d3.geomap.choropleth()
//     .geofile('/d3-geomap/topojson/countries/USA.json')
//     .projection(d3.geo.albersUsa)
//     .column('2012')
//     .unitId('fips')
//     .scale(1000)
//     .legend(true);
// d3.csv('/data/venture-capital.csv', function(error, data) {
//
//     d3.select('#map')
//         .datum(data)
//         .call(map.draw, map);
// });
