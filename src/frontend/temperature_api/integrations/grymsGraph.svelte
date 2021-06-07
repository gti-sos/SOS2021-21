<script>
    import ApexCharts from "apexcharts";

    async function loadGraph() {
        const temperatureData = await fetch("/api/v2/temperature-stats");
        let MisDatos = await temperatureData.json();

        const countiescovid = await fetch(
            "https://sos2021-22.herokuapp.com/api/v2/grmys"
        );
        let SusDatos = await countiescovid.json();

        let country = [];
        let data = [];
        let data2 = [];

        MisDatos.forEach((x) => {
            data.push(parseInt(x.temperature_min));
            
        });

        SusDatos.forEach((x) => {
            data2.push(parseInt(x.award));
        });

        var options = {
            series: [
                {
                    name: "Temperatura mínima",
                    data: data,
                },
                {
                    name: "Awards",
                    data: data2,
                },
               
            ],
            chart: {
                height: 350,
                type: "radar",
                dropShadow: {
                    enabled: true,
                    blur: 1,
                    left: 1,
                    top: 1,
                },
            },
            title: {
                text: "Integración temperature-stats & gryms",
            },
            stroke: {
                width: 2,
            },
            fill: {
                opacity: 0.1,
            },
            markers: {
                size: 0,
            },
            xaxis: {
                categories: ["2011", "2012", "2013", "2014", "2015", "2016"],
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
