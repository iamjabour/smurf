= A Plataform to Extract and Retrival Information from Web Documents (ERI) =
== UnitTests ==
Os testes unitários utilizam o framework unittest [1] disponibilizado pelo python. Dentro de cada módulo podem ser encontrados os arquivos test_<nome do arquivo>.py que testa as funcões oferecidas pelo <nome do arquivo>.py

Para executar todos os testes unitários pode ser utilizado o aplicativo nosetests [2].

ex:
$ nosetests

== Variáveis de Ambiente ==
Para poder executar qualquer modulo desse projeto você deve exportar a variavel de ambiente PYTHOPATH com o path para o diretório corrente.

ex:
$ export PYTHONPATH=$(pwd)

== Documentação ==
A documentação das classes pode ser encontrada no formato pydoc dentro do próprio código ou dentro da pasta pydoc em formato html.

[1] - Unit testing framework, http://docs.python.org/library/unittest.html.
[2] - Nose, http://somethingaboutorange.com/mrl/projects/nose/0.11.1/
