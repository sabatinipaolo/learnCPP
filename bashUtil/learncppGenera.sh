#!/bin/bash
# richiama da dentro la directory degli esercizi
# richiama con ../../../bashUtil/learncppGenera.sh
# genera elecno.json nella directory di lavoro 
#copia e incolla il contenuto di elenco.json in modello.json
#TODO: SISTEMARE E AGGIUNGERE CONTROLLI!!

vecchiaDirectory=$PWD
directory=$PWD"/"$1
echo "directory" $directory
dir_esercizi=$(basename $directory)
echo "dir_esercizi:"$dir_esercizi



if [[ "$dir_esercizi" == "." ]]; 
then exit
fi

elenco=$vecchiaDirectory"/""elenco.json"
rm $elenco
echo "elenco : "$elenco



echo "                    {" >> $elenco
echo "                        \"directory\" : \""$dir_esercizi"\"," >> $elenco
echo "                        \"esercizi\" : [ " >> $elenco





cd $directory
estensione=".c";

lista=$(ls *$estensione)

ultimoFile=$(ls *$estensione | tail -1 )

echo $lista
echo $ultimoFile 

for sorgente in $lista 
do
	echo "sorgente_______________:"$sorgente
	sorgenteMenoEstensione=${sorgente::-2};
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

#   echo $sorgenteMenoEstensione >> $elenco 
    if [[ "$sorgente" == "$ultimoFile" ]]
    then 
        echo "                                 \""$sorgenteMenoEstensione"\"" >> $elenco
    else
        echo "                                 \""$sorgenteMenoEstensione"\"," >> $elenco
    fi
done
echo "                           ]">>$elenco
echo "                    },">>$elenco

rm *.exe


cd $vecchiaDirectory

cat $elenco


