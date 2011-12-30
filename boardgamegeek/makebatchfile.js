/*
Max boardgame object id = 113574.
http://www.boardgamegeek.com/xmlapi/boardgame/113574
Starts from 1. We'll crawl all the entries 10 at a time.
*/

(function(){
  var wsh = WScript.CreateObject("WScript.Shell")
  var baseurl="http://www.boardgamegeek.com/xmlapi/boardgame/";
  var max=113574;
  //max=21;
  for(var i=1;i<max;i+=10){
    for(var j=0,a=[]; j<10; a.push(i+j++)) {}
    //WScript.Echo('Crawling game ids: '+a);
    //wsh.Run(WScript.Path+"curl "+baseurl+a+" -o 'C:\\boardgamegeek\\"+i+".xml'",0,true);
    WScript.Echo("curl "+baseurl+a+" -# -o "+i+".xml");
    //WScript.Echo('Done crawl!');
  }
})();