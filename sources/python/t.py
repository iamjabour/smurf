import abc

class Animal(object):
    """ animal"""
    __metaclass__ = abc.ABCMeta
    def reply(self):
        self.speak()

    @abc.abstractmethod
    def speak(self):
        """speak"""
        return

class Mammal(Animal):
    """ mammal"""
    def speak(self):   
      print 'speak?'

class Cat(Mammal):
    def speak(self):   
       print 'Speak from Cat'

class Dog(Mammal):
    def speak(self):   
       print 'Speak from Dog'

class Primate(Mammal): pass
#    def speak(self):   
#       print 'Speak from primate!'

class Hacker(Primate): pass

if __name__ == '__main__':
    spot = Cat()
    spot.reply()
    data = Primate()
    data.reply()
