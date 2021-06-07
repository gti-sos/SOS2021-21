<script>
    import ApexCharts from "apexcharts";

    async function loadGraph() {
        const temperatureData = await fetch("/api/v2/temperature-stats");
        let MisDatos = await temperatureData.json();

        const illiteracy = await fetch("proxy/api/v1/illiteracy");
        console.log(illiteracy.status)
        let SusDatos = await illiteracy.json();
        console.log(SusDatos);

        let country = [];
        let data = [];
        let data2 = [];

        MisDatos.forEach((x) => {
            data.push(parseInt(x.temperature_min));
            country.push(x.country + "-" + x.year);
        });

        SusDatos.forEach((x) => {
            data2.push(parseInt(x.female_illiteracy_rate));
        });

        var options = {
          series: [{
          name: 'Series 1',
          data: [80, 50, 30, 40, 100, 20],
        }, {
          name: 'Series 2',
          data: [20, 30, 40, 80, 20, 80],
        }, {
          name: 'Series 3',
          data: [44, 76, 78, 13, 43, 10],
        }],
          chart: {
          height: 350,
          type: 'radar',
          dropShadow: {
            enabled: true,
            blur: 1,
            left: 1,
            top: 1
          }
        },
        title: {
          text: 'Radar Chart - Multi Series'
        },
        stroke: {
          width: 2
        },
        fill: {
          opacity: 0.1
        },
        markers: {
          size: 0
        },
        xaxis: {
          categories: ['2011', '2012', '2013', '2014', '2015', '2016']
        }
        };

        var chart = new ApexCharts(document.querySelector("#chart"), options);
        chart.render();
    
    }

    loadGraph();
</script>

<main>
    <div id="chart" />
</main>
