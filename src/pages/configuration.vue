<template>
	<q-page padding class="row justify-center">
		<div style="width: 800px; max-width: 90vw;">
			<p class="q-display-1 orange">Configuration</p>

			<p class="caption q-title">Choix de l'emplacement ou se trouve le dossier PSP</p>
			
			<template v-if="folder">
				<q-input 
					v-model="folder" 
					stack-label="Dossier: "
					readonly
				/>
				<br>
			</template>

			<q-btn
			  color="primary"
			  icon="folder open"
			  @click="openfolder"
			  label="Choisir le dossier"
			/>

			<br>
			<br>		

			<q-btn label="Mettre a jour" color="secondary" />
			
		</div>
	</q-page>
</template>

<script>
export default {
	data () {
		return {
			folder: null,
		}
	},
	methods: {
    	openfolder () {
			const { remote } = require('electron')
			const pathArray = remote.dialog.showOpenDialog({properties: ['openDirectory']});

			this.folder = pathArray;
    	}
  	}
}
</script>

<style>
</style>
