<script>
    import ApexCharts from "apexcharts";

    async function loadGraph() {
        const temperatureData = await fetch("/api/v2/temperature-stats");
        let MisDatos = await temperatureData.json();

        const jailapi = await fetch("http://smashlounge.com/api/groups/all");
        let SusDatos = await jailapi.json();

        let country = [];
        let data = [];
        let data2 = [];

        MisDatos.forEach((x) => {
            data.push(parseInt(x.temperature_min));
        });

        SusDatos.forEach((x) => {
            data2.push(parseInt(x.id));
        });

        var options = {
            series: [
                {
                    name: "Bubble1",
                    data: data,
                    
                },
                {
                    name: "Bubble2",
                    data: data2, 
                },
               
            ],
            chart: {
                height: 350,
                type: "bubble",
            },
            dataLabels: {
                enabled: false,
            },
            fill: {
                opacity: 0.8,
            },
            title: {
                text: "Simple Bubble Chart",
            },
            xaxis: {
                tickAmount: 12,
                type: "category",
            },
            yaxis: {
                max: 70,
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
