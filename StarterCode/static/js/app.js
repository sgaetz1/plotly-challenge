// make sure file loaded
console.log("app.js loaded");

// some of this code is from Dom in office hours
function drawBargraph(sampleId) {
    console.log(`drawBargraph(${sampleId})`);

    d3.json("../data/samples.json").then(data => {
        // console.log(data);

        var samples = data.samples;
        var resultArray = samples.filter(samp => samp.id == sampleId);
        var result = resultArray[0];
        
        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        yticks = otu_ids.slice(0,10).map(otuId => `OTU ${otuId}`).reverse();

        var barData = {
            x: sample_values.slice(0,10).reverse(),
            y: yticks,
            type: "bar",
            text: otu_labels.slice(0,10).reverse(),
            orientation: "h"
        }

        var data = [barData];

        var barLayout = {
            title: "Top 10 Bacteria Cultures Found"
        }

        Plotly.newPlot("bar", data, barLayout)

    })
}

function drawBubblechart(sampleId) {
    console.log(`drawBubblechart(${sampleId})`);
}

function metaData(sampleId) {
    console.log(`metaData(${sampleId})`);
}

function optionChanged(newSampleId) {
    console.log(`User selected ${newSampleId}`);

    drawBargraph(newSampleId);
    drawBubblechart(newSampleId);
    metaData(newSampleId);
    
}

// get the samples data and print it to the console
d3.json("../data/samples.json").then(function(sampleData){
    
    console.log(sampleData);

    var selector = d3.select("#selDataset");

    var sampleNames = sampleData.names;

    sampleNames.forEach(sampleId => {
        selector.append("option").text(sampleId).property("value",sampleId);
    });

    var id = sampleNames[0];

    drawBargraph(id);
    drawBubblechart(id);
    metaData(id);

});
