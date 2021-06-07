
<script>
    import { Form, FormGroup, FormText, Input, Label } from 'sveltestrap';
    import Button from "sveltestrap/src/Button.svelte";

    let url_pic = ''
    async function loadData() {
        const URL = "http://aws.random.cat/meow"
        const res = await fetch(URL)
        if(res.ok){
            console.log("Se ha realizado una llamada correctamente");
            let data = await res.json()
            let url = data.file
            url_pic = url
            console.log(url)
            document.getElementById("catPic").src=url;

        }
    }

</script>

<main>
    <h1>Generar gato aleatorio</h1>
    <hr>
    <Form>
        <FormGroup>
            <Label for="tx">URL:</Label>
            <Input type="text" bind:value={url_pic} />
        </FormGroup>
        <FormGroup>
            <div>
                <img id="catPic" src="" alt="" width="250" height="250">
            </div>
        </FormGroup>
    </Form>
    <hr>
    <Button color="primary" on:click={loadData}>Generar gato</Button>

</main>