// make sure file loaded
console.log("app.js loaded");


function drawBargraph(sampleId) {
    console.log(`drawBargraph(${sampleId})`);
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
