<script>

    import bb from 'billboard.js/dist/billboard.pkgd'

    let graphData= []

    async function loadData(){
        const API_URL = "https://sos2021-03.herokuapp.com/api/integration/international-tourisms"
        let res = await fetch(API_URL)
        let iTData = await res.json()
        if(res.ok){
            console.log("Se han cargado los datos correctamente")
            console.log(iTData)
        }else{
            console.log("No se han podido cargar los datos")
        }

        iTData.forEach((x) => {
            if(x.year == 2011){
                graphData.push([x.country, x.numberofarrivals])
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
    <h2 style="text-align:center;">Porcentaje de aterrizajes en los diferentes países del 2011</h2>
    <div id="gaugeChart"></div>
</main>