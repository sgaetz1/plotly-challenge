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

        Plotly.newPlot("bar", data, barLayout);

    })
}

function drawBubblechart(sampleId) {
    console.log(`drawBubblechart(${sampleId})`);

    d3.json("../data/samples.json").then(data => {
        var samples = data.samples;
        var resultArray = samples.filter(samp => samp.id == sampleId);
        var result = resultArray[0];
            
        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        var trace1 = {
            x: otu_ids,
            y: sample_values,
            mode: 'markers',
            marker: {
                size: sample_values,
                color: otu_ids,
                opacity: 1
            },
            text: otu_labels
        }

        var data = [trace1];

        var bubbleLayout = {
            title: "Bubble Chart",
            xaxis: {title: "OTU ID"}
        };

        Plotly.newPlot("bubble", data, bubbleLayout);

    })
}

function metaData(sampleId) {
    console.log(`metaData(${sampleId})`);

    $("#sample-metadata").empty();


    d3.json("../data/samples.json").then(data => {
        var metaData = data.metadata;
        var resultArray = metaData.filter(meta => meta.id == sampleId);
        var result = resultArray[0];
        console.log(result);

        var id = result.id;
        var ethnicity = result.ethnicity;
        var gender = result.gender;
        var age = result.age;
        var location = result.location;
        var bbtype = result.bbtype;
        var wfreq = result.wfreq;
        var info = [id,ethnicity,gender,age,location,bbtype,wfreq];


        console.log(info);

        
        var ul = d3.select("#sample-metadata").append("ul");

        ul.append("li").text(`Id: ${id}`);
        ul.append("li").text(`Ethnicity: ${ethnicity}`);
        ul.append("li").text(`Gender: ${gender}`);
        ul.append("li").text(`Age: ${age}`);
        ul.append("li").text(`Location: ${location}`);
        ul.append("li").text(`Bbtype: ${bbtype}`);
        ul.append("li").text(`Wfreq: ${wfreq}`);
                            
    })
}

function warshGauge(sampleId) {
    console.log(`warshGauge(${sampleId})`);


    d3.json("../data/samples.json").then(data => {
        var metaData = data.metadata;
        var resultArray = metaData.filter(meta => meta.id == sampleId);
        var result = resultArray[0];
        console.log(result);
        var wfreq = result.wfreq;



        var data = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: wfreq,
                title: { text: "Belly Button Washing Frequency"},
                type: "indicator",
                mode: "gauge+number"
                gauge: {
                    axis: { range: [null,9]},
                    steps: [
                        { range: [0,3], color: "red"},
                        {range: [3,6], color: "green"},
                        {range: }
                    ]
                }
            }
        ];
        
        var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
        Plotly.newPlot('gauge', data, layout);
    })
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
    warshGauge(id);

});

