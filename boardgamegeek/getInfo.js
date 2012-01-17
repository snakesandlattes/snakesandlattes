// Make sure cscript is the default interpreter.

function WriteFile(path,strings) {
  var fs=new ActiveXObject("Scripting.FileSystemObject");
  var file=fs.OpenTextFile(path,8,-2);
  for(var i=0; i<strings.length; i++) file.WriteLine(strings[i]);
  file.Close();
}

function ReadFile(path) {
  var r=[];
  var fs=new ActiveXObject("Scripting.FileSystemObject");
  var file=fs.OpenTextFile(path,1,-2); 
  while(!file.AtEndOfStream) r.push(file.ReadLine());
  file.Close();      
  return r;
}

// Proceed with ze masterplan
(function(){

  var wsh=WScript.CreateObject("WScript.Shell");
  var files=[
                     //xml = xmlstar commandline query tool
//  ["names.txt",       "xml sel -n -T -t -m \"/boardgames/boardgame[@objectid='__ID__'][1]\" -v \"./name[@primary='true']\""],
//  ["images.txt",      "xml sel -n -T -t -m \"/boardgames/boardgame[@objectid='__ID__'][1]\" -v \"./image[1]\""],
//  ["types.txt",       "xml sel -n -T -t -m \"/boardgames/boardgame[@objectid='__ID__'][1]\" -v \"concat(./boardgamemechanic[1],',',./boardgamemechanic[2],',',./boardgamemechanic[3],',',./boardgamemechanic[4])\""],
//  ["descriptions.txt","xml sel -n -T -t -m \"/boardgames/boardgame[@objectid='__ID__'][1]\" -v \"./description[1]\""],
  ["age.txt",         "xml sel -n -T -t -m \"/boardgames/boardgame[@objectid='__ID__'][1]\" -v \"./age[1]\""],
  ["minplayers.txt",  "xml sel -n -T -t -m \"/boardgames/boardgame[@objectid='__ID__'][1]\" -v \"./minplayers[1]\""],
  ["maxplayers.txt",  "xml sel -n -T -t -m \"/boardgames/boardgame[@objectid='__ID__'][1]\" -v \"./maxplayers[1]\""],
  ["playingtime.txt", "xml sel -n -T -t -m \"/boardgames/boardgame[@objectid='__ID__'][1]\" -v \"./playingtime[1]\""],
  ["designer.txt",    "xml sel -n -T -t -m \"/boardgames/boardgame[@objectid='__ID__'][1]\" -v \"./boardgamedesigner[1]\""]
  
//  ["categories.txt",  "xml sel -n -T -t -m \"/boardgames/boardgame[@objectid='__ID__'][1]\" -v \"concat(./boardgamecategory[1],',',./boardgamecategory[2],',',./boardgamecategory[3],',',./boardgamecategory[4])\""]
  ];

  var dbfile="inventoryBGG";
  var currentpath=WScript.ScriptFullName.replace(WScript.ScriptName,"");
  var ID=ReadFile(currentpath+"IDs.txt");

  // Build the boardgame database
  var bigbatchfile=[];  
  for(var i=0;i<ID.length;i++)
    if(!isNaN(parseInt(ID[i])))
      bigbatchfile.push("curl http://www.boardgamegeek.com/xmlapi/boardgame/"+ID[i]+" >> "+dbfile);
  
  bigbatchfile.push("fart --c-style "+dbfile+" \"</boardgames><boardgames termsofuse=\\\"http://boardgamegeek.com/xmlapi/termsofuse\\\">\" \" \"");
  WriteFile(currentpath+"xml\\crawlInfo.bat",bigbatchfile);
  
  var bigbatchfile=[];  
  for(var i=0;i<files.length;i++) {
    var outfile=files[i][0];    
    var command=files[i][1]+" "+dbfile+" >> "+outfile;
    for(var j=0;j<ID.length;j++)  {
      if(!isNaN(ID[j]))
        bigbatchfile.push(command.replace("__ID__",ID[j]));
      bigbatchfile.push("echo. >> "+outfile);
    }
  }
  
  WriteFile(currentpath+"xml\\getInfo.bat",bigbatchfile);
  
})();