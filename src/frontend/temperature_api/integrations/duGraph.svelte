<script>
    import ApexCharts from "apexcharts";

    async function loadGraph() {
        const temperatureData = await fetch("/api/v2/temperature-stats");
        let MisDatos = await temperatureData.json();

        const du = await fetch(
            "https://sos2021-23.herokuapp.com/api/v1/du-stats"
        );
        let SusDatos = await du.json();
        console.log(SusDatos);

        let country = [];
        let data = [];

        MisDatos.forEach((x) => {
            data.push(parseInt(x.temperature_max));
            country.push(x.country + "-" + x.year);
        });

        SusDatos.forEach((x) => {
            data.push(parseInt(x.dupopulation));
        });

        var options = {
            series: data,
            chart: {
                type: "polarArea",
            },
            stroke: {
                colors: ["#fff"],
            },
            fill: {
                opacity: 0.8,
            },
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200,
                        },
                        legend: {
                            position: "bottom",
                        },
                    },
                },
            ],
        };

        var chart = new ApexCharts(document.querySelector("#chart"), options);
        chart.render();
    }

    loadGraph();
</script>

<main>
    <div id="chart" />
</main>
