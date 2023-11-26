#!/bin/bash
vecchiaDirectory=$PWD
directory=$PWD"/"$1
echo $directory

elenco="elenco.txt"


cd $directory
rm elenco.txt
lista=$(ls *.cpp)

echo $lista

for sorgente in $lista 
do
	echo "sorgente_______________:"$sorgente
	sorgenteMenoEstensione=${sorgente::-4};
	echo "sorgenteMenoEstensione_:"$sorgenteMenoEstensione
	eseguibile=$sorgenteMenoEstensione".exe"
	echo "eseguibile_____________:"$eseguibile
	soluzione=$sorgenteMenoEstensione".sol"
	echo "soluzione______________:"$soluzione

	g++ $sorgente -o $eseguibile
	
	echo "esecuzione ____________"
	"./"$eseguibile 
	"./"$eseguibile > $soluzione

	echo $'\n'"________________________"
	echo "################################################"

	echo $sorgenteMenoEstensione >> $elenco 
done
rm *.exe


cd $vecchiaDirectory



