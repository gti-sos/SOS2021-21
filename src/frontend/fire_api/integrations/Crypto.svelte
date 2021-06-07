
<script>
    import Button from "sveltestrap/src/Button.svelte";
    import Table from "sveltestrap/src/Table.svelte";
    let dataTable = [];

    async function loadData() {
        const URL = "https://blockchain.info/ticker"
        const res = await fetch(URL)
        console.log("Se ha realizado una llamada correctamente");
        let data = await res.json()
        for (let [key, value] of Object.entries(data)) {
            dataTable.push([key]);
        }
    }

</script>

<main>
    <h1>Precio del Bitcoin en diferentes divisas</h1>
    <hr>
    {#await dataTable}
        Cargando los datos
    {:then dataTable}
    <Table responsive>
        <thead>
            <tr>
                <th>Cambio</th>
                <th>15m</th>
                <th>Ultimo precio</th>
                <th>Precio de compra</th>
                <th>Precio de venta</th>
                <th>Simbolo</th>
            </tr>
        </thead>
        <tbody>
            {#each dataTable as c}
                <tr>
                    <td>{c[0]}</td>
                    <td>{c[0]}</td>
                    <td>{c[0]}</td>
                    <td>{c[0]}</td>
                    <td>{c[0]}</td>

                </tr>
            {/each}
        </tbody>
    </Table>
    
    <hr>
    <Button color="primary" on:click={loadData}>Obtener precios</Button>
{/await}
</main>