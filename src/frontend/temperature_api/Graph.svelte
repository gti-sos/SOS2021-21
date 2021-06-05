<script>
    import {
        onMount
    } from "svelte";
 
    let temperatureData = [];
    let ejeX = [];
    let ejeY = [];
    let temperature_min = [];
    let temperature_max = [];
    let temperature_co2 = [];
    
    async function loadGraph(){  
        const res = await fetch("/api/v2/temperature-stats");
        if(res.ok){
            temperatureData = await res.json();
            console.log(JSON.stringify(temperatureData, null, 2))
            temperatureData.forEach(data => {
                ejeX.push(data.country + "-" + data.year);
                ejeY.push([data["temperature_min"],data["temperature_max"]]);
            });
        }else{
            console.log("Error loading temperature");
        }

        Highcharts.chart('container', {

            chart: {
                type: 'columnrange',
                inverted: true
            },

    
            xAxis: {
                categories: ejeX
            },

            yAxis: {
                title: {
                    text: 'Temperature ( °C )'
                }
            },

            tooltip: {
                valueSuffix: '°C'
            },

            plotOptions: {
                columnrange: {
                    dataLabels: {
                        enabled: true,
                        format: '{y}°C'
                    }
                }
            },

            legend: {
                enabled: false
            },

            series: [{
                name: 'Temperatura mínima y máxima',
                data: ejeY
                
            }]
        })
    };


</script>

<svelte:head>
    <script
        src="https://code.highcharts.com/highcharts.js"
        on:load={loadGraph}></script>
        <script src="https://code.highcharts.com/highcharts.js"></script>
        <script src="https://code.highcharts.com/highcharts-more.js"></script>
        <script src="https://code.highcharts.com/modules/exporting.js"></script>
        <script src="https://code.highcharts.com/modules/export-data.js"></script>
        <script src="https://code.highcharts.com/modules/accessibility.js"></script>
</svelte:head>

<main>
    <figure class="highcharts-figure">
        <div id="container" />
    </figure>
</main>
