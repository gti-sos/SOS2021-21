<script>
    import bb from 'billboard.js/dist/billboard.pkgd'

    let graphData = []

    async function loadData(){
        const API_URL = "https://sos2021-03.herokuapp.com/api/integrations/air-pollution/"
        let res = await fetch(API_URL)
        let airPollutionData = await res.json()
        if(res.ok){
            console.log("Se han cargado los datos correctamente")
            console.log(airPollutionData)
        }else{
            console.log("No se han podido cargar los datos")
        }

        airPollutionData.forEach(x => {
            if(x.year == 1990){
                graphData.push([x.country, parseInt(x.deaths_air_pollution)])
            }
        });

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
</svelte:head>

<main>
    <h2 style="text-align:center;">Gráfico de muertes por contaminación en el año 1990</h2>
    <div id="pieChart"></div>
</main>