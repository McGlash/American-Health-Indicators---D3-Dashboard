//setup selection variables and set default
var xSelection = "healthcare"
var ySelection = "poverty"

var svgWidth = 0;
var svgHeight = 0;

var margin = {
  top: 20,
  right: 40,
  bottom: 250,
  left: 250};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;
// select chart element
var Area = d3.select("#scatter").select("svg");

// clear chart if not empty
if (!Area.empty()) {
  Area.remove();
};

//setup element to hold chart
svgWidth = window.innerWidth;
svgHeight = window.innerHeight;

margin = {
    top: 20,
    right: 40,
    bottom: 250,
    left: 250};

width = svgWidth - margin.left - margin.right;
height = svgHeight - margin.top - margin.bottom;

var svg = d3.select("#scatter")
              .append("svg")
              .attr("width", svgWidth)
              .attr("height", svgHeight);

// Append group element > margins for within svg element
var chartGroup = svg.append("g")
                    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// setup x-axis labels
var xAxisLabel = chartGroup.append("g")
    .attr("transform", `translate(${width / 2}, ${height + 60})`);

var povertyLabel = xAxisLabel.append("text")
    .attr("x", 0)
    .attr("y", 20)
    .attr("value", "Poverty") 
    .classed("active", true)
    .text("Poverty(%)")
    .classed("aText", true);

var healthLabel = xAxisLabel.append("text")
    .attr("x", 0)
    .attr("y", 65)
    .attr("value", "Holder") 
    .classed("inactive", true)
    .text("holder(%)")
    .classed("aText", true);
  
var smokeLabel = xAxisLabel.append("text")
    .attr("x", 0)
    .attr("y", 110)
    .attr("value", "Holder") 
    .classed("inactive", true)
    .text("holder(%)")
    .classed("aText", true);
  
// setup y-axis labels
var yAxisLabel = chartGroup.append("g")
          .attr("transform", "rotate(-90)");

var povertyLabel = yAxisLabel.append("text")
    .attr("x", -(height-margin.top)/2)
    .attr("y", -70)
    .attr("value", "Poverty") 
    .classed("active", true)
    .text("Poverty(%)")
    .classed("aText", true);

var otherLabel = yAxisLabel.append("text")
    .attr("x", - (height-margin.top)/2)
    .attr("y", -115)
    .attr("value", "Poverty") 
    .classed("inactive", true)
    .text("holder(%)")
    .classed("aText", true);

var holderLabel = yAxisLabel.append("text")
    .attr("x", -(height-margin.top)/2)
    .attr("y", -160)
    .attr("value", "Poverty") 
    .classed("inactive", true)
    .text("holder(%)")
    .classed("aText", true);

function display(){

  // select chart element
  var Area = d3.select("#scatter").select("svg");

  // clear chart if not empty
  if (!Area.empty()) {
    Area.remove();
  };

  //setup element to hold chart
  svgWidth = window.innerWidth;
  svgHeight = window.innerHeight;

  margin = {
      top: 20,
      right: 40,
      bottom: 250,
      left: 250};

  width = svgWidth - margin.left - margin.right;
  height = svgHeight - margin.top - margin.bottom;

  var svg = d3.select("#scatter")
                .append("svg")
                .attr("width", svgWidth)
                .attr("height", svgHeight);

  // Append group element > margins for within svg element
  var chartGroup = svg.append("g")
                      .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // setup x-axis labels
  var xAxisLabel = chartGroup.append("g")
      .attr("transform", `translate(${width / 2}, ${height + 60})`);

  var povertyLabel = xAxisLabel.append("text")
      .attr("x", 0)
      .attr("y", 20)
      .attr("value", "Poverty") 
      .classed("active", true)
      .text("Poverty(%)")
      .classed("aText", true);

  var healthLabel = xAxisLabel.append("text")
      .attr("x", 0)
      .attr("y", 65)
      .attr("value", "Holder") 
      .classed("inactive", true)
      .text("holder(%)")
      .classed("aText", true);
    
  var smokeLabel = xAxisLabel.append("text")
      .attr("x", 0)
      .attr("y", 110)
      .attr("value", "Holder") 
      .classed("inactive", true)
      .text("holder(%)")
      .classed("aText", true);
    
  // setup y-axis labels
  var yAxisLabel = chartGroup.append("g")
            .attr("transform", "rotate(-90)");

  var povertyLabel = yAxisLabel.append("text")
      .attr("x", -(height-margin.top)/2)
      .attr("y", -70)
      .attr("value", "Poverty") 
      .classed("active", true)
      .text("Poverty(%)")
      .classed("aText", true);

  var otherLabel = yAxisLabel.append("text")
      .attr("x", - (height-margin.top)/2)
      .attr("y", -115)
      .attr("value", "Poverty") 
      .classed("inactive", true)
      .text("holder(%)")
      .classed("aText", true);

  var holderLabel = yAxisLabel.append("text")
      .attr("x", -(height-margin.top)/2)
      .attr("y", -160)
      .attr("value", "Poverty") 
      .classed("inactive", true)
      .text("holder(%)")
      .classed("aText", true);

  chart(xSelection, ySelection, width, height, chartGroup);
};

function chart(firstVariable, secondVariable, widthVariable, heightVariable, chartElement){
  // Retrieve data from the CSV file
  d3.csv("assets/data/data.csv").then(function(data, err) {
    if (err) throw err;

    // format the data
    data.forEach(d => {
      d.healthcare= +d.healthcare;
      d.poverty = +d.poverty;
    });

    // setup functions for scaling axes
    var xScale = d3.scaleLinear()
                        .domain([d3.min(data, d => d[firstVariable]) - 5, d3.max(data, d => d[firstVariable]) + 5])
                        .range([0, widthVariable]);

    var yScale = d3.scaleLinear()
                        .domain([d3.min(data, d => d[secondVariable]) - 5, d3.max(data, d => d[secondVariable]) + 5])
                        .range([heightVariable, 0])


    // setup axis functions
    var bottomAxis = d3.axisBottom(xScale);
    var leftAxis = d3.axisLeft(yScale);

    // append axes
    var xAxis = chartElement.append("g")
                          .attr("transform", `translate(0, ${heightVariable})`)
                          .call(bottomAxis)
                          .selectAll("text")
                          .style("fill", " #9b9292")
                          .style("font", "25px sans serif");

    var YAxis = chartElement.append("g")
                          .call(leftAxis)
                          .selectAll("text")
                          .style("font", "25px sans serif")
                          .style("fill", " #9b9292");

    // append circles and labels
    var circlePlot = chartElement.append("g").selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", d => xScale(d[firstVariable]))
      .attr("cy", d => yScale(d[secondVariable]))
      .attr("r", 30)
      .attr("fill", "blue")
      .attr("opacity", ".5");
    
    var circleLabels = chartElement.append("g").selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .text( d => d.abbr)
      .attr("x", d => xScale(d[firstVariable]))
      .attr("y", d => yScale(d[secondVariable])+3.5)
      .classed("stateText", true)

  // setup tooltip 
  
    //Initialize tooltip
  var toolTip = d3.tip()
  .attr("class", "d3-tip")
  .offset([80, -60])
  .html(d =>`<strong>${d.state}<strong>
  <hr>${firstVariable}: ${d[firstVariable]}%
  <hr>${secondVariable}: ${d[secondVariable]}%`);


    //Create the tooltip in chartGroup.
  chartElement.call(toolTip);

  // Create "mouseover" event listener to display tooltip
  circleLabels.on("mouseover", function(d) {
    toolTip.show(d, this);
  })
// Create "mouseout" event listener to hide tooltip
  .on("mouseout", function(d) {
    toolTip.hide(d);
    });

  });

};

// x axis labels event listener
xAxisLabel.selectAll("text")
.on("click", function() {

  // get value of selection
  var xSelected = d3.select(this).attr("value");

  if (xSelected !== xSelection) {

    // replaces chosenXAxis with value
    xSelection = xSelected;
  };
  console.log(xSelection)
});



// call function when opening browser
display();

// call function to display chart based on chart size/resize
d3.select(window).on("resize", display);

console.log(xSelection)
console.log(xAxisLabel.selectAll("text"))


