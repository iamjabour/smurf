from eri.utils.dynamicimport import dimport

class Configurator(object):
    """
    Configurator carrega um arquivo de configuracao ou pode ser carregado manualmente para fornecer as informacoes para um estancia do eri.
    """
    def __init__(self, path=None):
        """
        Configurator provide an intarface to configura necessaries informations to run an instance of eri.

        @param path: File with informations to create configuration
        """
        self.objects = {'marker':None, 'proof':None, 'metric':None}

        if path:
            conf_string = open(path, 'r').readlines()

            list = [s.split(':') for s in conf_string if s[0] != '#']

            conf = {}
            for i in xrange(0,len(list)):
                if len(list[i]) == 2:
                    conf.update({list[i][0].strip():list[i][1].strip()})

            self.create_objects(conf)

    def _create_metric(self, conf, eri='eri'):
        """
        Create a metric instance and value with the needed metric

        @param conf: Dictionary with key metric
        @param eri: name of projet (default 'eri')
        """
        if 'metric' in conf:
            metric = dimport(eri, conf['metric'])
            return metric
        else:
            raise SystemExit, "Dont found metric in config file"

    def _create_marker(self, conf, eri):
        """
        Create a marker instace

        @param conf: Dictionary with key metric and value with the needed marker
        @param eri: name of projet (default 'eri')
        """
        if 'marker' in conf:
            marker = dimport(eri, conf['marker'])
            return marker
        else:
            raise SystemExit, "Dont found marker in config file"

    def create_objects(self, conf):
        """
        Create all necessery objects from provided conf

        @param conf: Dictionary with name of classes neededs
        """
        eri = "eri"
        self.objects['marker'] = self._create_marker(conf, eri)
        self.objects['metric'] = self._create_metric(conf, eri)
        self.objects['metric'].setMarkers(self.objects['marker'])

    def metric(self):
        """
        return an instance of metric
        """
        return self.objects['metric']
