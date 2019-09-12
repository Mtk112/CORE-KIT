'use strict'
/* Draws selected riversegment's 30-year flow data */
function drawRiver(riverId){
    var mode = document.getElementById("mode").value;
    var model = document.getElementById("model").value;
    console.log("Drawing info riverID : " + riverId);
    Plotly.d3.csv('data/outflow_summary/'+ riverId +'.csv', function(err, rows) {
    function unpack(rows, key) {
    return rows.map(function(row) { return row[key]; });
  }
  /* If no specific model & climate forcing is selected draws from all sets, user can select data from
  minimum, maximum, mean and median. */
  if(model == "all"){
    var data = [{
      type: 'scatter',
      mode: 'lines',
      x: unpack(rows, 'Month'),
      y: unpack(rows, 'Value'),
      text: unpack(rows, 'Prediction'),
      transforms: [
        {
        type: 'filter',
        target: unpack(rows, 'Stat'),
        operation: '=',
        value: mode
        },  {
        type: 'groupby',
        groups: unpack(rows, 'Prediction'),
        styles: [
          //Trace for each Hydrological model & climate forcing.
          {target: 'caraib_gswp3', value: {marker: {color: 'red'}}},
          {target: 'caraib_princeton', value: {marker: {color: 'blue'}}},
          {target: 'caraib_wfdei', value: {marker: {color: 'orange'}}},
          {target: 'dbh_gswp3', value: {marker: {color: 'green'}}},
          {target: 'dbh_princeton', value: {marker: {color: 'purple'}}},
          {target: 'dbh_wfdei', value: {marker: {color: 'yellow'}}},
          {target: 'dlem_gswp3', value: {marker: {color: 'gray'}}},
          {target: 'dlem_princeton', value: {marker: {color: 'pink'}}},
          {target: 'dlem_wfdei', value: {marker: {color: 'cyan'}}},
          {target: 'h08_gswp3', value: {marker: {color: 'crimson'}}},
          {target: 'h08_princeton', value: {marker: {color: 'gold'}}},
          {target: 'lpjml_gswp3', value: {marker: {color: 'khaki'}}},
          {target: 'lpjml_princeton', value: {marker: {color: 'lime'}}},
          {target: 'lpjml_wfdei', value: {marker: {color: 'cadetblue'}}},
          {target: 'matsiro_gswp3', value: {marker: {color: 'navy'}}},
          {target: 'matsiro_princeton', value: {marker: {color: 'darkmagenta'}}},
          {target: 'matsiro_wfdei', value: {marker: {color: 'hotpink'}}},
          {target: 'pcr-globwb_gswp3', value: {marker: {color: 'black'}}},
          {target: 'pcr-globwb_wfdei', value: {marker: {color: 'peru'}}},
          {target: 'vegas_gswp3', value: {marker: {color: 'firebrick'}}},
          {target: 'vegas_wfdei', value: {marker: {color: 'tomato'}}},
          {target: 'vic_princeton', value: {marker: {color: 'peachpuff'}}},
          {target: 'watergap2_princeton', value: {marker: {color: 'forestgreen'}}},
          {target: 'watergap2_wfdei', value: {marker: {color: 'aqua'}}},
          {target: 'LORA', value: {marker: {color: 'silver'}}}
        ]
    }]
  }];

  var layout = {
    width: 280,
    height: 300,
    paper_bgcolor: "transparent",
    plot_bgcolor: "transparent",
    title: mode + " monthly streamflow",
    showlegend: false,
    margin: {
        l: 50,
        r: 5,
        b: 10,
        t: 25,
        pad: 2
    },
    xaxis: {
      type: 'linear',
      autorange: true,
      title: "Month",
      autotick: false,
      ticks: 'outside',
      tick0: 1,
      ticklen: 12
    },
    yaxis: {
      range: Math.max('Value'),
      type: 'linear',
      autorange: true,
      title: "Waterflow  (m^3/s)"
    }
  }
}
// 75th percentile

if(model == "75th"){
  console.log("Hello 75th percentile");
}

// Average from all models & climate forcing sets
if(model == "averages"){
  var data = [{
    type: 'scatter',
    mode: 'lines',
    x: unpack(rows, 'Month'),
    y: unpack(rows, 'Value'),
    text: unpack(rows, 'Stat'),
    transforms: [
      {
        type: 'aggregate',
        aggregations: [{
          target: unpack(rows, 'Prediction'), func: 'avg', enabled: true
        }]
      },
      {
        type: 'groupby',
        groups: unpack(rows, 'Stat'),
        styles: [
          {target: 'median', value: {fill: 'tonexty', fillcolor: 'rgb(139, 192, 138)', marker: {color: 'darkblue'}}},
          {target: 'mean', value: {fill: 'tonexty',fillcolor: 'rgb(139, 192, 138)', marker: {color: 'purple'}}},
          {target: 'min', value: {marker: {color: 'red'}}},
          {target: 'max', value: {fill: 'tonexty', marker: {color: 'forestgreen'}}}                         
      ]}]
  }]

  var layout = {
    width: 280,
    height: 300,
    paper_bgcolor: "transparent",
    plot_bgcolor: "transparent",
    title: mode + " monthly streamflow",
    showlegend: false,
    margin: {
        l: 50,
        r: 5,
        b: 10,
        t: 25,
        pad: 2
    },
    xaxis: {
      type: 'linear',
      autorange: true,
      title: "Month",
      autotick: false,
      ticks: 'outside',
      tick0: 1,
      ticklen: 12
    },
    yaxis: {
      range: Math.max('Value'),
      type: 'linear',
      autorange: true,
      title: "Waterflow  (m^3/s)"
    }
  }
}
// If a specific model & climate forcing is selected draws all data from that
if(model != "all" && model != "averages" && model != "75th"){
  var data = [{
    type: 'scatter',
    mode: 'lines',
    x: unpack(rows, 'Month'),
    y: unpack(rows, 'Value'),
    text: unpack(rows, 'Stat'),
    transforms: [
      {
        type: 'filter',
        target: unpack(rows, 'Prediction'),
        operation: '=',
        value: model
      },
      /*{
        type: 'filter',
        target: unpack(rows, 'Stat'),
        operation: '!=',
        value: 'median'
      },*/
      {
        type: 'groupby',
        groups: unpack(rows, 'Stat'),
        styles: [
          {target: 'median', value: {fill: 'tonexty', fillcolor: 'rgb(139, 192, 138)', marker: {color: 'darkblue'}}},
          {target: 'mean', value: {fill: 'tonexty',fillcolor: 'rgb(139, 192, 138)', marker: {color: 'purple'}}},
          {target: 'min', value: {marker: {color: 'red'}}},
          {target: 'max', value: {fill: 'tonexty', marker: {color: 'forestgreen'}}}                         
      ]}],
}];

var layout = {
  width: 280,
  height: 300,
  paper_bgcolor: "transparent",
  plot_bgcolor: "transparent",
  title: "30-year flow",
  margin: {
      l: 50,
      r: 5,
      b: 10,
      t: 25,
      pad: 2
  },
  xaxis: {
    type: 'linear',
    autorange: true,
    title: "Month",
    autotick: true
  },
  yaxis: {
    range: Math.max('Value'),
    type: 'linear',
    autorange: true,
    title: "Waterflow  (m^3/s)"
  },
  legend: {
    orientation: 'h',
          traceorder: 'reversed',
    x: -0.1,
    y: -0.3
  }
}
}

Plotly.newPlot('30flow', data, layout, {displayModeBar: false})
})};