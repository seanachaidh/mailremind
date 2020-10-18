const varSearch = new RegExp('[A-Za-z0-9]+(?=\})', 'g');

export function formatString(format: string, input: any): string {
    var toReplace = format.match(varSearch);
    var retval: string = format;
    toReplace.forEach(function(element: string) {
        var value = input[element];
        var expr = new RegExp('\{' + element + '\}', 'g');
        retval = retval.replace(expr, value);
    });
    
    return retval;
}
