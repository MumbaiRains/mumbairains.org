var Tabletop = require('tabletop');
var jsonfile = require('jsonfile');
var async = require('async');


var sheets = [
  {
    name: "Shelter-Food",
    url: 'https://docs.google.com/spreadsheets/d/1lNF2JFoDR3uQ8-dDQHUXvD_7ZYDyCFyRwLNsrzoZwIs/edit?usp=sharing',
    api: 'shelter-food.json',
    sheetName: "Shelter/Food",
  },
  {
    name: "Contacts",
    url: 'https://docs.google.com/spreadsheets/d/1lNF2JFoDR3uQ8-dDQHUXvD_7ZYDyCFyRwLNsrzoZwIs/edit?usp=sharing',
    api: 'contacts.json',
    sheetName: "Emergency",
  }
];

async.forEach(sheets, function (item, callback){

  function writeData(dataSet, tabletop) {
    var obj = {
      columns: tabletop.sheets(item.sheetName)['column_names'],
      rows: tabletop.sheets(item.sheetName).toArray()
    }
    var file = 'api/'+item.api;

    jsonfile.writeFileSync(file, obj)
    console.log('Saved: '+item.name);
    callback();
  }
  Tabletop.init( { key: item.url,
    callback: writeData,
    wanted: [item.sheetName],
    simpleSheet: false } )

  }, function(err) {
    console.log('Done');
  });
