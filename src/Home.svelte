<script>
	import { push } from "svelte-spa-router";
	import Button from "sveltestrap/src/Button.svelte";
</script>

<main>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<title>SOS2021-21</title>
	</head>
		<div class="container">
			<div class="text-center">
				<h1>SOS 2021-21</h1>
				<p class="lead">
					Bienvenido/a la aplicación oficial de la asignatura SOS de la Universidad de Sevilla en<br>  
					el grado de Ingeniería Informática. Tecnologías Informáticas. En esta<br>
					En esta asignatura hemos desarrollado ciertas API con ciertas<br> 
					funcionalidades que pueden ser usadas a través de la web app.
				</p>
				<Button color= "primary" on:click={()=>push("#/info")}>Información</Button>
				<Button color= "primary" on:click={()=>push("#/about")}>Videos</Button>

			</div>
		</div>	
	<style>
		.text-center {
			text-align: center;
			margin-top: 10em;
			margin-bottom: 23.1em;
		}
	</style>
</main>
	