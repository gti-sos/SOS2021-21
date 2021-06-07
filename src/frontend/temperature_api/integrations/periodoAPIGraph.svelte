<script>
    import ApexCharts from "apexcharts";

    async function loadGraph() {
        const temperatureData = await fetch("/api/v2/temperature-stats");
        let MisDatos = await temperatureData.json();

        const periodoAPI = await fetch("https://www.cheapshark.com/api/1.0/deals");
        let SusDatos = await periodoAPI.json();

        let country = [];
        let province = [];
        let data = [];
        let data2 = [];

        MisDatos.forEach((x) => {
            data.push(parseInt(x.temperature_min));
            
        });

        SusDatos.forEach((x) => {
            data2.push(parseInt(x.savings));
        });

        console.log(data2)
        var options = {
            series: [
                {
                    name: "Temperatura mínima",
                    data: data,
                        
                },
                {
                    name: "Valor api externa",
                    data: data2,
                },
            ],
            chart: {
                height: 350,
                type: "scatter",
                zoom: {
                    enabled: true,
                    type: "xy",
                },
            },
            xaxis: {
                tickAmount: 10,
                labels: {
                    formatter: function (val) {
                        return parseFloat(val).toFixed(1);
                    },
                },
            },
            yaxis: {
                tickAmount: 7,
            },
        };

        var chart = new ApexCharts(document.querySelector("#chart"), options);
        chart.render();
    }

    loadGraph();
</script>

<main>
    <div id="chart" />
</main>
