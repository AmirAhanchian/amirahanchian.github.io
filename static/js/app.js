const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

function init(){
    let dropdownMenu = d3.select("#selDataset");
    d3.json(url).then((info) => {
        let sample_name = info.names;
        sample_name.forEach((sample)=>{
            dropdownMenu.append("option").text(sample).property("value", sample);
        })
        let first = sample_name[0];
        console.log(first);
        dashboard(first);

    }); 
}
init();


// Click Reaction - optionChanged function


function optionChanged(newSelection){
    dashboard(newSelection);
};

function dashboard(sample){
    d3.json(url).then((data) => {
        let sampleinfo = data.samples;
        console.log(sampleinfo)

        let sampleSelect = sampleinfo.filter(sampleID => sampleID.id == sample);

        let otu_ids = sampleSelect[0].otu_ids;

        let otu_labels = sampleSelect[0].otu_labels;

        let sample_values = sampleSelect[0].sample_values;




        let topO_ids = otu_ids.slice(0,10).reverse();

        let topO_labels = otu_labels.slice(0,10).reverse();

        let topSamples = sample_values.slice(0,10).reverse();

        let topO_yaxis = topO_ids.map(item => `OTU ${item}`);




        var trace1 = {
            x: topSamples,
            y: topO_yaxis,
            type: 'bar',
            orientation: 'h',
            text: topO_labels
        }

        var barData = [trace1];

        var barLayout = {
            showlegend: false,
            height: 600,
            width: 500
        };

        Plotly.newPlot("bar", barData, barLayout)

        var trace2 = {
            x: otu_ids,
            y: sample_values,
            text: topO_labels,
            mode: 'markers',
            marker:{
                color: otu_ids,
                colorscale: "Jet",
                size: sample_values
            }

        };

        var bub_data = [trace2];

        var bub_layout = {
            showlegend: false,
            height: 600,
            width: 1200,
            xaxis: {
                title: "OTU ID"
            }
        };
        
        Plotly.newPlot('bubble', bub_data,bub_layout);

        let metadata_info = data.metadata;

        let metadata_selected = metadata_info.filter(metadataID => metadataID.id == sample);

        let info_selection = Object.entries(metadata_selected[0]);

        let panel = d3.select(".panel-body");

        panel.html("");

        info_selection.forEach(([key, value])=>{
            panel.append("h6").text(`${key}: ${value}`)

        });

    })
};
