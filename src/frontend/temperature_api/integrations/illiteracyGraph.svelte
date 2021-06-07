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

        
    
    }

    loadGraph();
</script>

<main>
    <div id="chart" />
</main>
