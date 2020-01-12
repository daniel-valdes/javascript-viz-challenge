
function BuildPlots(sample) {

    d3.json("samples.json").then((importedData) => {

    var sample_values = importedData.samples[0].sample_values

    var otu_ids = importedData.samples[0].otu_ids;
    var otu_labels = importedData.samples[0].otu_labels;
    var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();

    // Building Bar Chart
        var barData = [{
            y: yticks,
            x: sample_values.slice(0, 10).reverse(),
            text: otu_labels.slice(0, 10).reverse(),
            type: "bar",
            orientation: "h",
        }];

        var barLayout = {
        title: "Top 10 Bacteria Cultures Found",
        margin: {
            t: 30,
            l: 150
        }
        };

        Plotly.newPlot("bar", barData, barLayout);


    // Building Bubble Plot
        var bubbleData = [{
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
            }];

        var bubbleLayout = {
            title: "Bacteria Cultures Per Sample",
            margin: {
                t: 0
            },
            hovermode: "closest",
            xaxis: {
                title: "OTU ID"
            },
            margin: {
                t: 30
            }
            };
    
        Plotly.newPlot("bubble", bubbleData, bubbleLayout);

    // Building Gauge Chart
        // var gaugeData = [{
        //     domain: { x: [0, 1], y: [0, 1] },
		//     value: wfreq,
        //     title: { text: "Belly Button Washing Frequency" },
        //     gauge: {
        //         axis: { range: [null, 10], tickwidth: 1, tickcolor: "darkblue" },
        //         steps: [
        //             { range: [0, 1], color: "beige" },
        //             { range: [1, 2], color: "honeydew" },
        //             { range: [2, 3], color: "PaleGoldenRod" },
        //             { range: [3, 4], color: "MediumSpringGreen" },
        //             { range: [4, 5], color: "cyan" },
        //             { range: [5, 6], color: "cyan" },
        //             { range: [7, 8], color: "cyan" },
        //             { range: [8, 9], color: "cyan" },
        //           ],
        //     },
		//     type: "indicator",
		//     mode: "gauge+number"

        //     }];

        // var gaugeLayout = { width: 600, height: 450, margin: { t: 0, b: 0 } };

        // Plotly.newPlot("gauge", gaugeData, gaugeLayout);

    });

};   


function FetchMetaData(sample) {

    d3.json("samples.json").then((importedData) => {

        var metadata = importedData.metadata

        var filter = metadata.filter(meta => meta.id.toString() === sample)[0];
        var demo = d3.select("#sample-metadata");
         
        demo.html("");
 
        Object.entries(filter).forEach((key) => {   
        demo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
        });

     });

};

function BuildGauge (sample) {

    d3.json("samples.json").then((importedData) => {

        var metadata = importedData.metadata

        var filter = metadata.filter(meta => meta.id.toString() === sample)[0];

        // Building Gauge Chart
        var gaugeData = [{
            domain: { x: [0, 1], y: [0, 1] },
		    value: filter.wfreq,
            title: { text: "Belly Button Washing Frequency" },
            gauge: {
                axis: { range: [null, 10], tickwidth: 1, tickcolor: "darkblue" },
                steps: [
                    { range: [0, 1], color: "beige" },
                    { range: [1, 2], color: "honeydew" },
                    { range: [2, 3], color: "PaleGoldenRod" },
                    { range: [3, 4], color: "MediumSpringGreen" },
                    { range: [4, 5], color: "cyan" },
                    { range: [5, 6], color: "cyan" },
                    { range: [7, 8], color: "cyan" },
                    { range: [8, 9], color: "cyan" },
                  ],
            },
		    type: "indicator",
		    mode: "gauge+number"

            }];

        var gaugeLayout = { width: 600, height: 450, margin: { t: 0, b: 0 } };

        Plotly.newPlot("gauge", gaugeData, gaugeLayout);

    });
}

function InitDash() {

    var dropdown = d3.select("#selDataset");

    d3.json("./samples.json").then((data) => {
        console.log(data);

        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });
        
        FetchMetaData(data.names[0]);
        BuildPlots(data.names[0]);
        BuildGauge(data.names[0]);
        
    });


};

InitDash()

d3.selectAll("#selDataset").on("change", updateDash);

function updateDash () {

    var dropdown = d3.select("#selDataset");

    d3.json("./samples.json").then((data) => {
        console.log(data);

        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

        BuildPlots(data.names[0]);
        FetchMetaData(data.names[0]);
        BuildGauge(data.names[0])
    });

};