<script>
    import bb from 'billboard.js/dist/billboard.pkgd'

    let graphData2018 = ["Indice de calidad de vida"]
    let graphData2019 = ["Emisiones emitidas"]
    let countries = ["x"]

    async function loadData(){
        
        const API_URL = "https://sos2021-01-life-stats.herokuapp.com/api/v2/life-stats/"
        let res = await fetch(API_URL)
        let lifeStatsData = await res.json()

        const API_URL_2 = "/api/v2/fire-stats"
        let res2 = await fetch(API_URL_2)
        let fireData = await res2.json()


        if(res.ok && res2.ok){
            console.log("Se han cargado los datos correctamente")
            console.log(lifeStatsData)
            console.log(fireData)
        }else{
            console.log("No se han podido cargar los datos")
        }

        lifeStatsData.forEach((x)=>{
            if(x.date==2018){
                graphData2018.push(x.quality_life_index)
            }
        });

        fireData.forEach((x)=>{
            if(x.year >= 2019){
                graphData2019.push(x.fire_aee)
                countries.push(x.country)
            }
        });

        console.log(graphData2019)
        console.log(graphData2018)

        
        var chart = bb.generate({
            data: {
                "x": "x",
                columns: [countries, graphData2019, graphData2018.slice(0, countries.length)],
                type: "bubble", // for ESM specify as: bubble()
                labels: false
            },
            bubble: {
                maxR: 20
            },
            axis: {
                x: {
                    type: "category"
                },
                y: {
                    max: 200
                }
            },
            bindto: "#bubbleChart"
        });
    }

loadData();

</script>

<svelte:head>
    <link rel="stylesheet" href="https://naver.github.io/billboard.js/release/latest/dist/theme/insight.min.css">
</svelte:head>

<main>
    <h2 style="text-align: center;">Gráfica de índice de calidad de vida en 2018 y 
        número de emisiones emitidas a partir del 2019</h2>
    <div id="bubbleChart"></div>
</main>