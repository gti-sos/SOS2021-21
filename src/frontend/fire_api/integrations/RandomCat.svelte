
<script>
    import Button from "sveltestrap/src/Button.svelte";

    async function loadData() {
        const URL = "http://aws.random.cat/meow"
        const res = await fetch(URL)
        if(res.ok){
            console.log("Se ha realizado una llamada correctamente");
            let data = await res.json()
            let url = data.file
            console.log(url)
            document.getElementById("catPic").src=url;

        }
    }

</script>

<main>
    <h1>Generar gato</h1>
    <hr>
    <div>
        <img id="catPic" src="" alt="" width="250" height="250">
    </div>
    <hr>
    <Button color="primary" on:click={loadData}>Generar gato</Button>

</main>