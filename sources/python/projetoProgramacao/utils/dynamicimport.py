import glob
import os

def dimport(module, className, parameters={}):
    """
    Dynamically instantiates a given class name, in the given module.

    @param str module:  the lookup module path (i.e.: extractors.distancebypair)
    @param str className:  the className to instantiate
        (i.e.: SimilarNodes)
    @param dict parameters:  parameters passed to the class
    @return object:  an instance of the object
    """

    dottedPath = module + '.' + className.lower()

    try:
        m = __import__(dottedPath, globals(), locals(), [''])
    except ImportError, ex:
        raise SystemExit("Error while importing python module '%s': %s" \
            % (dottedPath, ex))

    try:
        o = getattr(m, className)
    except AttributeError, ex:
        raise SystemExit("Error when looking for class '%s' in '%s': %s" \
            % (className, dottedPath, ex))

    # convert dictionary keys to regular strings, as unicode keys yield
    # errors when passing as parameters with dictionary expansion
    params = {}
    for (k, v) in parameters.iteritems():
        params[str(k)] = v

    return o(**params)

