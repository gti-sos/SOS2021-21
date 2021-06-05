<script>
    import bb from 'billboard.js/dist/billboard.pkgd'

    let graphData2018 = ["Quality life index"]
    let graphData2019 = ["Safety index"]

    async function loadData(){
        const API_URL = "https://sos2021-01-life-stats.herokuapp.com/api/v2/life-stats/"
        let res = await fetch(API_URL)
        let lifeStatsData = await res.json()
        if(res.ok){
            console.log("Se han cargado los datos correctamente")
            console.log(lifeStatsData)
        }else{
            console.log("No se han podido cargar los datos")
        }

        lifeStatsData.forEach((x)=>{
            if(x.date==2018){
                graphData2018.push(x.quality_life_index)
            }
            if(x.date==2019){
                graphData2019.push(x.quality_life_index)
            }
        })

        console.log(graphData2019)
        console.log(graphData2018)

        
        var chart = bb.generate({
            data: {
                columns: [graphData2019, graphData2018],
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
    <h2 style="text-align: center;">Gráfica de índice de calidad de vida</h2>
    <div id="bubbleChart"></div>
</main>