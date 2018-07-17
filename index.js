var htmlTemplate = require('angular-template');

htmlTemplate.directives.push( require('./angular-directives/ngfor'))


var data = {
    title : "Newsletter",
    enabled : true,
    people :  [{
        "name": "Douglas  Pace"
    },
    {
        "name": "Mcleod  Mueller"
    },
    {
        "name": "Day  Meyers"
    }]
};
String.prototype.replaceAll = function(str1, str2, ignore)
{
    return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
};
var ng2tpl = `<div>
              <h1>Template 1</h1>
              <h2>{{data.title}}</h2>
              <!--[if (gte mso 9)|(IE)]>
                  <div>Internet Explorer</div>
              <![endif]-->
              <div *ngIf="data.enabled">Enabled</div>
              <div *ngIf="!data.enabled">Not Enabled</div>
              <div>
                <ul>
                  <li *ngFor="let person of data.people">
                        {{person.name}}
                  </li>
                </ul>
              </div>
            </div>`;
var ng2servertpl = ng2tpl.replaceAll('[(ngModel)]','ht-bind');
ng2servertpl = ng2servertpl.replaceAll('*ngIf','ht-if');
ng2servertpl = ng2servertpl.replaceAll('*ngFor','ht-for');

console.log(ng2servertpl)


console.log(htmlTemplate(ng2servertpl, data));


			
			
		
