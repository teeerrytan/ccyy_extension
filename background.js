/**
 * Created by WilliamZhang on 21/07/2014.
 */
{
    function loadXMLDoc()
    {
        var xmlhttp;
        if (window.XMLHttpRequest)
        {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp=new XMLHttpRequest();
        }
        else
        {// code for IE6, IE5
            xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange=function()
        {
            if (xmlhttp.readyState==4 && xmlhttp.status==200)
            {
                document.getElementById("myDiv").innerHTML=xmlhttp.responseText;
            }
        }
        xmlhttp.open("POST","http://10.233.141.96/PhpProject14/index.php",true);
        xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xmlhttp.send("Bill|!Gates");
    }
}

var sum=[];
function click_remove(abc){
    abc.remove();
}
for (i = 0; i <$("input").length; i++){
    $("input")[i].click(function(){$("input")[i].remove();})
}