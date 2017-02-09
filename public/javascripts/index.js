var canvas = d3.select("canvas").node(),
    context = canvas.getContext("2d"),
    // path = d3.geoPath().projection(null).context(context); //v4
    path = d3.geo.path().projection(null).context(context); //v3

d3.json("/javascripts/freer1.json", function(error, ca) {
  if (error) throw error;

  context.beginPath();
  path(topojson.feature(ca, ca.objects.rooms));
  context.fillStyle = "#bda";
  context.fill();
});
