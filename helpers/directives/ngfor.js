'use strict';

/**
 * Parse the expression to work in server side
 * @param {string} [expr="let person of data.people | slice:0 ;let i = index"]
 * @returns {Array}
 */
function getTemplateExpr(expr) {
    var baseExpr = expr.split(";");
    var forExpr = baseExpr[0];
    var tplExpr = forExpr.split("|");
    var loopExpr = tplExpr[0];
    var limitExpr = tplExpr[1];
    //Remove angular2 syntax to be in sync with repeat
    tplExpr = loopExpr.replace(/\blet\b/,"").replace(/\bof\b/, 'in').trim();
    if(limitExpr) {
        tplExpr = `${tplExpr} | ${limitExpr.trim()}`
    }
    return tplExpr;
}

function NgForDirective($, data, options, angularTemplate) {
    /**
     * ht-for expression
     */
    var htRepeats = $("*[" + options.prefix + "-for]");

    htRepeats.each(function (i, elem) {
        var expr = $(this).attr(options.prefix + '-for').trim();
        expr = getTemplateExpr(expr);

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