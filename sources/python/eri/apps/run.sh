#!/bin/bash

out=$1

python benchmark.py DistanceByPair2.Ce /home/iamjabour/workspacePessoal/tese/corpus/comercioeletronico/americanas $2 > americana_$out

python benchmark.py DistanceByPair2.Ce /home/iamjabour/workspacePessoal/tese/corpus/comercioeletronico/bestbuy $2 > bestbuy_$out


python benchmark.py DistanceByPair2.Ce /home/iamjabour/workspacePessoal/tese/corpus/comercioeletronico/circuitcity  $2 > circuitcity_$out


python benchmark.py DistanceByPair2.Ce /home/iamjabour/workspacePessoal/tese/corpus/comercioeletronico/dealextreme $2 > dealextream_$out


python benchmark.py DistanceByPair2.Ce /home/iamjabour/workspacePessoal/tese/corpus/comercioeletronico/ebay $2 > ebay_$out


python benchmark.py DistanceByPair2.Ce /home/iamjabour/workspacePessoal/tese/corpus/comercioeletronico/mysimon $2 > mysimon_$out


python benchmark.py DistanceByPair2.Ce /home/iamjabour/workspacePessoal/tese/corpus/comercioeletronico/submarino $2 > submarino_$out


python benchmark.py DistanceByPair2.Ce /home/iamjabour/workspacePessoal/tese/corpus/comercioeletronico/target $2  > target_$out

