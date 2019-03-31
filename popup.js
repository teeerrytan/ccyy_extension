



var xmlhttp=new XMLHttpRequest();
var request= new XMLHttpRequest();
var request_2=new XMLHttpRequest();
//url=window.location.href;


//def函数的用途是在接收到后台返回的用户不认识的单词，将单词变成按钮的形式在popup.html展示出来
function def(abc,ghi,jkl,rst,uvw) {
    abc.addEventListener('dblclick', function () {
        abc.remove();
        mno={
            data:ghi,
            user:jkl
        }
            //console.log(opq);
            rst.postMessage({remove:ghi});
            console.log(ghi);
        request.open("POST", "http://1.vocabulary1234.applinzi.com/vocabulary1234/1/PhpProject15/new.php", true);
        request.setRequestHeader("Content-type", "application/json");
        request.send(JSON.stringify(mno));
        console.log(mno);
    }
       ,false)

    abc.addEventListener('click',function(){
      //  console.log(uvw);
        uvw.load();
        uvw.pause();
        uvw.play();

   //    uvw.stop();
   //uvw.src=uvw.src;
    })
}

//def函数的用途是在接收到后台返回的用户不认识的单词，将单词变成按钮的形式在popup.html展示出来
function def_2(abc,ghi,jkl,opq,rst) {
    abc.addEventListener('dblclick', function () {
        abc.remove();
        mno={
            data:ghi,
            user:jkl
        }
        chrome.tabs.sendMessage(opq,{message:'remove',words:ghi,greeting:'again'},function(response_2){})
        request.open("POST", "http://1.vocabulary1234.applinzi.com/vocabulary1234/1/PhpProject15/new.php", true);
        request.setRequestHeader("Content-type", "application/json");
        request.send(JSON.stringify(mno));
        console.log(mno);
    },false)

    abc.addEventListener('click', function (){

        rst.load();
        rst.pause();
        rst.play();

    //  rst.stop();

    })
}



/*
   xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            document.getElementById("demo").innerHTML = xmlhttp.responseText;
        }
       for (i = 0; i <$("input").length; i++){
           def($("input")[i]);
       }
    }
*/

function astb2r(buf) {
    return String.fromCharCode.apply(null, new Uint16Array(buf));
}
//页面中有单词用户不认识但是又没识别出来，可以用search功能，去查找，查找的同时发送到后台，从用户认识的单词中删除
function search(def){

    mno={
        data:document.getElementById("search_word").value,
        user:def
    }
    console.log(mno);
    request_2.open("POST", "http://1.vocabulary1234.applinzi.com/vocabulary1234/1/PhpProject15/search.php", true);
    request_2.setRequestHeader("Content-type", "application/json");
    request_2.send(JSON.stringify(mno));
    request_2.onreadystatechange = function () {
        if (request_2.readyState == 4 && request_2.status == 200) {
            document.getElementById("search_rec").innerHTML = request_2.responseText;
            console.log(request_2.responseText);
        }}}


   chrome.tabs.query({
            'active': true,
            'currentWindow': true
        },
        function (tabs) {
            chrome.cookies.get({"url": "http://1.vocabulary1234.applinzi.com/vocabulary1234/1/PhpProject15/signup.php", "name": "username"}, function(username) {
             if(username){

                document.getElementById("search_btn").addEventListener('click',function(){
                    search(username.value);
})
                 document.getElementById("search_word").addEventListener('keypress',function(e){
                     // console.log("aaa");
                     var key = e.which || e.keyCode;
                     if(key==13){
                         search(username.value);
                     }

                 })


                 chrome.storage.sync.get("para_setting", function (para) {
                   //  console.log(para.para_setting);
                     if (para.para_setting) {
                         var port = chrome.tabs.connect(tabs[0].id, {name: "words"});
                         //  console.log("a");
                         port.onMessage.addListener(function (response) {


                             xmlhttp.open("POST", "http://1.vocabulary1234.applinzi.com/vocabulary1234/1/PhpProject15/index_test.php", true);
                             xmlhttp.setRequestHeader("Content-type", "application/json");
                             xmlhttp.onreadystatechange = function () {
                                 if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                                     document.getElementById("demo").innerHTML = xmlhttp.responseText;
                                     //  console.log(xmlhttp.responseText);
                                 }
                                 c = [];
                                 for (i = 1; i < $("button").length; i++) {
                                     c.push($("button")[i].value);
                                     def($("button")[i], $("button")[i].id, username.value, port, $("audio")[i]);
                                 }
                                  // console.log(c);
                                 if (c) {
                                     port.postMessage({hightlight: c});
                                 }

                             }
                             //   console.log(username.value);
                             //console.log(response.data);
                             chrome.storage.sync.get("upper_setting", function (upp) {
                                 //console.log(upp);

                                 msg = {
                                     data: response.data,
                                     user: username.value,
                                     url: tabs[0].id,
                                     upper: upp.upper_setting,
                                     para:para.para_setting
                                 }
                               //  console.log(msg);
                                 xmlhttp.send(JSON.stringify(msg));

                             });
                         });
                     }
                     else {
                         chrome.tabs.sendMessage(tabs[0].id,{message:"words"},function(response){

                                 xmlhttp.open("POST", "http://1.vocabulary1234.applinzi.com/vocabulary1234/1/PhpProject15/index_test.php", true);
                                 xmlhttp.setRequestHeader("Content-type", "application/json");
                                 xmlhttp.onreadystatechange = function () {
                                     if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                                         document.getElementById("demo").innerHTML = xmlhttp.responseText;
                                     }
                                     c=[];
                                     for (i = 1; i <$("button").length; i++){
                                         c.push($("button")[i].value);
                                         //  console.log(c);
                                         def_2($("button")[i],$("button")[i].id,username.value,tabs[0].id,$("audio")[i]);
                                     }
                                       console.log(c);
                                     chrome.tabs.sendMessage(tabs[0].id,{message:c,greeting:'hello'},function(response_1){})
                                 }
                                 //  console.log(username.value);
                             chrome.storage.sync.get("upper_setting", function (upp) {
                                 msg={
                                     data:response,
                                     user:username.value,
                                     url:tabs[0].id,
                                     upper: upp.upper_setting,
                                     para:para.para_setting
                                 }
                                 console.log(msg);
                                 xmlhttp.send(JSON.stringify(msg));
                             });

                         });
                     }
                 });
               document.getElementById('bookmark').addEventListener("click",function(){
                   bookmark_content={
                       url:tabs[0].url,
                       user:username.value
                   }

                   request.open("POST", "http://1.vocabulary1234.applinzi.com/vocabulary1234/1/PhpProject15/bookmark.php", true);
                 request.setRequestHeader("Content-type", "application/json");
                 request.send(JSON.stringify(bookmark_content));
                 console.log(bookmark_content);

             });

                 }
                else
             {
                 chrome.tabs.create({"url":"http://1.vocabulary1234.applinzi.com/vocabulary1234/1/PhpProject15/login.php"},function(tab){
                 })
             }
            });


                }
       //    });

    );







