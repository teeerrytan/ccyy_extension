/**
 * Created by 011009995 on 04/08/2014.
 */
var word_array;
function capitaliseFirstLetter(string)
{
    return string.charAt(0).toLowerCase() + string.slice(1);
}

function getElementViewTop(element){
   var actualTop = element.offsetTop;
   var current = element.offsetParent;
while (current !== null){
  actualTop += current. offsetTop;
  current = current.offsetParent;
}
    if (document.compatMode == "BackCompat"){
    var elementScrollTop=document.body.scrollTop;
}
    else {
    var elementScrollTop=document.documentElement.scrollTop;
}
    return actualTop-elementScrollTop;}

function getElementTop(element){
     var actualTop = element.offsetTop;
     var current = element.offsetParent;
     while (current !== null){
     actualTop += current.offsetTop;
     current = current.offsetParent;
}
    return actualTop;
}


(function(){
   console.log("content.js");
  //  chrome.extension.onMessage.addListener(function(request,sender,sendResponse)
    chrome.extension.onMessage.addListener(function(request,sender,sendResponse)
    {
        var hl = new Hilitor_1();
        if(request.message=="words") {
            var obj = document.getElementsByTagName('p');

           // console.log(hl);
            //
            a = [];
            for (i = 0; i < obj.length; i++) {
                var content = obj[i].innerText;
                content = capitaliseFirstLetter(content);
                a.push(content);
            }
          //  console.log(a);
            sendResponse(a);
        }
        else{

            var words_highlight=request.message.toString();
            if(request.greeting=="hello"){
                word_array=request.message;
                hl.apply(words_highlight);
            }
            else{
                var index=word_array.indexOf(request.words);
                if (index > -1) {
                    word_array.splice(index, 1);
                    hl.apply(word_array.toString());
                }
            }
        }
    });

    chrome.runtime.onConnect.addListener(function(request,sender,sendResponse)
{
  // console.log(request);


        var obj = document.getElementsByTagName('p');

      request.postMessage({data: obj[0].innerText});
      a = [];

      for (i = 0; i < obj.length; i++) {
          var content = obj[i].innerText;
          // content = capitaliseFirstLetter(content);
          a.push(getElementTop(obj[i]));
      }
      //console.log(a);
      var l;
      document.addEventListener("mousewheel", function (event) {
          //   var scrheight= document.body.scrollTop;
          //   console.log(scrheight);
          // console.log(event.pageY);
          for (j = 0; j < obj.length; j++) {
              if ((a[j + 1] > event.pageY) && (event.pageY > a[j])) {
                  //    console.log(obj[j].innerText);
                  content = capitaliseFirstLetter(obj[j].innerText);
                  //  console.log(content);
                  request.postMessage({data: content,
                      para: j});
              }
              //   var l=j;
          }
          for (k = 0; k < obj.length; k++) {

              if ((a[k + 1] > event.pageY) && (event.pageY > a[k])) {
                  l = k;
              }
          }

          request.onMessage.addListener(function (msg) {


              var hl = new Hilitor(obj[l]);
             if (msg.hightlight) {
                  //
                  var words_highlight = msg.hightlight.toString();
                  //   if (request.greeting == "hello") {
                  // function abc_1015() {
                  }
                  //  Display.prototype.Dis=request.message;
                  word_array = msg.hightlight;

              //    console.log(l);
                  //   var hl = new Hilitor(obj[k]);
                  hl.apply(words_highlight);

             // }
              if (msg.remove) {
                  console.log(msg.remove);
                  //      console.log(word_array);
                  var index = word_array.indexOf(msg.remove);

                  if (index != -1) {
                      word_array.splice(index, 1);
                      console.log(word_array);
                      hl.apply(word_array.toString());

                  }
              }

          });

      }, false);


});
    /*document.getElementsByTagName('p').addlistener(function(request,sender,sendResponse)
        {
            sendResponse(document.getElementsByTagName('p'));
        }
    );*/
    //     content=content.replace(/\W+/gi,' ');
    //     content=content.replace(/\d+/gi,' ');
    //      content=content.replace(/\s+/gi,' ');
})();


// Original JavaScript code by Chirp Internet: www.chirp.com.au
// Please acknowledge use of this code by including this header.

function Hilitor(id, tag)
{

  // var targetNode = document.getElementById(id) || document.body;
   var targetNode = id;
    var hiliteTag = tag || "EM";
    var skipTags = new RegExp("^(?:" + hiliteTag + "|SCRIPT|FORM|SPAN)$");
    var colors = ["#ff6", "#a0ffff", "#9f9", "#f99", "#f6f","#AB82FF"];
    var wordColor = [];
    var colorIdx = 0;
    var matchRegex = "";
    var openLeft = false;
    var openRight = false;

    this.setMatchType = function(type)
    {
        switch(type)
        {
            case "left":
                this.openLeft = false;
                this.openRight = true;
                break;
            case "right":
                this.openLeft = true;
                this.openRight = false;
                break;
            case "open":
                this.openLeft = this.openRight = true;
                break;
            default:
                this.openLeft = this.openRight = false;
        }
    };

    this.setRegex = function(input)
    {
       input = input.replace(/^[^\w]+|[^\w]+$/g, "").replace(/[^\w'-]+/g, "|");

        var re = "(" + input + ")";
        if(!this.openLeft) re = "\\b" + re;
        if(!this.openRight) re = re + "\\b";
        matchRegex = new RegExp(re, "i");

    };

    this.getRegex = function()
    {
        var retval = matchRegex.toString();
        retval = retval.replace(/(^\/(\\b)?|\(|\)|(\\b)?\/i$)/g, "");
        retval = retval.replace(/\|/g, " ");
        return retval;
    };

    // recursively apply word highlighting
    this.hiliteWords = function(node)
    {
        if(node === undefined || !node) return;
        if(!matchRegex) return;
        if(skipTags.test(node.nodeName)) return;

        if(node.hasChildNodes()) {
            for(var i=0; i < node.childNodes.length; i++)
                this.hiliteWords(node.childNodes[i]);
        }
        if(node.nodeType == 3) { // NODE_TEXT
            if((nv = node.nodeValue) && (regs = matchRegex.exec(nv))) {
                if(!wordColor[regs[0].toLowerCase()]) {
                    wordColor[regs[0].toLowerCase()] = colors[colorIdx++ % colors.length];
                }

                var match = document.createElement(hiliteTag);
                match.appendChild(document.createTextNode(regs[0]));
                match.style.backgroundColor = wordColor[regs[0].toLowerCase()];
                match.style.fontStyle = "inherit";
                match.style.color = "#000";

                var after = node.splitText(regs.index);
                after.nodeValue = after.nodeValue.substring(regs[0].length);
                node.parentNode.insertBefore(match, after);
            }
        };
    };

    // remove highlighting
    this.remove1 = function()
    {
        var arr = document.getElementsByTagName(hiliteTag);
        while(arr.length && (el = arr[0])) {
            var parent = el.parentNode;
            parent.replaceChild(el.firstChild, el);
            parent.normalize();
        }
    };

    // start highlighting at target node
    this.apply = function(input)
    {
        this.remove1();
        if(input === undefined || !input) return;
        this.setRegex(input);
        this.hiliteWords(targetNode);
    };

}

function Hilitor_1(id, tag)
{

    var targetNode = document.getElementById(id) || document.body;
    var hiliteTag = tag || "EM";
    var skipTags = new RegExp("^(?:" + hiliteTag + "|SCRIPT|FORM|SPAN)$");
    var colors = ["#ff6", "#a0ffff", "#9f9", "#f99", "#f6f"];
    var wordColor = [];
    var colorIdx = 0;
    var matchRegex = "";
    var openLeft = false;
    var openRight = false;

    this.setMatchType = function(type)
    {
        switch(type)
        {
            case "left":
                this.openLeft = false;
                this.openRight = true;
                break;
            case "right":
                this.openLeft = true;
                this.openRight = false;
                break;
            case "open":
                this.openLeft = this.openRight = true;
                break;
            default:
                this.openLeft = this.openRight = false;
        }
    };


    this.setRegex = function(input)
    {
        input = input.replace(/^[^\w]+|[^\w]+$/g, "").replace(/[^\w'-]+/g, "|");
        var re = "(" + input + ")";
        if(!this.openLeft) re = "\\b" + re;
        if(!this.openRight) re = re + "\\b";
        matchRegex = new RegExp(re, "i");
        console.log(input);
    };

    this.getRegex = function()
    {
        var retval = matchRegex.toString();
        retval = retval.replace(/(^\/(\\b)?|\(|\)|(\\b)?\/i$)/g, "");
        retval = retval.replace(/\|/g, " ");
        return retval;
    };

    // recursively apply word highlighting
    this.hiliteWords = function(node)
    {
        if(node === undefined || !node) return;
        if(!matchRegex) return;
        if(skipTags.test(node.nodeName)) return;

        if(node.hasChildNodes()) {
            for(var i=0; i < node.childNodes.length; i++)
                this.hiliteWords(node.childNodes[i]);
        }
        if(node.nodeType == 3) { // NODE_TEXT
            if((nv = node.nodeValue) && (regs = matchRegex.exec(nv))) {
                if(!wordColor[regs[0].toLowerCase()]) {
                    wordColor[regs[0].toLowerCase()] = colors[colorIdx++ % colors.length];
                }

                var match = document.createElement(hiliteTag);
                match.appendChild(document.createTextNode(regs[0]));
                match.style.backgroundColor = wordColor[regs[0].toLowerCase()];
                match.style.fontStyle = "inherit";
                match.style.color = "#000";

                var after = node.splitText(regs.index);
                after.nodeValue = after.nodeValue.substring(regs[0].length);
                node.parentNode.insertBefore(match, after);
            }
        };
    };

    // remove highlighting
    this.remove = function()
    {
        var arr = document.getElementsByTagName(hiliteTag);
        while(arr.length && (el = arr[0])) {
            var parent = el.parentNode;
            parent.replaceChild(el.firstChild, el);
            parent.normalize();
        }
    };

    // start highlighting at target node
    this.apply = function(input)
    {
        this.remove();
        if(input === undefined || !input) return;
        this.setRegex(input);
        this.hiliteWords(targetNode);
    };

}