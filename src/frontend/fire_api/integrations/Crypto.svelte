
<script>
    import { Form, FormGroup, FormText, Input, Label } from 'sveltestrap';
    import Button from "sveltestrap/src/Button.svelte";
    let tx = ''
    let bloque = ''
    let indice = ''
    let talla = ''
    async function loadData(tx) {
        console.log("Fetching API...")
        const URL = "https://blockchain.info/rawtx/"+tx
        const res = await fetch(URL)
        console.log("Se ha realizado una llamada correctamente");
        let data = await res.json()
        bloque = data.block_height
        indice = data.tx_index
        talla = data.size

    }

</script>

<main>
    <h1>Información sobre una transaccion de Bitcoin</h1>
    <hr>
    <Form>
        <FormGroup>
          <Label for="exampleTx">Ejemplo: b6f6991d03df0e2e04dafffcd6bc418aac66049e2cd74b80f14ac86db1e3f0da</Label>
        </FormGroup>
        <FormGroup>
            <Label for="tx">Introduce una transaccion:</Label>
            <Input type="text" bind:value={tx} />
        </FormGroup>
        <FormGroup>
            <Label for="tx">Tamaño del bloque:</Label>
            <Input type="text" bind:value={bloque} readonly={true}/>
        </FormGroup>
        <FormGroup>
            <Label for="tx">Indice de transaccion</Label>
            <Input type="text" bind:value={indice} readonly={true}/>
        </FormGroup>
        <FormGroup>
            <Label for="tx">Talla (bytes)</Label>
            <Input type="text" bind:value={talla} readonly={true}/>
        </FormGroup>
        <Button color="primary" on:click="{loadData(tx)}">Buscar</Button>


    </Form>

</main>