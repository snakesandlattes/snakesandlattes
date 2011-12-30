/*
Max boardgame object id = 113574.
http://www.boardgamegeek.com/xmlapi/boardgame/113574
Starts from 1. We'll crawl all the entries 10 at a time.
*/

function ProcFile(path)
{
    // Return string, do something with f(line N), add it to the return string.
        var r=[];
    
    // INIT: file system stuff
        var fs=new ActiveXObject("Scripting.FileSystemObject");
        var file=fs.OpenTextFile(path,1,-2);
    
    // READ: each line of le file!
        while(!file.AtEndOfStream) r.push(file.ReadLine());

    // CLEAN: remove .raw files and close text streams
        file.Close();
    
    return r;
}

//xml sel -T -t -m "/boardgames/boardgame[@objectid='12333']" -v "concat(./boardgamecategory[1],',',./boardgamecategory[2],',',./boardgamecategory[3],',',./boardgamecategory[4])" top200.xml

(function(){
  //var base="xml sel -t -v \"/boardgames/boardgame[@objectid=\'__ID__\']/boardgamepublisher\" top200.xml >> TOPpublishers.txt";
  var file="types.txt"
  var base="xml sel -n -T -t -m \"/boardgames/boardgame[@objectid='__ID__']\" -v \"concat(./boardgamemechanic[1],',',./boardgamemechanic[2],',',./boardgamemechanic[3],',',./boardgamemechanic[4])\" top200.xml >>"+file;
  var ID=ProcFile("F:\\boardgamegeek\\toprankedIDs.txt");
  for(var i=0;i<ID.length;i++){
    WScript.Echo(base.replace("__ID__",ID[i]));
    WScript.Echo("echo. >> "+file); // delimiter
  }
})();