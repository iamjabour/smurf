
import os, jpype
from jpype import java

classpath = os.path.join(os.environ["CLASSPATH"])
if not jpype.isJVMStarted():
    _jvmArgs = ["-ea"] # enable assertions
    _jvmArgs.append("-Djava.class.path="+classpath)
    jpype.startJVM(jpype.getDefaultJVMPath(), *_jvmArgs)

weka = jpype.JPackage("weka")

JPypeObjectInputStream = jpype.JClass("JPypeObjectInputStream")

class WekaClassifier(object):
    def __init__(self, modelFilename, datasetFilename):
        javaio =  java.io.FileReader(datasetFilename)
        self.dataset = weka.core.Instances(javaio)
        self.dataset.setClassIndex(self.dataset.numAttributes() - 1)

        self.instance = weka.core.Instance(self.dataset.numAttributes())
        self.instance.setDataset(self.dataset)

        ois = JPypeObjectInputStream(
            java.io.FileInputStream(modelFilename))
        self.model = ois.readObject()

    def classify(self, record):
        for i, v in enumerate(record):
            if v is None:
                self.instance.setMissing(i)
            else:
                if type(v) == int:
                    v = float(v)
                self.instance.setValue(i, v)
        return self.dataset.classAttribute().value(
            int(self.model.classifyInstance(self.instance)))


if __name__ == '__main__':
    w = WekaClassifier('model.model', 'model.arff')
    #w = WekaClassifier('novoparser.model', 'novoparser.csv.arff')
    print w.classify( (114,55,4,10) )
    pass
