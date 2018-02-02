var id = Number(window.location.pathname.slice(1));
var e2 = ace.edit("editor");
var data
var session = e2.getSession();
console.log(session)
    $.post("/setid",session);

window.addEventListener('load', () => {
    let msgbox = document.getElementById('msgs');
    let form = document.getElementById('form');
    let sendMsg = document.getElementById('send-msg');
    let ws = new WebSocket('wss://' + window.location.hostname + window.location.pathname + '/websocket');

    ws.onopen = () => {
        console.log('connection open');
    }
    ws.onclose = () => console.log('connection closed');
    ws.onmessage = m => {
        let li = document.createElement('li');
        li.textContent = m.data;
        msgbox.insertBefore(li, msgbox.firstChild);
    }

    sendMsg.addEventListener('click', () => sendMsg.value = '');

    form.addEventListener('submit', e => {
        ws.send(session[id]);
        sendMsg.value = '';
        e.preventDefault();
    });
});


// 自動補完・(スニペット)・ライブ補完・Emmet有効
e2.$blockScrolling = Infinity;

e2.setOptions({
    selectionStyle: "line",
    enableBasicAutocompletion: true,
    enableSnippets: false,
    enableLiveAutocompletion: true,
    enableEmmet: true
});
// スキンテーマ
e2.setTheme("ace/theme/monokai");

// モード
session[id].setMode("ace/mode/javascript");

// ひとつの文書と文書モードやカーソルなどを管理
session[id].setUseWrapMode(true);
// その他設定
e2.setHighlightActiveLine(true);
e2.setShowInvisibles(false);
e2.setDisplayIndentGuides(true);
e2.renderer.setShowGutter(true);
e2.setHighlightSelectedWord(true);
e2.setBehavioursEnabled(true);
e2.setOption("scrollPastEnd", true);
// Code Folding
session[id].setFoldStyle("markbeginend");

/*
 エディタのフォントサイズ変更
 保存・読み出し
*/
$('#font-size').click(function (e) {
    e2.setFontSize($(e.target).data('size'));
});


// ショートカット
e2.commands.addCommand({
    // 保存
    Name: "savefile",
    bindKey: {
        win: "Ctrl-S",
        mac: "Command-S"
    },
    exec: function () {
        saveExerciseSource();
    }
});