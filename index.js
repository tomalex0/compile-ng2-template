var htmlTemplate = require('angular-template');

var data = {
    title : "Newsletter",
    enabled : true
};
String.prototype.replaceAll = function(str1, str2, ignore)
{
    return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
};
var ng2tpl = `<div>
              <h1>Template 1</h1>
              <h2>{{data.title}}</h2> 	<input name="title" type="text" [(ngModel)]="data.title" />
              <!--[if (gte mso 9)|(IE)]>
                  <div>Internet Explorer</div>
              <![endif]-->
              <div *ngIf="data.enabled">Enabled</div>
              <div *ngIf="!data.enabled">Not Enabled</div>
            </div>`;
var ng2servertpl = ng2tpl.replaceAll('[(ngModel)]','ht-bind');
ng2servertpl = ng2servertpl.replaceAll('*ngIf','ht-if');

console.log(ng2servertpl)

console.log(htmlTemplate(ng2servertpl, data));


			
			
		