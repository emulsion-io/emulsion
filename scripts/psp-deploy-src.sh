#!/bin/bash

# Ou ce trouve les fichiers PSP de travail classé dans les dossiers ci dessous.
DOSSIER_PSP_ORIGINE= || VOTRE DOSSIER ICI ||

DOSSIER_EMULATEUR=_emulateur # les dossiers sont zip
DOSSIER_HOMEBREW=_homebrew # les dossiers sont zip
DOSSIER_PLUGIN=_plugins # les dossiers ne sont pas zip
DOSSIER_JEU=_jeux # les dossiers sont zip
DOSSIER_THEME=_theme # les fichiers ne sont pas zip
DOSSIER_MAJ=_maj # les dossiers sont zip et ne doivent pas etre modifié de format

# Ou vont ce trouver les fichiers cleans
DOSSIER_PSP_DESTINATION= || VOTRE DOSSIER ICI ||
# Ou ce trouve l'architecture des dossiers cleans model
DOSSIER_PSP_DESTINATION_MODEL= || VOTRE DOSSIER ICI ||

# Ou ce trouve la zone de developpement de l'application Emulsion
DOSSIER_PSP_APPLICATION= || VOTRE DOSSIER ICI ||

# Ou ce trouve les fichiers des versions compilé
DOSSIER_PSP_BUILD=$DOSSIER_PSP_APPLICATION/dist/electron-mat
DOSSIER_PSP_BUILD_WIN=emulsion-psp-win32-x64
DOSSIER_PSP_BUILD_LINUX=emulsion-psp-linux-x64
DOSSIER_PSP_BUILD_MAC=emulsion-psp-darwin-x64

# Fichier de log pour analyser les divers probs si prob il devait y avoir :)
LOG_FILE=$DOSSIER_PSP_DESTINATION/reussite.log

EMULATEURS=('cps1' 'cps2' 'fba' 'gamegear' 'gb' 'gba' 'gbc' 'mame' 'mastersystem' 'megadrive' 'msx0' 'n64' 'nes' 'ng' 'ngpc' 'snes' );

echo "[$(date +%d/%m/%Y-%H:%M)] DEBUT " >> $LOG_FILE

echo "[$(date +%d/%m/%Y-%H:%M)] Lancement du script de copie " >> $LOG_FILE

read -p "Numero de la version : v01 v02 v10... :" NUMERO_VERSION

echo "Nous allons utiliser la version $NUMERO_VERSION pour ce script"

echo ""
echo "############################################"
echo "#                                          #"
echo "#         Copie des fichiers PSP           #"
echo "#                                          #"
echo "############################################"
echo ""

echo "Création du dossier de destination des fichiers $DOSSIER_PSP_DESTINATION/$NUMERO_VERSION/"

mkdir $DOSSIER_PSP_DESTINATION/$NUMERO_VERSION

echo "Création de l'architecture des dossiers par copie du dossier model"

echo "Copie du fichier architecture.json"

cp -R $ $DOSSIER_PSP_APPLICATION/psp/architecture.json $DOSSIER_PSP_DESTINATION/$NUMERO_VERSION/psp/

echo "Copie des émulateurs"

cp -R $DOSSIER_PSP_DESTINATION_MODEL/psp/ $DOSSIER_PSP_DESTINATION/$NUMERO_VERSION

for emul in ${EMULATEURS[@]}; do

    echo "[$(date +%d/%m/%Y-%H:%M)] Copie de l'emulateur ${emul}" >> $LOG_FILE
    cp $DOSSIER_PSP_ORIGINE/$DOSSIER_EMULATEUR/${emul}/${emul}.zip $DOSSIER_PSP_DESTINATION/$NUMERO_VERSION/psp/emulateur/${emul}/

done

echo "Copie des émulateurs OK"

echo "Copie des Homebrews"

echo "[$(date +%d/%m/%Y-%H:%M)] Copie des Homebrews " >> $LOG_FILE
cp -R $DOSSIER_PSP_ORIGINE/$DOSSIER_HOMEBREW/* $DOSSIER_PSP_DESTINATION/$NUMERO_VERSION/psp/homebrew/

echo "Copie des Homebrews OK"

echo "Copie des Plugins"

echo "[$(date +%d/%m/%Y-%H:%M)] Copie des Plugins " >> $LOG_FILE
cp -R $DOSSIER_PSP_ORIGINE/$DOSSIER_PLUGIN/* $DOSSIER_PSP_DESTINATION/$NUMERO_VERSION/psp/plugins/

echo "Copie des Plugins OK"

echo "Copie des Jeux"

echo "[$(date +%d/%m/%Y-%H:%M)] Copie des Jeux " >> $LOG_FILE
cp -R $DOSSIER_PSP_ORIGINE/$DOSSIER_JEU/* $DOSSIER_PSP_DESTINATION/$NUMERO_VERSION/psp/jeu/

echo "Copie des Plugins OK"

echo "Copie des Themes"

echo "[$(date +%d/%m/%Y-%H:%M)] Copie des Themes " >> $LOG_FILE
cp -R $DOSSIER_PSP_ORIGINE/$DOSSIER_THEME/* $DOSSIER_PSP_DESTINATION/$NUMERO_VERSION/psp/themes/

echo "Copie des Themes OK"

echo "Copie des Majs"

echo "[$(date +%d/%m/%Y-%H:%M)] Copie des Majs " >> $LOG_FILE
cp -R $DOSSIER_PSP_ORIGINE/$DOSSIER_MAJ/* $DOSSIER_PSP_DESTINATION/$NUMERO_VERSION/psp/maj/

echo "Copie des Majs OK"

echo "Création du zip a exporter sur le cloud"

cd $DOSSIER_PSP_DESTINATION/$NUMERO_VERSION

zip -r $DOSSIER_PSP_DESTINATION/psp.zip psp

echo ""
echo "############################################"
echo "#                                          #"
echo "#          BUILD de l'application          #"
echo "#                                          #"
echo "############################################"
echo ""

echo "[$(date +%d/%m/%Y-%H:%M)] BUILD de l'application" >> $LOG_FILE

cd $DOSSIER_PSP_APPLICATION

quasar build -m electron -t mat
quasar build -m electron -t mat --target win32
quasar build -m electron -t mat --target darwin

echo "[$(date +%d/%m/%Y-%H:%M)] BUILD de l'application OK" >> $LOG_FILE

echo ""
echo "############################################"
echo "#                                          #"
echo "#    Création des zip de l'application     #"
echo "#                                          #"
echo "############################################"
echo ""

echo "Création du dossier de destination des fichiers $DOSSIER_PSP_BUILD/$NUMERO_VERSION/"

echo "[$(date +%d/%m/%Y-%H:%M)] Création des zip de l'application" >> $LOG_FILE

mkdir $DOSSIER_PSP_BUILD/$NUMERO_VERSION

cp $DOSSIER_PSP_BUILD/a-lire.txt $DOSSIER_PSP_BUILD/$DOSSIER_PSP_BUILD_LINUX/
cp $DOSSIER_PSP_BUILD/a-lire.txt $DOSSIER_PSP_BUILD/$DOSSIER_PSP_BUILD_WIN/
cp $DOSSIER_PSP_BUILD/a-lire.txt $DOSSIER_PSP_BUILD/$DOSSIER_PSP_BUILD_MAC/

cd $DOSSIER_PSP_BUILD

zip -r $DOSSIER_PSP_BUILD/$NUMERO_VERSION/$DOSSIER_PSP_BUILD_LINUX.zip $DOSSIER_PSP_BUILD_LINUX
zip -r $DOSSIER_PSP_BUILD/$NUMERO_VERSION/$DOSSIER_PSP_BUILD_WIN.zip $DOSSIER_PSP_BUILD_WIN
zip -r $DOSSIER_PSP_BUILD/$NUMERO_VERSION/$DOSSIER_PSP_BUILD_MAC.zip $DOSSIER_PSP_BUILD_MAC

echo "[$(date +%d/%m/%Y-%H:%M)] Création des zip de l'application OK" >> $LOG_FILE

echo ""
echo "############################################"
echo "#                                          #"
echo "#         ~~~~ VOS FICHIERS ~~~~           #"
echo "#                                          #"
echo "############################################"
echo ""
echo "Voici ou récupérer vos fichiers pour l'application : "
echo ""
echo "Application linux : $DOSSIER_PSP_BUILD/$NUMERO_VERSION/$DOSSIER_PSP_BUILD_LINUX.zip"
echo "Application Win : $DOSSIER_PSP_BUILD/$NUMERO_VERSION/$DOSSIER_PSP_BUILD_WIN.zip"
echo "Application Mac : $DOSSIER_PSP_BUILD/$NUMERO_VERSION/$DOSSIER_PSP_BUILD_MAC.zip"
echo ""
echo "Voici ou récupérer vos fichiers pour le cloud : "
echo ""
echo "psp.zip : $DOSSIER_PSP_DESTINATION/psp.zip"
echo ""
echo ""

echo "[$(date +%d/%m/%Y-%H:%M)] FIN" >> $LOG_FILE
