/*
Creates all the necessary batch files for extracting data from the 
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


function getXML(){
  var baseurl="http://www.boardgamegeek.com/xmlapi/boardgame/";
  var ID=ProcFile("toprankedIDs.txt");
  for(var i=0;i<ID.length;i++){
    if(isNaN(parseInt(ID[i]))) continue;
    WScript.Echo("curl "+baseurl+ID[i]+" -# -o "+ID[i]+".xml");
  }
}

