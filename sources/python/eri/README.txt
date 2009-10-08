= Extract and Retrival Information Frameworl (ERI) =
== UnitTests ==
Os testes unitários utilizam o framework unittest disponibilizado pelo python. Dentro de cada módulo podem ser encontrados os arquivos test_<nome do arquivo>.py que testa as funcões oferecidas pelo <nome do arquivo>.py

Para executar todos os testes unitários pode ser utilizado o aplicativo nosetests [1].

ex:
$ cd project
$ nosetests

== Variáveis de Ambiente ==
Para poder executar qualquer modulo desse projeto você deve exportar a variavel de ambiente PYTHOPATH com o path para o diretório corrente.

ex:
$ export PYTHONPATH=$(pwd)
