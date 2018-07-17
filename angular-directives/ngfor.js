'use strict';

function NgForDirective($, data, options, angularTemplate) {
    /**
     * ht-for expression
     */
    var htRepeats = $("*[" + options.prefix + "-for]");

    htRepeats.each(function (i, elem) {
        var expr = $(this).attr(options.prefix + '-for').trim();

        //Remove angular2 syntax to be in sync with repeat
        expr = expr.replace(/\blet\b/,"").replace(/\bof\b/, 'in').trim();

        var result = angularTemplate.helpers.parseRepeatExpression(expr);

        if (!result) return;
        var tmpName = ('_' + result.collectionName).replace(/[^a-zA-Z0-9]/g, '_');

        var jsTmplStr =
            "&lt;% var " + tmpName + " = " + angularTemplate.helpers.expression(result.collectionExpr, options) + ";" +
            "  for(var " + result.keyExpr + " in " + tmpName + ") { " +
            "  var " + result.valueExpr + " = " + tmpName + "[" + result.keyExpr + "]; %&gt;";

        $(this).before(jsTmplStr);
        $(this).after("&lt;% } %&gt;");

        $(this).removeAttr(options.prefix + '-for');
    });
}

module.exports = NgForDirective