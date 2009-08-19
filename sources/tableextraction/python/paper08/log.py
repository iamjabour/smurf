
from rcd.common.utils import readableDateTime

# log levels
LOG_ERROR = 0
LOG_WARNING = 1
LOG_INFO = 2
LOG_DEBUG = 3

# shared memory between Log instances
_logMessages = []  # log container
_logLevel = LOG_ERROR  # level of detail for logging

# quick identifiers of the level of detail for each log message
_levelIdentifiers = {
    LOG_ERROR: 'ERROR',
    LOG_WARNING: 'WARNING',
    LOG_INFO: 'INFO',
    LOG_DEBUG: 'DEBUG',
}


class Log(object):
    """
    Log handler.

    Instances of this object share a common memory space for storing log
    messages. Each instance has an identification of which class it
    belongs to, adding that information automatically in all log messages
    it generates, for ease of debugging.
    """

    def __init__(self, caller):
        """
        @param str caller:  a string identifying the class, script or
            module that contains this instance of the Log object, for
            more detailed logs.
        """

        self.__caller = caller

    def setLogLevel(self, newLevel):
        """
        Changes the level of detail for logging.

        This method can only increase the level of detail, but never
        decrease it. All calls to this method are treated as 'set the
        log level to *AT LEAST* a given value'.

        @param int newLevel:  level of detail for logging. Recommended
            to use one of the module constants (LOG_*)
        """

        global _logLevel

        if newLevel > _logLevel:
            _logLevel = newLevel

    def __addLog(self, level, message):
        """
        Adds a given message to the log.

        This method automatically adds the identification of the 'caller'
        (the owner of the Log object instance).

        @param int level:  the level of detail of the message we want
            to add (this is one of the LOG_* constants defined in the module)
        @param str message:  the log message
        """

        global _logLevel, _logIdentifiers, _logMessages

        # test if the level of detail exceeds our needs
        if _logLevel < level:
            return

        # string that identifies the level of the log message
        levelString = _levelIdentifiers[level]

        # format the log message and append to log container
        s = '[%(datetime)s] (%(logType)s):%(origin)s: %(msg)s' % {
            'datetime': readableDateTime(),
            'logType': levelString,
            'origin': self.__caller,
            'msg': message
        }
        _logMessages.append(s)

    def addError(self, s):
        """
        Adds an error message to the log file.
        """

        self.__addLog(LOG_ERROR, s)

    def addWarning(self, s):
        """
        Adds a warning message to the log file, if the logging
        level allows it.
        """

        self.__addLog(LOG_WARNING, s)

    def addInfo(self, s):
        """
        Adds an info message to the log file, if the logging
        level allows it.
        """

        self.__addLog(LOG_INFO, s)

    def addDebug(self, s):
        """
        Adds a debug message to the log file, if the logging
        level allows it.
        """

        self.__addLog(LOG_DEBUG, s)

    def saveToFile(self, file):
        """
        Saves the log to a file. The file will be overwritten if it
        already exists.
        """

        global _logMessages

        fp = open(file, 'w')
        fp.write(self.getLogMessages())
        fp.close()

    def getLogMessages(self):
        """
        Returns all log messages as a string.
        """

        global _logMessages

        # returns a string of the log
        return '\n'.join(_logMessages) + '\n'


