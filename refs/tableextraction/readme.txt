Resumo Informativo sobre as referencias:

1: Vissualy Guided Bottom-Up table Detection and Segmatation in Web Documents

 - Informações pessoais
  Tarefa: Identificar tabela genuína
  Qualidade: médio
  Abordagem: visual
  Tipo: small paper (procurar full paper)
  Referencias lidas: 
  
 Se baseia na imagem gerada pelo documento quando renderizada. Na tentativa de identificar os blocos que podem ser tabelas genuínas o autor cria blocos pequenos e tenta clusterizar esse blocos, em uma abordagem de baixo para cima, ou seja, do menor bloco (com maior altura na arvore) até o maior bloco (o bloco pai de vários sub-blocos, com menor altura na arvore).

 É realizado um treinamento um parte do corpus para se obter parâmetros necessários da heurística, porém depois desse treinamento a extração de tabelas é totalmente não supervisionada.

 É descrito um conjunto de heurísticas que combinadas obtém cerca de 70% de precisão.
 
2: A Machine Learning Based Approach for table etection on the Web

 - Informações pessoais
  Tarefa: Identificar tabela genuína
  Qualidade: bom
  Abordagem: Estrutural, textual
  Ripo: full paper
  Referencias lidas: 

 Utiliza técnicas de aprendizado de máquina para gerar modelos SVM e Trees para a classificação em tabelas genuínas ou não, apresentado novas features para a resolução do problema.

 Tem como ponto negativo utilizar words para a criação de um conjunto de features, porém os resultados sem esse conjunto é razoável e não fica a mais de 0,5% do resultado com esse conjunto.

 Os 3 conjuntos de features são:
  - Layout: Claramente observações da estrutura das tabelas, obtendo frequência de uso e dados derivados de tags como "td", "tr", "th", "br".
  - Content: Onde os tipos dos dados são analisados, tentando obter relações do tipo de atributos cada celula contêm. Como exemplo, verifica se uma linha/coluna só tem elementos numéricos. São obtidas informações estatísticas e derivadas desse conjunto de atributos.
  - Words: São observadas as as palavras chaves, comumente utilizadas, para identificar labels (rótulos) das linhas/colunas e assim poder identificar nas tabelas.

 * Aparentemente o corpus parece ser bem construído.
 * Obtêm resultados acima de 90%, utilizando apenas as features de layout e content.
 
3: Learning table Extraction From Examples

  - Informações pessoais
   Tarefa: Rotular celulas da tabela
   Qualidade: bom
   Abordagem: Estrutural. textual
   referencias lidas: [2] [4]

  Afirma ser o primeiro paper a apresentar um full parser para rotular celulas de tabelas, destacando a importância de se obter as labels (rótulos) para a realização da tarefa, pois facilita a identificação de sua estrutura.
 
  Para identificar as tabelas genuína é utilizada uma implementação própria com base no trabalho [2].

  Utiliza Machine Learn para aprender as labels comuns e permite uma distancia de edição, para facilitar o aprendizado.

4: Table Extraction Usin Conditional Random Fields

 - Informações pessoais
  Tarefa: Identificar tabela genuína e identificar linas e seus tipos
  Qualidade: bom
  Abordagem: textual
  Referencias lidas:

  Descreve bem o problema, dividindo em 6 sub-tarefas:
   - Localizar tabela (genuína)
   - Identificar linhas e seus tipos
   - Identificar colunas e seus tipos
   - Segmentar tabela em celulas
   - Definir se uma celula é dado ou label
   - Associar uma celula de dado a sua label

 Utiliza um conjunto de features, aparentemente simples, para modelar o problema em uma Conditional Random Fields (CRF).

 * Ataca o problema em texto corrido, e não em HTML
