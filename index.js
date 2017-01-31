// buttons
$('#startButton').on('click', function () {
    pointIndex = 0;
    $('#ex1').slider('setValue', pointIndex);
    $("#ex1SliderVal").text(pointIndex);
    highlightNetworkLoad();
    highlightPointOnCharts();
});
$('#endButton').on('click', function () {
    pointIndex = 9;
    $('#ex1').slider('setValue', pointIndex);
    $("#ex1SliderVal").text(pointIndex);
    highlightNetworkLoad();
    highlightPointOnCharts();
});
var isPlaying = false;
$('#playPauseButton').on('click', function () {
    if (isPlaying) {
        isPlaying = false;
        $('#playPauseIcon').removeClass('glyphicon-pause').addClass('glyphicon-play');
    } else {
        isPlaying = true;
        $('#playPauseIcon').removeClass('glyphicon-play').addClass('glyphicon-pause');
        playbackTicker();
    }
});
function playbackTicker() {
    if (isPlaying && pointIndex < 9) {
        pointIndex++;
        $('#ex1').slider('setValue', pointIndex);
        $("#ex1SliderVal").text(pointIndex);
        highlightNetworkLoad();
        highlightPointOnCharts();
        window.setTimeout(playbackTicker, 500);
    } else if (isPlaying && pointIndex >= 9) {
        isPlaying = false;
        $('#playPauseIcon').removeClass('glyphicon-pause').addClass('glyphicon-play');
    }
}

// slider
$('#ex1').slider({
    formatter: function(value) {
        return 'Current time: ' + value;
    }
});
var previousIndex = 0;
var pointIndex = 0;
$(document).ready(function() {
    highlightNetworkLoad();
    highlightPointOnCharts();
});
$("#ex1").on("slide", function(slideEvt) {
    $("#ex1SliderVal").text(slideEvt.value);
    pointIndex = slideEvt.value;
    highlightNetworkLoad();
    highlightPointOnCharts();
});
$("#ex1").on("slideStop", function(slideEvt) {
    $("#ex1SliderVal").text(slideEvt.value);
    pointIndex = slideEvt.value;
    highlightNetworkLoad();
    highlightPointOnCharts();
});

function highlightPointOnCharts(){
    var cpuMeta = cpuChart.getDatasetMeta(0);
    var networkMeta = networkChart.getDatasetMeta(0);

    // Reset previous point
    var cpuOldPoint = cpuMeta.data[previousIndex];
    cpuOldPoint.custom = cpuOldPoint.custom || {};
    cpuOldPoint.custom.backgroundColor = "#fff";
    cpuOldPoint.custom.radius = 1;
    var networkOldPoint = networkMeta.data[previousIndex];
    networkOldPoint.custom = networkOldPoint.custom || {};
    networkOldPoint.custom.backgroundColor = "#fff";
    networkOldPoint.custom.radius = 1;

    //Get point object and change the radius/color
    var cpuPoint = cpuMeta.data[pointIndex];
    cpuPoint.custom = cpuPoint.custom || {};
    cpuPoint.custom.backgroundColor = "#000";
    cpuPoint.custom.radius = 7;
    var networkPoint = networkMeta.data[pointIndex];
    networkPoint.custom = networkPoint.custom || {};
    networkPoint.custom.backgroundColor = "#000";
    networkPoint.custom.radius = 7;

    // first parameter to update is the animation duration.
    // if none is specified, the config animation duration
    // is used. Using 0 here will do the draw immediately.
    cpuChart.update(0);
    networkChart.update(0);

    previousIndex = pointIndex;
}
function highlightNetworkLoad() {
    var cpuData = [10, 65, 59, 80, 20, 81, 56, 55, 30, 40];
    var networkData = [50, 50, 50, 50, 40, 30, 70, 90, 100, 100];
    if (cpuData[pointIndex] > 50) {
        cy.nodes().style({ 'background-color':'red' });
    } else {
        cy.nodes().style({ 'background-color':'green' });
    }
    if (networkData[pointIndex] > 50) {
        cy.edges().style({ 'line-color':'red' });
    } else {
        cy.edges().style({ 'line-color':'green' });
    }
}

require('./network');
var cy = cytoscape({
    container: $('#cy'),
    elements: dataset,
    layout: { name: "random" }
});
cy.on('mouseover', 'node', function(event) {
    var node = event.cyTarget;
    node.qtip({
         content: 'id: ' + this.id(),
         show: {
            event: event.type,
            ready: true
         },
         hide: {
            event: 'mouseout unfocus'
         }
    }, event);
});

var cpuCanvas = document.getElementById("cpu-chart");
cpuCanvas.width = parseInt($('#well1').css('width'), 10);
cpuCanvas.height = parseInt($('#well1').css('height'), 10);
var cpuChart = new Chart(cpuCanvas, {
    type: 'line',
    data: {
        labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        datasets: [{
            label: "CPU Usage",
            fill: true,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [10, 65, 59, 80, 20, 81, 56, 55, 30, 40],
            spanGaps: false,
        }]
    }
});

var networkCanvas = document.getElementById("network-chart");
networkCanvas.width = parseInt($('#well2').css('width'), 10);
networkCanvas.height = parseInt($('#well2').css('height'), 10);
var networkChart = new Chart(networkCanvas, {
    type: 'line',
    data: {
        labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        datasets: [{
            label: "Network Usage",
            fill: true,
            lineTension: 0.1,
            backgroundColor: "rgba(214,83,92,0.4)",
            borderColor: "rgba(214,83,92,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [50, 50, 50, 50, 40, 30, 70, 90, 100, 100],
            spanGaps: false,
        }]
    }
});
