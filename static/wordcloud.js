//Import these files on your html page : 
//<!-- Load d3.js -->
//<script src="https://d3js.org/d3.v4.js"></script>

//<!-- Load d3-cloud -->
//<script src="https://cdn.jsdelivr.net/gh/holtzy/D3-graph-gallery@master/LIB/d3.layout.cloud.js"></script>

//myWords = [{word: "Running", size: "10"}, {word: "Surfing", size: "20"}, {word: "Climbing", size: "50"}, {word: "Kiting", size: "30"}, {word: "Sailing", size: "20"}, {word: "Snowboard", size: "60"} ]

function wordcloud(data)
{
	console.log("Word Cloud called");
	//document.getElementsByClassName('wordcloud')[0].innerHTML = '<h1>Word Cloud goes here</h1>';
	myWords = data.words;
	//console.log(myWords);
  max = data.max;
  min = data.min;

	layout = d3.layout.cloud()
    .size([250, 250])
    .words(myWords.map(function(d) {
      return {text: d.word, size: d.size};
    }))
    .padding(5)
    .rotate(function() { return ~~(Math.random() * 2) * 90; })
    .font("Impact")
    .fontSize(function(d) { return (10 + ((d.size - min) * 15/(max - min))) })
    .on("end", draw);

	layout.start();
	//console.log(data);
}

// Constructs a new cloud layout instance. It run an algorithm to find the position of words that suits your requirements
// Wordcloud features that are different from one word to the other must be here

//layout.start();

function draw(words) {
  d3.select("#wordcloud").append("svg")
      .attr("width", layout.size()[0])
      .attr("height", layout.size()[1])
    .append("g")
      .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
    .selectAll("text")
      .data(words)
    .enter().append("text")
      .style("font-size", function(d) { return d.size + "px"; })
      .style("font-family", "Impact")
      .attr("text-anchor", "middle")
      .attr("transform", function(d) {
        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
      })
      .text(function(d) { return d.text; });
}