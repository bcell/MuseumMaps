//I put all the specs for the rooms here in this object for convenience
const museumRoomSpecs = {
    width: 1500,
    height: 1300,
    roomColor: '#183A72',
    roomHoverColor: 'yellow',
    textColor: 'red',
  };

const infoModal = () => {
  console.log('test function');
  const body = d3.select('body')
      .append('div')
        .attr('class', 'infoModal');
};

//mouseover changes the room color, the slow transition is in the css style
const mouseover = (room) => {
  console.log('mouseover: ', room);
  const thisRoom = d3.select(`#Room${room.RoomNum}`)
    .style('fill', museumRoomSpecs.roomHoverColor);
};

//mouseover changes the room color, the slow transition is in the css style
const mouseout = (room) => {
  console.log('mouseover: ', room);
  const thisRoom = d3.select(`#Room${room.RoomNum}`)
    .style('fill', museumRoomSpecs.roomColor);
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


//this is the whole svg
  const svg = d3.select("body").append("svg")
            .attr("width", museumRoomSpecs.width)
            .attr("height", museumRoomSpecs.height)
            .attr("id", "map");

  const margin = { top: -150, right: 20, bottom: 20, left: 10 };
  const width = svg.attr('width') - margin.left - margin.right;
  const height = svg.attr('height') - margin.top - margin.bottom;

//this is the inner canvas within the svg that includes the margins
  const g = svg.append('g')
              .attr('transform', `translate(${margin.left},${margin.top})`)
              .attr('class', 'innerCanvas');

//the roomBoxes contain the rectangles and the text.
//This is necessary so that hovering over the text still counts as hovering
//over the rectangle, i.e. it doesn't transition back the the original
//color when hovering over the text.
  const roomBoxes = g.selectAll('rect')
            .data(roomData)
            .enter().append('g')
              .attr('class', 'roomBox')
              .attr("x", function (d) { return d.Left; })
              .attr("y", function (d) { return d.Top; })
              .attr("width", function (d) { return d.Width; })
              .attr("height", function (d) { return d.Height; })
              .attr("id", function(d){return `RoomBox${d.RoomNum}`})
              .on('mouseover', (d) => mouseover(d))
              .on('mouseout', (d) => mouseout(d));

//these are the rectangles themselves
  const rects = roomBoxes.append("rect")
              .attr('class', 'museum-room')
              .attr("x", function (d) { return d.Left; })
              .attr("y", function (d) { return d.Top; })
              .attr("width", function (d) { return d.Width; })
              .attr("height", function (d) { return d.Height; })
              .attr("id", function(d){return "Room" + d.RoomNum})
              .attr('fill', museumRoomSpecs.roomColor)
              .on('click', this.openModal);

//the room numbers. The css style ensures that the arrow cursor is used rather
//than the text cursor.
  const text = roomBoxes.append('text')
            .attr('class', 'museum-room-text')
            .attr("x", function(d) { return (d.Left + d.Right)/2; })
            .attr("y", function(d) { return (d.Top + (d.Bottom - d.Top)/2); })
            .text(function (d) { return "Room #" + d.RoomNum; })
            .attr("font-family", "sans-serif")
            .attr("font-size", "20px")
            .attr("fill", museumRoomSpecs.textColor)
            .style("text-anchor", "middle");


  // what happen when an option is selected
  d3.select("#selectBox").on("change", function(d){
    var selectedTheme = d3.select(this).property("value");
        d3.selectAll(".rooms").style("fill", museumRoomSpecs.roomColor);
        d3.selectAll(".rooms").filter(function(e){
          return e.Theme === selectedTheme;
        }).style("fill", "yellow");
  });
});

function openModal(e) {
  console.log('event: ', e);
};
