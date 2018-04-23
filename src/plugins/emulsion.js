export default {
	data () {
		return {
			testes: "hello",
		}
	},
	methods: {
    	generate_sdcard() {

			const unzip = require('unzip-stream')
			const fs = require('fs-extra')

    	 	if(!this.folder) {
    	 		this.$q.notify({
					message: 'Les fichiers seront copié dans le dossier /psp/cartesd/ de l\'application.',
					type: 'info',
					icon: 'warning',
					position: 'top',
					timeout: 30000,
				})

				this.folder = 'psp/cartesd/';
				
    	 	} else {
    	 		//this.folder = this.folder[0];
    	 	}

    	 	this.generationencours = true;

    	 	// Extraction du firmwear en fonction du type de console.
			if(this.firm.length > 0 ) {

				this.progress_firm = 1;

				if(this.firm.includes('firm_off')){

			  		var inputFileName = 'psp/maj/'+ this.console_type +'/'+ this.console_type +'_off.zip'
					var extractToDirectory = this.folder;

					fs.createReadStream(inputFileName)
					.pipe(unzip.Extract({ path: extractToDirectory }))
					.on('close', () => {
						this.progress_firm = 2;
					});	
				}


				if(this.firm.includes('firm_hack')){

			  		var inputFileName = 'psp/maj/'+ this.console_type +'/'+ this.console_type +'_hack.zip'
					var extractToDirectory = this.folder;

					fs.createReadStream(inputFileName)
					.pipe(unzip.Extract({ path: extractToDirectory }))
					.on('close', () => {
						this.progress_firm = 2;
					});					
				}
			}

			// Extraction des emulateurs
			if(this.emulateur.length > 0 ) {

				this.progress_emulateur = 1;
				
				this.liste_emulateur_nb = this.emulateur.length;

				var i_emul = 0;
				for(let emul of this.emulateur) {

					let resultat = this.architecture.emulateur.find( em => em.id === emul);

					var inputFileName = resultat.folder;
					var extractToDirectory = this.folder + 'PSP/GAME/';

					fs.createReadStream(inputFileName)
					.pipe(unzip.Extract({ path: extractToDirectory }))
					.on('close', () => {

						i_emul++;
						if(i_emul === this.liste_emulateur_nb) {
							this.progress_emulateur = 2;
						}

					});
				}
			}

			// Déplacement des fichiers de roms
			if(this.rom.length > 0 ) {
				
				this.progress_rom = 1;
				
				this.liste_rom_nb = this.rom.length;

				var i_rom = 0;				
				for(let roms of this.rom) {

					// recherche du dossier de destination des roms
					let resultat =  this.architecture.rom.find( ro => ro.id === roms);
					
					fs.copy('psp/rom/' + roms, this.folder + 'PSP/GAME' + resultat.destination)
					.then(() => {

						// Test si un fichier de cache est a extraire
						if(resultat.cache !== false){
							var inputFileName = resultat.cache;
							var extractToDirectory = this.folder + 'PSP/GAME/'+ resultat.cache_dest;

							fs.createReadStream(inputFileName)
							.pipe(unzip.Extract({ path: extractToDirectory }))
							.on('close', () => {

								fs.unlink(this.folder + 'PSP/GAME'+ resultat.destination + 'cache.zip', (err) => {
								  if (err) throw err;
								  //console.log('cache.zip was deleted');
								});
								//console.log("if");
								//console.log(this.liste_rom_nb);

								i_rom++;
								//console.log(i_rom);
								if(i_rom === this.liste_rom_nb) {
									this.progress_rom = 2;
								}

							});
						} else {
							//console.log("else");
							//console.log(this.liste_rom_nb);
							i_rom++;
							//console.log(i_rom);
							if(i_rom === this.liste_rom_nb) {
								this.progress_rom = 2;
							}
						}
					})
					.catch(err => { this.$q.notify({message: err,type: 'warning',icon: 'warning'})})
				}
			}

			// liste des homebrew 
			if(this.homebrews.length > 0 ) {

				this.progress_homebrew = 1;
				
				this.liste_homebrew_nb = this.homebrews.length;

				var i_hom = 0;
				for(let homebrew of this.homebrews) {
					let resultat =  this.architecture.homebrew.find( ho => ho.files === homebrew);

					var inputFileName = 'psp/homebrew/'+ homebrew;
					
					if(resultat.destination !== false){
						var extractToDirectory = this.folder + resultat.destination;
					} else {
						var extractToDirectory = this.folder + 'PSP/GAME/';
					}

					fs.createReadStream(inputFileName)
					.pipe(unzip.Extract({ path: extractToDirectory }))
					.on('close', () => {

						i_hom++;
						if(i_hom === this.liste_homebrew_nb) {
							this.progress_homebrew = 2;
						}

					});
				}
			}

			// liste des homebrew dans le dossier
			if(this.meshomebrews.length > 0 ) {

				this.progress_meshomebrew = 1;
				
				this.liste_mes_homebrew_nb = this.meshomebrews.length;

				var i_meshom = 0;
				for(let meshomebrew of this.meshomebrews) {
					var inputFileName = 'psp/homebrew/mesfichiers/'+ meshomebrew;
					var extractToDirectory = this.folder;

					fs.createReadStream(inputFileName)
					.pipe(unzip.Extract({ path: extractToDirectory }))
					.on('close', () => {

						i_meshom++;
						if(i_meshom === this.liste_mes_homebrew_nb) {
							this.progress_meshomebrew = 2;
						}

					});
				}
			}
			
			// liste des jeux	
			if(this.jeux.length > 0 ) {

				this.progress_jeu = 1;
				
				this.liste_jeu_nb = this.jeux.length;

				var i_jeu = 0;
				for(let jeu of this.jeux) {
					var inputFileName = 'psp/jeu/'+ jeu;
					var extractToDirectory = this.folder + 'PSP/GAME/';

					fs.createReadStream(inputFileName)
					.pipe(unzip.Extract({ path: extractToDirectory }))
					.on('close', () => {
						i_jeu++;
						if(i_jeu === this.liste_jeu_nb) {
							this.progress_jeu = 2;
						}
					});
				}
			}

			// liste des jeux perso dans le dossier
			if(this.mesjeux.length > 0 ) {
				
				this.progress_mesjeu = 1;
				
				this.liste_mesjeu_nb = this.mesjeux.length;

				var i_mesjeu = 0;
				for(let mesjeux of this.mesjeux) {
					var inputFileName = 'psp/jeu/mesfichiers/'+ mesjeux;
					var extractToDirectory = this.folder;

					fs.createReadStream(inputFileName)
					.pipe(unzip.Extract({ path: extractToDirectory }))
					.on('close', () => {

						i_mesjeu++;
						if(i_mesjeu === this.liste_mesjeu_nb) {
							this.progress_mesjeu = 2;
						}

					});					
				}
			}

			// Themes
			if(this.themes === true) {

				fs.ensureDir(this.folder + 'PSP/THEME/')
				.then(() => {
					
					this.progress_theme = 1;
					fs.copy('psp/themes', this.folder + 'PSP/THEME/')
					.then(() => {
						this.progress_theme = 2;
					})
					.catch(err => {
						console.error(err)
						this.progress_theme = 3;
					})

				})
				.catch(err => {
					console.error(err)
					this.progress_plugin = 3;
				})
			}

			// Plugins
			if(this.plugins === true) {

				this.progress_plugin = 1;
				fs.copy('psp/plugins', this.folder + 'seplugin')
				.then(() => {
					this.progress_plugin = 2;
				})
				.catch(err => {
					console.error(err)
					this.progress_plugin = 3;
				})
			}

			// Liste des iso selectionnés
			if(this.liste_isos.length > 0 ) {

				this.progress_iso = 1;

				fs.ensureDir(this.folder + 'ISO/')
				.then(() => {
					
					this.liste_isos_nb = this.liste_isos.length;

					var i_iso = 0;
					for (let fichier of this.liste_isos) {
						fs.copy('psp/iso/'+ fichier, this.folder + 'ISO/' + fichier)
						.then(() => {

							i_iso++;
							if(i_iso === this.liste_isos_nb) {
								this.progress_iso = 2;
							}

						})
						.catch(err => { this.$q.notify({message: err,type: 'warning',icon: 'warning'})})
					}

				})
				.catch(err => {
					console.error(err)
					this.progress_iso = 3;
				})

			}
    	}
  	}
}