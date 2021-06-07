<script>
    import { pop } from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";
    import ApexCharts from "apexcharts";

    async function loadGraph() {
        const temperatureData = await fetch("/api/v2/temperature-stats");
        let MisDatos = await temperatureData.json();
        
        const countiescovid = await fetch(
            "https://sos2021-08.herokuapp.com/api/v1/us_counties_covid19_daily");
        let SusDatos = await countiescovid.json();

        let country = [];
        let data = [];
        let data2 = [];

        MisDatos.forEach((x) => {
            data.push(parseInt(x.temperature_min));
            country.push(x.country + "-" + x.year);
        });

        SusDatos.forEach((x) => {
            data2.push(parseInt(x.cases));
        });

        var options = {
            series: [
                {
                    data: data
                },
                {
                    data: data2
                },
            ],
            chart: {
                type: "bar",
                height: 440,
                stacked: true,
            },
            colors: ["#008FFB", "#FF4560"],
            plotOptions: {
                bar: {
                    horizontal: true,
                    barHeight: "80%",
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                width: 1,
                colors: ["#fff"],
            },

            grid: {
                xaxis: {
                    lines: {
                        show: false,
                    },
                },
            },

            tooltip: {
                shared: false,
                x: {
                    formatter: function (val) {
                        return val;
                    },
                },
                y: {
                    formatter: function (val) {
                        return Math.abs(val) + "%";
                    },
                },
            },
            xaxis: {
                categories: country
            },
        };

        var chart = new ApexCharts(document.querySelector("#chart"), options);
        chart.render();
    }

    loadGraph();
</script>

<main>
    <div id="chart" />
    <p>Series 1: temperatura mínima en diferentes países (2010-2011) // Series 2: casos covid 19 </p>
</main>
