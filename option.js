/**
 * Created by 011009995 on 09/10/2014.
 */

// Saves options to chrome.storage.sync.
function save_options() {
    var upper=document.getElementById('upper').checked;
    console.log(upper);
    var para=document.getElementById('para').checked;
    chrome.storage.sync.set({
            upper_setting:upper,
            para_setting:para

    },function(){
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });
}
document.getElementById('save').addEventListener('click',
    save_options);

chrome.storage.sync.get("upper_setting", function (upp) {
    console.log(upp);
});