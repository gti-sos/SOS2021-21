<script>
    import ApexCharts from "apexcharts";

    async function loadGraph() {
        const temperatureData = await fetch("/api/v2/temperature-stats");
        let MisDatos = await temperatureData.json();

        const Germanyapi = await fetch("https://disease.sh/v2/gov/Germany");
        let SusDatos = await Germanyapi.json();

        let country = [];
        let province = [];
        let data = [];
        let data2 = [];

        MisDatos.forEach((x) => {
            data.push(parseInt(x.temperature_min));
            country.push(x.country);

        });

        SusDatos.forEach((x) => {
            data2.push(parseInt(x.cases));
            province.push(x.province);
        });


         var options = {
          series: [
          {
            type: 'boxPlot',
            data: [
              {
                x: country,
                y: data,
              },
              {
                x: province,
                y: data2,
              },
            ]
          }
        ],
          chart: {
          type: 'boxPlot',
          height: 350
        },
        title: {
          text: 'API Externa 1: ',
          align: 'left'
        },
        plotOptions: {
          boxPlot: {
            colors: {
              upper: '#5C4742',
              lower: '#A5978B'
            }
          }
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
