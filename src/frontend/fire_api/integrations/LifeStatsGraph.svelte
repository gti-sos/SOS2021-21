<script>
async function loadData(){
    const API_URL = "https://sos2021-21.herokuapp.com/api/v2/temperature-stats"
    let res = await fetch(API_URL)
    let lifeStatsData = await res.json()
    if(res.ok){
        console.log("Se han cargado los datos correctamente")
        console.log(lifeStatsData)
    }else{
        console.log("No se han podido cargar los datos")
    }
}

loadData();

</script>

<svelte:head>

</svelte:head>

<main>
    
</main>