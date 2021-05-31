<script>
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
}

loadData();

</script>

<svelte:head>

</svelte:head>

<main>
    
</main>