<template>
	
	<q-page padding class="row justify-center">
		<div style="width: 800px; max-width: 90vw;">

			<p class="q-display-1 orange">Génération d'un pack prêt à l'emploi pour PSP</p>

			<p class="caption q-title">Mon modele de PSP</p>

			<q-select
			v-model="console_type"
			:options="selectOptions"
			inverted-light
			color="orange"
			separator
			/>

			<br>
			<br>

			<p class="caption q-title">Mise a jour officiel et custom</p>

			<q-checkbox v-model="firm" val="firm_off" color="yellow" label="Mise a jour vers le firmware officiel 6.61" /> 
			<q-btn flat dense round size="sm" icon="info outline" color="yellow" @click="OpenInfo('firm', 'firm_off')" />
			<br>
			<q-checkbox v-model="firm" val="firm_hack" color="yellow" label="Mise a jour vers le firmware non officiel ( 6.61 LME 2.3, 6.61 ME 2.3, lightcfw 6.61 LME 2.3 )" />
			<q-btn flat dense round size="sm" icon="info outline" color="yellow" @click="OpenInfo('firm', 'firm_hack')" />

			<br>
			<br>

			<p class="caption q-title">Emulation</p>

			<p class="caption q-subheading">Sélection des émulateurs</p>

			<template v-if="liste_emulateur === true">
				<div v-for="emul in liste_emulateurs" :key="emul.id">
					
					<q-checkbox v-model="emulateur" :val="emul.id" color="orange" :label="emul.nom_console" @input="uncheck_roms(emul.id)"/>
					<q-btn flat dense round size="sm" icon="info outline" color="orange" @click="OpenInfo('emulateur', emul)" /><br>

				</div>
			</template>

			<template v-if="liste_rom === true">
				<br>
				<br>

				<p class="caption q-subheading">Selectionner les packs de roms disponnible</p>

				<div v-for="roms in liste_roms">
					<div v-if="emulateur.includes(roms.id)">
						<q-checkbox v-model="rom" :val="roms.id" color="pink" :label="roms.nom" @input="taille_pack(roms.id)" />  <span class="sizefolder">{{calcule_tailles(roms.id)}}</span> <br>
					</div>
				</div>
	
				<br>
				<span class="sizefolder">Taille du pack de roms selectionnés : {{taille}} mo</span>

			</template>

			<template v-if="liste_homebrew === true">
				<br>
				<br>

				<p class="caption q-title">Homebrews</p>
				<p class="caption q-subheading">Sélection de Homebrews</p>

				<div v-for="homebrew in liste_homebrews" :key="homebrew.id">
					<q-checkbox v-model="homebrews" :val="homebrew.files" color="light-green" :label="homebrew.nom" />
						<q-btn flat dense round size="sm" icon="info outline" color="yellow" @click="OpenInfo('homebrews', homebrew)" />
					<br>
				</div>
			</template>

			<template v-if="liste_mes_homebrew === true">
				<p class="caption q-subheading">Sélection de mes Homebrews</p>
				
				<div v-for="homebrew in mes_homebrew" :key="homebrew.nom">
					<q-checkbox v-model="meshomebrews" :val="homebrew.nom" color="light-green" :label="homebrew.nom" /><br>
				</div>
			</template>
			<br>

			<p class="caption q-title">Jeux</p>
			<template v-if="liste_jeu === true">
				<p class="caption q-subheading">Sélection de Jeux</p>
				<div v-for="jeu in liste_jeux" :key="jeu.id">
					<q-checkbox v-model="jeux" :val="jeu.files" color="light-green" :label="jeu.nom" />
						<q-btn flat dense round size="sm" icon="info outline" color="yellow" @click="OpenInfo('homebrews', jeu)" />
					<br>
				</div>
			</template>
			
			<template v-if="liste_mes_jeu === true">
				<p class="caption q-subheading">Sélection de mes Jeux</p>
				
				<div v-for="jeu in mes_jeu" :key="jeu.nom">
					<q-checkbox v-model="mesjeux" :val="jeu.nom" color="light-green" :label="jeu.nom" /><br>
				</div>
			</template>

			<br>
			<p class="caption q-title">Themes</p>

			<q-checkbox v-model="themes" color="brown" label="Copier les themes personnalisés" /><br>

			<br>

			<p class="caption q-title">Plugins</p>

			<q-checkbox v-model="plugins" color="brown" label="Installer les plugins (CXMB, CwCheat, PopsLoader, Category Lite)" /><br>

			<br>

			<template v-if="liste_iso === true">
				<p class="caption q-title">ISO PSP</p>
				<p class="caption q-subheading">Sélection des isos</p>

				<div v-for="iso in isos" :key="iso.nom">
					<q-checkbox color="pink" :val="iso.nom" :label="iso.nom" v-model="liste_isos" @input="taille_pack_isos(iso.nom)" /> <span class="sizefolder">{{calcule_tailles_isos(iso.nom)}}</span> <br>
				</div>

				<br>
				<span class="sizefolder">Taille du pack d'isos selectionnés : </span> <span class="sizefolderb">{{taille_isos}} mo</span>
				<br>
				<br>
			</template>

			<!--<p class="caption q-title">Choix de l'emplacement ou seront généré les fichiers de la Carte SD</p>-->

			<!--<q-progress v-if="progress > 0" :percentage="progress" color="positive" stripe height="25px" animate />-->
			
			<template v-if="progress == 0">
				<!--
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
				-->

				<span class="sizefolder">Taille final de la carte SD (approximation sans compter les homebrews / jeux / emulateurs / themes (ajouter ~500 mos)):</span> <span class="sizefolderb">{{taille_total}} mo</span>

				<br>
				<br>	

				<q-btn v-if="progress == 0" label="Créer mon pack" color="secondary" @click="generate_sdcard" />

				<br>

			</template>
			
			<template>
			  <q-modal position="top" v-model="opened" :content-css="{padding: '20px'}">
			    <p v-html="modal_info"></p>
			    <br />
			    <br />
			    <q-btn
			      color="orange"
			      @click="opened = false"
			      label="Fermer"
			    />
			  </q-modal>
			</template>

			<template>
			  <q-modal position="bottom" v-model="progress_current" :content-css="{padding: '20px', backgroundColor: '#000'}">
			    <p v-html="progression"></p>
			    <br />
			    <br />
			    <q-btn
			      color="orange"
			      @click="progress_current = false"
			      label="Fermer"
			    />
			  </q-modal>
			</template>

		</div>
	</q-page>
</template>

<script>
import emulsion from 'src/plugins/emulsion.js'
import scrap from 'src/plugins/screenscraper.js'
import path from 'path'
import { remote } from 'electron'

const underscore = require('underscore')

export default {
	mixins: [emulsion, scrap],
	data () {
		return {
			architecture: {},
			taille: 0,
			tailles: [],
			taille_isos: 0,
			tailles_isos: [],
			progress: 0,
			modal_info: "",
			opened: false,
			progress_current: false,
			generationencours: false,
			isos: [],
			folder: null,
			firm: [],
			emulateur: [],
			rom : [],
			homebrews: [],
			meshomebrews: [],
			liste_isos: [],
			liste_iso: false,
			liste_isos_nb: 0,
			liste_jeux: [],
			liste_jeu: false,
			liste_jeu_nb: 0,
			liste_homebrews: [],
			liste_homebrew: false,
			liste_homebrew_nb: 0,
			liste_emulateurs: [],
			liste_emulateur: false,
			liste_emulateur_nb: 0,
			liste_roms: [],
			liste_rom: false,
			liste_rom_nb: 0,
			mes_homebrew: [], 
			liste_mes_homebrew: false,
			liste_mes_homebrew_nb: 0,
			mes_jeu: [], 
			liste_mes_jeu: false,
			liste_mes_jeu_nb: 0,
			jeux : [],
			mesjeux : [],
			json: null,
			themes : false,
			roms : false,
			plugins : false,
			progress_firm : 0,
			progress_emulateur : 0,
			progress_rom : 0,
			progress_homebrew : 0,
			progress_meshomebrew : 0,
			progress_jeu : 0,
			progress_mesjeu : 0,
			progress_theme : 0,
			progress_plugin : 0,
			progress_iso : 0,
			selectOptions: 
			[
			{
				label: 'PSP 1000',
				value: 'psp_1000'
			},
			{
				label: 'PSP 2000 <= 8G',
				value: 'psp_20008g'
			},
			{
				label: 'PSP 2000 > 8G',
				value: 'psp_2000'
			},
			{
				label: 'PSP 3000',
				value: 'psp_3000'
			},
			{
				label: 'PSP Street',
				value: 'psp_street'
			},
			{
				label: 'PSP GO',
				value: 'psp_go'
			}
			],	
			console_type: 'psp_1000'
		}
	},
	created () {
		const fs = require('fs-extra')
		var getSize = require('get-folder-size');
 
		const packageObj = fs.readJsonSync('psp/architecture.json')
		this.architecture = packageObj;


		const filePath = path.join(remote.app.getPath('userData'), '/some.file')

console.log(filePath);

		//this.scrap('test', 'tred');


		// Generation de la liste des emulateurs
		if (this.architecture.emulateur.length > 0){
			for (let val of this.architecture.emulateur) {
				this.liste_emulateurs.push(val);
				this.liste_emulateur = true;
			}
		}

		// Generation de la liste des packs de roms
		if (this.architecture.rom.length > 0){
			for (let val of this.architecture.rom) {

				getSize(val.folder, (err, size) => {

			 		this.tailles.push({ name: val.id, taille: (size / 1024 / 1024).toFixed(2)});

				});

				this.liste_roms.push(val);
				this.liste_rom = true;
			}
		}

		// Generation de la liste des homebrews
		if (this.architecture.homebrew.length > 0){
			for (let val of this.architecture.homebrew) {
				this.liste_homebrews.push(val);
				this.liste_homebrew = true;
			}
		}

		// Generation de la liste des jeux
		if (this.architecture.jeu.length > 0){
			for (let val of this.architecture.jeu) {
				this.liste_jeux.push(val);
			    this.liste_jeu = true;
			}
		}

		// Chargement des fichiers ISO qui sont dans le dossier ISO
		fs.readdir("psp/iso", (err, dir) => {
			for(let filePath of dir) {
				
				if(filePath == "notice.txt")
					continue;

				getSize("psp/iso/" + filePath, (err, size) => {

			 		this.tailles_isos.push({ name: filePath, taille: (size / 1024 / 1024).toFixed(2)});

				});

				this.isos.push({nom: filePath});
				this.liste_iso = true;
			}
		});

		// Chargement des fichiers Mes Homebrews
		fs.readdir("psp/homebrew/mesfichiers/", (err, dir) => {
			for(let filePath of dir) {
				
				if(filePath == "notice.txt")
					continue;

				this.mes_homebrew.push({nom: filePath});
				this.liste_mes_homebrew = true;
			}
		});

		// Chargement des fichiers Mes jeux
		fs.readdir("psp/jeu/mesfichiers/", (err, dir) => {
			for(let filePath of dir) {
				
				if(filePath == "notice.txt")
					continue;

				this.mes_jeu.push({nom: filePath});
				this.liste_mes_jeu = true;
			}
		});
	},
	computed: {
		taille_total: function () {
			return this.taille + this.taille_isos;
		},
		progression: function () {

			if(this.generationencours === false){
				return;
			}

			this.progress_current = true;

			let html = "";

			switch (this.progress_plugin) {
				case 0:
					//html += "<p><span class='blanc'>Plugins:</span> <span class='orange'>Rien.</span></p>";
					break;
				case 1:
					html += "<p><span class='blanc'>Plugins :</span> <span class='orange'> Copie en cours.</span></p>";
					break;
				case 2:
					html += "<p><span class='blanc'>Plugins :</span> <span class='light-green'> Terminé.</span></p>";
					break;
				case 3:
					html += "<p><span class='blanc'>Plugins :</span> <span class='pink'> Erreur de copie.</span></p>";
					break;
			}

			switch (this.progress_theme) {
				case 0:
					//html += "<p>Themes: Rien.</p>";
					break;
				case 1:
					html += "<p><span class='blanc'>Themes :</span> <span class='orange'> Copie en cours.</span></p>";
					break;
				case 2:
					html += "<p><span class='blanc'>Themes :</span> <span class='light-green'> Terminé.</span></p>";
					break;
				case 3:
					html += "<p><span class='blanc'>Themes :</span> <span class='pink'> Erreur de copie.</span></p>";
					break;
			}

			switch (this.progress_iso) {
				case 0:
					//html += "<p>Isos: Rien.</p>";
					break;
				case 1:
					html += "<p><span class='blanc'>Isos :</span> <span class='orange'> Copie en cours.</span></p>";
					break;
				case 2:
					html += "<p><span class='blanc'>Isos :</span> <span class='light-green'> Terminé.</span></p>";
					break;
				case 3:
					html += "<p><span class='blanc'>Isos :</span> <span class='pink'> Erreur de copie.</span></p>";
					break;
			}

			switch (this.progress_jeu) {
				case 0:
					//html += "<p>Jeux: Rien.</p>";
					break;
				case 1:
					html += "<p><span class='blanc'>Jeux :</span> <span class='orange'> Copie en cours.</span></p>";
					break;
				case 2:
					html += "<p><span class='blanc'>Jeux :</span> <span class='light-green'> Terminé.</span></p>";
					break;
				case 3:
					html += "<p><span class='blanc'>Jeux :</span> <span class='pink'> Erreur de copie.</span></p>";
					break;
			}

			switch (this.progress_mesjeu) {
				case 0:
					//html += "<p>Mes jeux: Rien.</p>";
					break;
				case 1:
					html += "<p><span class='blanc'>Mes jeux :</span> <span class='orange'> Copie en cours.</span></p>";
					break;
				case 2:
					html += "<p><span class='blanc'>Mes jeux :</span> <span class='light-green'> Terminé.</span></p>";
					break;
				case 3:
					html += "<p><span class='blanc'>Mes jeux :</span> <span class='pink'> Erreur de copie.</span></p>";
					break;
			}

			switch (this.progress_homebrew) {
				case 0:
					//html += "<p>Homebrews: Rien.</p>";
					break;
				case 1:
					html += "<p><span class='blanc'>Homebrews :</span> <span class='orange'> Copie en cours.</span></p>";
					break;
				case 2:
					html += "<p><span class='blanc'>Homebrews :</span> <span class='light-green'> Terminé.</span></p>";
					break;
				case 3:
					html += "<p><span class='blanc'>Homebrews :</span> <span class='pink'> Erreur de copie.</span></p>";
					break;
			}

			switch (this.progress_meshomebrew) {
				case 0:
					//html += "<p>Mes homebrews: Rien.</p>";
					break;
				case 1:
					html += "<p><span class='blanc'>Mes homebrews :</span> <span class='orange'> Copie en cours.</span></p>";
					break;
				case 2:
					html += "<p><span class='blanc'>Mes homebrews :</span> <span class='light-green'> Terminé.</span></p>";
					break;
				case 3:
					html += "<p><span class='blanc'>Mes homebrews :</span> <span class='pink'> Erreur de copie.</span></p>";
					break;
			}								
			switch (this.progress_rom) {
				case 0:
					//html += "<p>Roms: Rien.</p>";
					break;
				case 1:
					html += "<p><span class='blanc'>Roms :</span> <span class='orange'> Copie en cours.</span></p>";
					break;
				case 2:
					html += "<p><span class='blanc'>Roms :</span> <span class='light-green'> Terminé.</span></p>";
					break;
				case 3:
					html += "<p><span class='blanc'>Roms :</span> <span class='pink'> Erreur de copie.</span></p>";
					break;
			}
			switch (this.progress_emulateur) {
				case 0:
					//html += "<p>Emulateurs: Rien.</p>";
					break;
				case 1:
					html += "<p><span class='blanc'>Emulateurs :</span> <span class='orange'> Copie en cours.</span></p>";
					break;
				case 2:
					html += "<p><span class='blanc'>Emulateurs :</span> <span class='light-green'> Terminé.</span></p>";
					break;
				case 3:
					html += "<p><span class='blanc'>Emulateurs :</span> <span class='pink'> Erreur de copie.</span></p>";
					break;
			}
			switch (this.progress_firm) {
				case 0:
					//html += "<p>Mise a jour: Rien.</p>";
					break;
				case 1:
					html += "<p><span class='blanc'>Mise a jour :</span> <span class='orange'> Copie en cours.</span></p>";
					break;
				case 2:
					html += "<p><span class='blanc'>Mise a jour :</span> <span class='light-green'> Terminé.</span></p>";
					break;
				case 3:
					html += "<p><span class='blanc'>Mise a jour :</span> <span class='pink'> Erreur de copie.</span></p>";
					break;
			}


			return html;
		}
	},
	methods: {
		uncheck_roms(id) {
			if(this.rom.includes(id)) {
				let index = this.rom.indexOf(id);

				if (index > -1) {
				    this.rom.splice(index, 1);
				}

				this.taille_pack (id);
			}
		},
		taille_pack (id) {

			let size = underscore.findWhere(this.tailles, {name: id});

			if(this.rom.includes(id)) {
				// add
				this.taille += Number.parseInt(size.taille);
			} else {
				// sub
				this.taille -= Number.parseInt(size.taille);
			}
		},
		taille_pack_isos (id) {

			let size = underscore.findWhere(this.tailles_isos, {name: id});

			if(this.liste_isos.includes(id)) {
				// add
				this.taille_isos += Number.parseInt(size.taille);
			} else {
				// sub
				this.taille_isos -= Number.parseInt(size.taille);
			}
		},		
		calcule_tailles (id) {
			
			let size = underscore.findWhere(this.tailles, {name: id});

			if(size != undefined){
				return size.taille + " mo";
			}

			return "calcule...";
		},
		calcule_tailles_isos (id) {
			
			let size = underscore.findWhere(this.tailles_isos, {name: id});

			if(size != undefined){
				return size.taille + " mo";
			}

			return "calcule...";
		},
    	openfolder () {
			const { remote } = require('electron')
			const pathArray = remote.dialog.showOpenDialog({properties: ['openDirectory']});

			this.folder = pathArray;
    	},
    	OpenInfo (type, infos) {
    		const underscore = require('underscore');

    		if (type == "emulateur") {

				this.modal_info  = "<ul>";
	    		this.modal_info += "<li> Nom de l'émulateur: " + infos.nom + "</li>";
				this.modal_info += "<li>" + infos.description + "</li>";
				this.modal_info += '<li>Version: ' + infos.version + "</li>"
				this.modal_info += "</ul>";

    		} else {

				this.modal_info  = "<ul>";
	    		this.modal_info += "<li>" + infos.nom + "</li>";
				this.modal_info += "<li>" + infos.description + "</li>";
				this.modal_info += '<li>Version: ' + infos.version + "</li>"
				this.modal_info += "</ul>";

			}

			this.opened = true;

    	}
  	}
}
</script>
