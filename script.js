// Load Google Charts
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawStepsChart);
google.charts.setOnLoadCallback(drawCO2Chart);

// 1. Draw Development Steps Chart (Google Charts Pie Chart)
function drawStepsChart() {
    var data = google.visualization.arrayToDataTable([
        ['Step', 'Effort'],
        ['Dataset Collection', 25],
        ['Model Training', 30],
        ['Integration', 20],
        ['Testing', 15],
        ['Deployment', 10]
    ]);

    var options = {
        title: 'Cognitive Application Development Steps',
        pieHole: 0.4,
        colors: ['#ff9999', '#66b3ff', '#99ff99', '#ffcc99', '#c2c2f0'],
        chartArea: {width: '80%', height: '80%'},
        pieSliceText: 'value',
        animation: {
            startup: true,
            duration: 1000,
            easing: 'out',
        },
        tooltip: {
            textStyle: {fontSize: 14},
        }
    };

    var chart = new google.visualization.PieChart(document.getElementById('steps_chart'));
    chart.draw(data, options);
}

// 2. Draw CO2 Emissions vs Renewable Energy Usage (Google Charts Bar and Line Chart)
function drawCO2Chart() {
    var data = google.visualization.arrayToDataTable([
        ['Country', 'CO2 Emissions (tons)', 'Renewable Energy (%)'],
        ['USA', 5000, 20],
        ['China', 7000, 15],
        ['Germany', 3000, 50],
        ['India', 4000, 30],
        ['Brazil', 2000, 70]
    ]);

    var options = {
        title: 'CO2 Emissions vs Renewable Energy Usage',
        hAxis: {title: 'Country'},
        vAxes: {
            0: {title: 'CO2 Emissions (tons)'},
            1: {title: 'Renewable Energy (%)'}
        },
        seriesType: 'bars',
        series: {
            1: {type: 'line'}
        },
        colors: ['#ff6666', '#33cc33'],
        chartArea: {width: '80%', height: '80%'},
        animation: {
            startup: true,
            duration: 1500,
            easing: 'inAndOut',
        },
        tooltip: {
            isHtml: true
        }
    };

    var chart = new google.visualization.ComboChart(document.getElementById('co2_chart'));
    chart.draw(data, options);
}

// 3. D3.js Interactive Bar Chart with Custom Colors
const dataset = [
    {country: 'USA', pollutionIndex: 80, renewableEnergy: 20},
    {country: 'China', pollutionIndex: 95, renewableEnergy: 15},
    {country: 'Germany', pollutionIndex: 50, renewableEnergy: 60},
    {country: 'India', pollutionIndex: 85, renewableEnergy: 25},
    {country: 'Brazil', pollutionIndex: 45, renewableEnergy: 70}
];

const margin = {top: 20, right: 30, bottom: 50, left: 90};
const width = 1000 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

// Create SVG canvas
const svg = d3.select("#d3_barchart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// X and Y scales
const x = d3.scaleLinear()
    .domain([0, 100])
    .range([0, width]);

const y = d3.scaleBand()
    .domain(dataset.map(d => d.country))
    .range([0, height])
    .padding(0.1);

// Add X and Y axes
svg.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x));

svg.append("g")
    .call(d3.axisLeft(y));

// Tooltip for interaction
const tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

// Bars for Pollution Index with a new color
svg.selectAll(".bar-pollution")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("class", "bar-pollution")
    .attr("x", 0)
    .attr("y", d => y(d.country))
    .attr("width", d => x(d.pollutionIndex))
    .attr("height", y.bandwidth() / 2)
    .attr("fill", "#007acc")  // Changed to blue for pollution
    .on("mouseover", (event, d) => {
        tooltip.transition().duration(200).style("opacity", 0.9);
        tooltip.html(`Pollution Index: ${d.pollutionIndex}`)
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY - 20) + "px");
    })
    .on("mouseout", () => tooltip.transition().duration(500).style("opacity", 0));

// Bars for Renewable Energy Usage
svg.selectAll(".bar-renewable")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("class", "bar-renewable")
    .attr("x", 0)
    .attr("y", d => y(d.country) + y.bandwidth() / 2)
    .attr("width", d => x(d.renewableEnergy))
    .attr("height", y.bandwidth() / 2)
    .attr("fill", "#ffcc00")  // Changed to yellow for renewable energy
    .on("mouseover", (event, d) => {
        tooltip.transition().duration(200).style("opacity", 0.9);
        tooltip.html(`Renewable Energy: ${d.renewableEnergy}%`)
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY - 20) + "px");
    })
    .on("mouseout", () => tooltip.transition().duration(500).style("opacity", 0));
