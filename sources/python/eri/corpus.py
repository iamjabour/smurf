# -*- coding: utf-8 -*-
from eri.utils.parsedom import ParseDom
from eri.tablesproof import TablesProof
import os
from eri.utils.dynamicimport import dimport

class Doc:
    """
    Essa classe implementa um Documento para facilitar o processamento e
    utilização da ferramenta
    """
    def __init__(self, path, id=0):
        """
        Construtor do documento

        @param string path: Path para o documento
        @param int id: Identificador para o documento
        """
        self.id = id
        self.path = path
        # valor que será carregado com o parser escolhido
        self.content = None

class Corpus:
    """
    Esta classe implementa um corpus, contendo todas as informações necessárias
    para que seja possível executar qualquer tipo de aplicação da ferramenta
    sobre esse corpus.
    """

    def __init__(self, corpusPath):
        self.path = corpusPath
        self.parser = None
        self.proof = None
        self.documents = []
        self.__loadCorpus(corpusPath)

        self.count = 0

    def getProof(self, doc):
        """
        Obtem o gabarito de um documento
        """
        return self.proof.getProof(doc.content)

    def getDocument(self, file=False, id=False):
        """
        Obtem o proximo documento do corpus
        """
        if file:
            try:
                c = int(file)
                d = Doc(self.documents[c],c)
            except ValueError:
                d = Doc(os.path.join(self.path,file),0)

            d.content = self.parser.parse(d.path)
            return d
        elif id:
            d = Doc(self.documents[id],id)
            d.content = self.parser.parse(d.path)
            return d
        else:
            return self.__next()

    def __next(self):
        if self.count >= len(self.documents):
            self.count = 0
            return None
        else:
            c = self.count
            self.count += 1
            d = Doc(self.documents[c],c)
            d.content = self.parser.parse(d.path)
            return d

    def __loadcnf(self, path):
        import json
        cnf = None

        cnfString = open(path).read()

        cnfString = cnfString.replace("'", '"').replace('\n', '').replace('\t', '')
        cnf = None
        try:
            cnf = json.loads(cnfString)

        except ValueError:
            print 'Error: O arquivo description.cnf do corpus informado nao atende as especificacoes'
            return False

        if not 'name' in cnf:
            print 'Error: description.cnf sem atributo name'
            return False

        if not 'prooftype' in cnf:
            print 'Error: description.cnf sem atributo prooftype'
            return False

        if not 'corpus' in cnf:
            print 'Error: description.cnf sem atributo corpus'
            return False

        if len(cnf['corpus']) < 1:
            print 'Error: description.cnf  nao tem nenhum corpus descrito'
            return False

        return cnf

    def __parser(self, name=False):
        if name:
            return dimport('eri', name)
        else:
            return ParseDom()

    def __proof(self, name=False):
        """
        Create a proof instance and value with the needed proof

        @param conf: Dictionary with key metric
        @param eri: name of projet (default 'eri')
        """
        if name:
            return  dimport('eri', name)
        else:
            return TablesProof()

    def __loadCorpus(self, path):
        if not os.path.exists(os.path.join(path,'description.cnf')):
            self.parser = self.__parser()
            self.proof = self.__proof()
            # or exception "This corpus don't have a description"
            self.__defaultload(path)
        else:
            cnf = self.__loadcnf(os.path.join(path,'description.cnf'))
            if cnf:
                self.__load(path, cnf)
            else:
                print 'Error: Problema com a descricao do corpus'
                return None

    def __load(self, path, cnf):
            #print cnf['prooftype']
            if 'prooftype' in cnf:
                self.proof = self.__proof(cnf['prooftype'])
                #print self.proof

            if 'parsertype' in cnf:
                self.parser = self.__parser(cnf['parsertype'])
                #print self.parser
            else:
                self.parser = self.__parser()

            for corpus in cnf['corpus']:
                #print corpus

                corpuspath = os.path.join(path, corpus['path'])
                proofpath = os.path.join(path, corpus['proof'])

                type = None

                if corpus['type'] == 'files' or corpus['type'] == 'file':
                    type = 'files'
                else:
                    pass
                    #print 'none'

                if type == 'files':
                    #print '\n\nload', corpuspath
                    for file in os.listdir(proofpath):
                        if file.lower()[-4:] == 'html' or file.lower()[-3:] == 'htm':
                            docpath = os.path.join(proofpath,file)
                            if os.path.exists(docpath):
                                #print 'add', docpath
                                self.documents.append(docpath)
                            else:
                                print "Doc don't exist:", docpath
                else:
                    print 'type error'



    def __defaultload(self, path):
        for file in os.listdir(path):
            if file.lower()[-4:] == 'html' or file.lower()[-3:] == 'htm':
                docpath = os.path.join(self.path,file)
                if os.path.exists(docpath):
                    self.documents.append(docpath)
                else:
                    print "Doc don't exist:", docpath
            else:
                docpath = os.path.join(self.path,file,'index.html')

                if os.path.exists(docpath):
                    self.documents.append(docpath)
                else:
                    print "Doc don't exist:", docpath

