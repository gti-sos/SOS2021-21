<script>

    import bb from 'billboard.js/dist/billboard.pkgd'

    let graphData= []

    async function loadData(){

        const API_URL = "https://sos2021-03.herokuapp.com/api/integration/international-tourisms"
        let res = await fetch(API_URL)
        let iTData = await res.json()

        const API_URL_2 = "/api/v2/fire-stats"
        let res2 = await fetch(API_URL_2)
        let fireData = await res2.json()


        if(res.ok && res2.ok){
            console.log("Se han cargado los datos correctamente")
            console.log(iTData)
            console.log(fireData)
        }else{
            console.log("No se han podido cargar los datos")
        }

        iTData.forEach((x) => {
            if(x.year >= 2015 && x.country != "Portugal"){
                graphData.push([x.country+" - aterrizajes", x.numberofarrivals/10])
            }
        });

        fireData.forEach((x) => {
            if(x.year >= 2011){
                graphData.push([x.country+ " - especies vegetales", x.fire_nvs*10])
            }
        });

        console.log(graphData);

        var chart = bb.generate({
            data: {
                columns: graphData,
                type: "gauge", // for ESM specify as: gauge()
            },
            gauge: {},
            size: {
                height: 400
            },
            bindto: "#gaugeChart"
        });

    }

    loadData();

</script>

<svelte:head>
  <link rel="stylesheet" href="https://naver.github.io/billboard.js/release/latest/dist/theme/insight.min.css">
</svelte:head>

<main>
    <h2 style="text-align:center;">Porcentaje de aterrizajes en los diferentes países a 
        partir del 2015 en relación al número de especies vegetales afectadas en los incendios</h2>
    <div id="gaugeChart"></div>
</main>