#!/bin/bash

corpus=$1
DIR=$(pwd)

#criando a pasta de download
if [ ! -d "download" ] 
then
	echo "Criando a pasta download para armazenar o corpus"
	$(mkdir "$DIR/download")
fi

DIR="$DIR/download"

#criando a pasta para guardar o corpus
if [ -d $1 ]
then
	echo "Corpus desejada já existe, tente outro corpus ou delete o corpus existente"
#	exit
else
	$(mkdir "$DIR/$corpus")
	$(mkdir "$DIR/proof_$corpus")
fi


#fazendo download dos arquivos descritos no corpus.txt
i=0
while read line
do
	if [ ! $line ]
	then
		continue
	fi

	i=$(($i+1));
	printf "downloading %03d document\n" $i
	echo $line
	f=${line#*/}
	if [ $corpus == "submarino" ]
	then
		f=${line#*submarino.com.br/menu/}
	elif [ $corpus == "bestbuy" ]
	then
		f=${line#*?id=}
	elif [ $corpus == "mysimon" ]
	then
		f=${line#*compare-prices/}
	fi


	file=${f/\//.}

	out="$DIR/$corpus/$file"
	proof="$DIR/proof_$corpus/$file"

	if [ -e $out.html ]
	then
		echo -e "\nERROR: Documento ja faz parte do corpus: $line\n"
	else
		echo $out
		$(wget -o $out.log -v -O $out.html $line)
		if [ ! -e $out.html ]
		then
			echo -e "\nERROR: Documento não foi pego no wget: $out"
		fi

		$(python $corpus.py $line $proof.html)

		echo
	fi
done < $corpus.txt

echo "foram processadas $i linhas"
