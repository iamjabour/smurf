#!/bin/bash

out=$1
limit=$2
echo "Resultados:" > $out

echo "Americanas:" >> $out
python benchmark.py DistanceByPair2.Ce /home/iamjabour/workspace/tese/corpus/comercioeletronico/americanas -l $2 >> $out

echo "Bestbuy:" >> $out
python benchmark.py DistanceByPair2.Ce /home/iamjabour/workspace/tese/corpus/comercioeletronico/bestbuy -l $2 >> $out


echo "CircuitCity:" >> $out
python benchmark.py DistanceByPair2.Ce /home/iamjabour/workspace/tese/corpus/comercioeletronico/circuitcity -l $2 >> $out


echo "DealExtreme:" >> $out
python benchmark.py DistanceByPair2.Ce /home/iamjabour/workspace/tese/corpus/comercioeletronico/dealextreme -l $2 >> $out


echo "Ebay:" >> $out
python benchmark.py DistanceByPair2.Ce /home/iamjabour/workspace/tese/corpus/comercioeletronico/ebay -l $2 >> $out


echo "MySimon:" >> $out
python benchmark.py DistanceByPair2.Ce /home/iamjabour/workspace/tese/corpus/comercioeletronico/mysimon -l $2 >> $out


echo "Submarino:" >> $out
python benchmark.py DistanceByPair2.Ce /home/iamjabour/workspace/tese/corpus/comercioeletronico/submarino -l $2 >> $out


echo "Target:" >> $out
python benchmark.py DistanceByPair2.Ce /home/iamjabour/workspace/tese/corpus/comercioeletronico/target -l $2 >> $out


