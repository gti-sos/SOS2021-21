<script>
    import {
        onMount
    } from "svelte";
 
    let fireData = [];
    let countries = []
    let graphData1 = [];
    let graphData2 = [];
    let graphData3 = []

    async function loadGraph(){  
        const res = await fetch("/api/v2/fire-stats");
        if(res.ok){
            fireData = await res.json();
            console.log(JSON.stringify(fireData, null, 2))
            fireData.forEach(data => {
                let country_year = data.country + "-" + data.year;
                let nfc = data["fire_nfc"];
                let aee = data["fire_aee"];
                let nvs = data["fire_nvs"]
                graphData1.push([country_year, nfc])
                graphData2.push([country_year, aee])
                graphData3.push([country_year, nvs])

            });
        } else {
            console.log("Error loading fires");
        }
        console.log("Generando grafo con los siguientes datos:")
        Highcharts.chart('container', {
            chart: {
                type: 'area',
                options3d: {
                    enabled: true,
                    alpha: 15,
                    beta: 30,
                    depth: 200
                }
            },
            title: {
                text: "Estadísticas de incendios, emisiones y especies vegtales"
            },
            yAxis: {
                title: {
                    text: 'Número de unidades',
                    x: -80
                },
                labels: {
                    format: '{value:,.0f} unidades'
                },
                gridLineDashStyle: 'Dash'
            },
            xAxis: [{
                labels: {
                    enabled: true,
                    formatter: function() { return countries[this.value][0]},
                 },
                visible: false
            }, {
                visible: false
            }, {
                visible: false
            }],
            
            plotOptions: {
                area: {
                    depth: 100,
                    marker: {
                        enabled: false
                    },
                    states: {
                        inactive: {
                            enabled: false
                        }
                    }
                }
            },
            tooltip: {
                valueSuffix: ' unidades'
            },
            series: [{
                name: "Incendios",
                lineColor: 'rgb(180,90,50)',
                color: 'rgb(200,110,50)',
                fillColor: 'rgb(200,110,50)',
                data: graphData1
            }, {
                name: "Emisiones emitidas",
                lineColor: 'rgb(230,90,50)',
                color: 'rgb(230,90,50)',
                fillColor: 'rgb(230,90,50)',
                data: graphData2
            }, {
                name: "Especies vegetales",
                lineColor: 'rgb(87,213,29)',
                color: 'rgb(80,200,20)',
                fillColor: 'rgb(80,200,20)',
                data: graphData3
            }]
        });
    }
</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js" on:load="{loadGraph}"></script>
    <script src="https://code.highcharts.com/highcharts-3d.js"></script>
</svelte:head>

<main>
    <figure class="highcharts-figure">
        <div id="container"></div>
    </figure>  
</main>