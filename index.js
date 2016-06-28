Object.defineProperty(global, '__line',
{
    get: function()
    {
        var err, origPrepareStackTrace = Error.prepareStackTrace
        Error.prepareStackTrace = function(err, stack) { return stack }
        Error.captureStackTrace(err = new Error(), arguments.callee)
        var stack = err.stack
        Error.prepareStackTrace = origPrepareStackTrace
        if(Error.prepareStackTrace != null)
        {
            var matches = (/:(\d+):\d+\)\n$/g).exec(Error.prepareStackTrace("",[stack[0]]))
            if(typeof matches[1] != "undefined")
            {
                return Number(matches[1])
            }
        }
        return stack[0].getLineNumber()
    }
})