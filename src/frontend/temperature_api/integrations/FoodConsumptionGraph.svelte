<script>
    import { pop } from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";
    import ApexCharts from "apexcharts";
    async function loadGraph() {
        const temperatureData = await fetch("/api/v2/temperature-stats");
        let MisDatos = await temperatureData.json();
        const foodconsumption = await fetch(
            "https://sos2021-10.herokuapp.com/api/integration/foodconsumption-stats"
        );
        let SusDatos = await foodconsumption.json();

        let country = [];
        let data = [];
        let data2 = [];

        MisDatos.forEach((x) => {
            data.push(parseInt(x.temperature_min));
            country.push(x.country + "-" + x.year);
           
        });

        SusDatos.forEach((x) => {
            data2.push(parseInt(x.caloryperperson));
        });

        var options = {
            series: [
                {
                    data: data,
                },
                {
                    data: data2,
                },
            ],
            chart: {
                type: "bar",
                height: 350,
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: "55%",
                    endingShape: "rounded",
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                width: 2,
                colors: ["transparent"],
            },
            xaxis: {
                categories: country,
            },
            fill: {
                opacity: 1,
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return val;
                    },
                },
            },
        };

        var chart = new ApexCharts(document.querySelector("#chart"), options);
        chart.render();
    }

    loadGraph();
</script>

<svelte:head>
    <script
        src="https://cdn.jsdelivr.net/npm/apexcharts"
        on:load={loadGraph}></script>
</svelte:head>
<main>
    <div id="chart" />
    <p>Food Consumption (Realizada con apexcharts)</p>
</main>
