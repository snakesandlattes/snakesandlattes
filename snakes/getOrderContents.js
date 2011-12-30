var wsh=WScript.CreateObject("WScript.Shell");
var fs=new ActiveXObject("Scripting.FileSystemObject");

function WriteFile(path,strings) {  
  var file=fs.OpenTextFile(path,8,-2);
  for(var i=0; i<strings.length; i++) file.WriteLine(strings[i]);
  file.Close();
}
function DeleteFile(filespec) {
  if(fs.FileExists(filespec)) fs.DeleteFile(filespec);
}
function ReadFile(path) {
  var r=[];
  var file=fs.OpenTextFile(path,1,-2); 
  while(!file.AtEndOfStream) r.push(file.ReadLine());
  file.Close();      
  return r;
}
function FileSize(path) {
  return fs.FileExists(path)? fs.GetFile(path).size : 0;
}

function XML2CSV_(file,useHeader) {
  // Load data.
  var source = new ActiveXObject("Msxml2.DOMDocument.3.0");
  source.async = false;
  source.load(file);
  if (source.parseError.errorCode != 0) {
     var myErr = source.parseError;
     WScript.Echo("Error in on line "+myErr.line+":" + myErr.reason);
  } else {
     // Load style sheet.
     var stylesheet = new ActiveXObject("Msxml2.DOMDocument.3.0");
     stylesheet.async = false
     stylesheet.load(useHeader?"xml2csv.xsl":"xml2csvNOHEADER.xsl");
     if (stylesheet.parseError.errorCode != 0) {
        var myErr = stylesheet.parseError;
        WScript.Echo("Error in on line "+myErr.line+":" + myErr.reason);
      } else {
        return source.transformNode(stylesheet);
     }
  }
}

function XML2CSV(file) { return XML2CSV_(file,true); }
function XML2CSVNOHEADER(file) { return XML2CSV_(file,false); }

function getRows(currentpath,basename,table,suffix,start) {
  wsh.Run(currentpath+
    "curl \"https://admin.poslavu.com/cp/reqserv/\" -kvd \""+

    "dataname="+
      ""+ // CHANGE THIS VALUE
    "&key="+
      ""+ // CHANGE THIS VALUE
    "&token="+
      ""+ // CHANGE THIS VALUE
    
    "&table="+
    table+
    "&limit="+
    [start,3000]+
    "\" -o \""+
    basename+
    //(suffix==".tmp"? start: "")+
    suffix+"\"", 1, true);
}

// Binary search to get the row limit.
function getALLRows(currentpath,basename,table) {
  DeleteFile(basename+".tmp");
      
  WScript.Echo("Polling POSLavu API for table '"+table+"'...");
  
  var max=0;
  do {
    if(max && FileSize(basename+".tmp")<=0) break;
    DeleteFile(basename+".tmp");
    DeleteFile(basename+".xml");
    DeleteFile(basename+"_.xml");
    
    // Header
    WriteFile(basename+".xml",[
    '<?xml version="1.0" encoding="ISO-8859-1"?>',
    //'<?xml-stylesheet type="text/xsl" href="xml2csv.xsl"?>',
    '<table>'
    ]);
    
    getRows(currentpath,basename,table,".tmp",max);
    wsh.Run(currentpath+"a.bat \""+basename+".tmp"+"\" \""+basename+".xml\"",6,true);

    // Append data
    WriteFile(basename+".xml",["\n</table>"]);
    // Replace troublesome & symbol.
    wsh.Run(currentpath+"fart \""+basename+".xml\" \"&\" \"&amp;\"",1,true);
    
    WScript.Echo("Converting to CSV and appending...");
    var converter=max==0?XML2CSV:XML2CSVNOHEADER;
    WriteFile(basename+".csv",["\n",converter(basename+".xml")]);
    
    max+=3000;
  } while(1);
  return max;
}

function getTablesAsCSV(table) {
  var currentpath=WScript.ScriptFullName.replace(WScript.ScriptName,"");
  var basename=currentpath+table;

  DeleteFile(basename+".csv");
  DeleteFile(basename+".xml");
  DeleteFile(basename+"_.xml");
  DeleteFile(basename+".tmp");
  
  getALLRows(currentpath,basename,table);
  
  //DeleteFile(basename+".xml");
  //DeleteFile(basename+"_.xml");
  //DeleteFile(basename+".tmp");
  
}

//getTablesAsCSV("menu_groups");
//getTablesAsCSV("menu_categories");
//getTablesAsCSV("menu_items");
//getTablesAsCSV("tables");

getTablesAsCSV("orders");
getTablesAsCSV("order_contents");
getTablesAsCSV("order_payments");
