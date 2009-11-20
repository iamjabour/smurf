import sys
from eri.utils.dynamicimport import *

class Configurator(object):

    def __init__(self, path=None):
        self.objects = {'marker':None, 'proof':None, 'metric':None}

        if path:
            conf_string = open(path, 'r').readlines()

            list = [s.split(':') for s in conf_string if s[0] != '#']

            conf = {}
            for i in xrange(0,len(list)):
                if len(list[i]) == 2:
                    conf.update({list[i][0].strip():list[i][1].strip()})

            self.create_objects(conf)

    def _create_metric(self, conf, eri):
        if 'metric' in conf:
            metric = dimport(eri, conf['metric'])
            return metric
        else:
            raise SystemExit, "Dont found metric in config file"

    def _create_proof(self, conf, eri):
        if 'proof' in conf:
            proof = dimport(eri, conf['proof'])
            return proof
        else:
            raise SystemExit, "Dont found proof in config file"

    def _create_marker(self, conf, eri):
        if 'marker' in conf:
            marker = dimport(eri, conf['marker'])
            return marker
        else:
            raise SystemExit, "Dont found marker in config file"

    def create_objects(self, conf):
        eri = "eri"
        self.objects['marker'] = self._create_marker(conf, eri)
        self.objects['proof'] = self._create_proof(conf, eri)
        self.objects['metric'] = self._create_metric(conf, eri)

    def marker(self):
        return self.objects['marker']

    def proof(self):
        return self.objects['proof']

    def metric(self):
        return self.objects['metric']
