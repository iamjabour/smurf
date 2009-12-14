# -*- coding: utf-8 -*-
import urllib
from eri.utils.parsedom import ParseDom
from eri.tablesproof import TablesProof
import os

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

    def getDocument(self):
        """
        Obtem o proximo documento do corpus
        """
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

    def __loadCorpus(self, path):
        if not os.path.exists(os.path.join(path,'description.inf')):
            self.parser = ParseDom()
            self.proof = TablesProof()
            # or exception "This corpus don't have a description"
        else:
            pass

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

