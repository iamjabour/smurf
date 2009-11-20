import sys
from eri.utils.dynamicimport import *

class Configurator(object):

    def __init__(self, path):
        conf_string = open(path, 'r').readlines()

        list = [s.split(':') for s in conf_string if s[0] != '#']

        conf = {}
        for i in xrange(0,len(list)):
            if len(list[i]) == 2:
                conf.update({list[i][0].strip():list[i][1].strip()})

        self.objects = self.create_objects(conf)


    def create_objects(self, conf):
        obj = {}
        eri = "eri"
        if 'marker' in conf:
            marker = dimport(eri, conf['marker'])
            obj.update({'marker':marker})
        else:
            raise SystemExit, "Dont found marker in config file"

        if 'proof' in conf:
            proof = dimport(eri, conf['proof'])
            obj.update({'proof':proof})
        else:
            raise SystemExit, "Dont found proof in config file"

        if 'metric' in conf:
            metric = dimport(eri, conf['metric'])
            obj.update({'metric':metric})
        else:
            raise SystemExit, "Dont found metric in config file"

        return obj

    def marker(self):
        return self.objects['marker']

    def proof(self):
        return self.objects['proof']

    def metric(self):
        return self.objects['metric']
