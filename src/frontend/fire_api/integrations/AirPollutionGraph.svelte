<script>
    import bb from 'billboard.js/dist/billboard.pkgd'

    let graphData = []

    async function loadData(){
        const API_URL = "https://sos2021-03.herokuapp.com/api/integrations/air-pollution/"
        let res = await fetch(API_URL)
        let airPollutionData = await res.json()

        const API_URL_2 = "/api/v2/fire-stats"
        let res2 = await fetch(API_URL_2)
        let fireData = await res2.json()

        if(res.ok && res2.ok){
            console.log("Se han cargado los datos correctamente")
            console.log(airPollutionData)
            console.log(fireData)
        }else{
            console.log("No se han podido cargar los datos")
        }

        airPollutionData.forEach(x => {
            if(x.year >= 2017){
                graphData.push([x.country+" - muertes", parseInt(x.deaths_air_pollution)])
            }
        });

        fireData.forEach((x) => {
            if(x.year >= 2017){
                graphData.push([x.country+ " - emisiones", parseInt(x.fire_aee)])
            }
        })

        console.log(graphData)

        var chart = bb.generate({
        data: {
            columns: graphData,
            type: "pie", // for ESM specify as: pie()
        },
        bindto: "#pieChart"
    });

    }

    loadData();

   
</script>

<svelte:head>
  <link rel="stylesheet" href="https://naver.github.io/billboard.js/release/latest/dist/theme/insight.min.css">
</svelte:head>


<main>
    <h2 style="text-align:center;">Gráfico de muertes por contaminación en relación al número de incendios</h2>
    <div id="pieChart"></div>
</main>