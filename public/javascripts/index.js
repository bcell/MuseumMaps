const infoModal = () => {
  console.log('test function');
  const body = d3.select('body')
      .append('div')
        .attr('class', 'infoModal');
};


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

  const museumRoomSpecs = {
    width: 1500,
    height: 1300
  }

  const svg = d3.select("body").append("svg")
            .attr("width", museumRoomSpecs.width)
            .attr("height", museumRoomSpecs.height);

  const margin = { top: -150, right: 20, bottom: 20, left: 10 };
  const width = svg.attr('width') - margin.left - margin.right;
  const height = svg.attr('height') - margin.top - margin.bottom;

  const g = svg.append('g')
              .attr('transform', `translate(${margin.left},${margin.top})`)
              .attr('class', 'innerCanvas');

  var rects = g.selectAll("rect")
            .data(roomData)
            .enter()
            .append("rect");

  var rectAttributes = rects
            .attr("x", function (d) { return d.Left; })
            .attr("y", function (d) { return (d.Top); })
            .attr("width", function (d) { return d.Width; })
            .attr("height", function (d) { return d.Height; })
            .attr('class', 'museum-room')
            .on('click', this.openModal);

  var text = g.selectAll("text")
            .data(roomData)
            .enter()
            .append("text");

  var textLabels = text
            .attr("x", function(d) { return d.Left + (d.Width * 0.5); })
            .attr("y", function(d) { return d.Top + (d.Height * 0.5); })
            .text(function (d) { return "Room #" + d.RoomNum; })
            .attr("font-family", "sans-serif")
            .attr('text-anchor', 'middle')
            .attr('class', 'museum-room-text');
});

function openModal(e) {
  console.log('event: ', e);
};
