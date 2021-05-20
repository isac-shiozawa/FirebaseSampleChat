var CHAT = CHAT || {};
let TABLE_NAME = 'talks'

CHAT.fire = {
  init:function(firebase){
    this.setParameters(firebase);
    this.bindEvent();
  },

  setParameters:function(firebase){
    this.$name = $('#jsi-name');
    this.$textArea = $('#jsi-msg');
    this.$board = $('#jsi-board');
    this.$button = $('#jsi-button');

    //データベースと接続する。各自登録時に出たコードに書き換え。
    this.database = firebase;
  },

  bindEvent:function(){
    var self = this;
    this.$button.on('click',function(){
      self.sendMsg();
    });

    //DBの「talks」から取り出す
		this.database.database().ref(TABLE_NAME).get().then(function(snapshot) {
		  if (snapshot.exists()) {
		//    console.log(snapshot.val());
		    var json = snapshot.val();
		    self.addText(json['user']);
		    self.addText(json['message']);
		    self.addText(json['date']);
		  }
		  else {
		    console.log("No data available");
		  }
		}).catch(function(error) {
		  console.error(error);
		});
  },

  //ユーザー、メッセージ送信
  sendMsg:function(){
    var self = this;
    if (this.$textArea.val() == ''){ return }

    var name = this.$name.val();
    var text = this.$textArea.val();

    //データベースの中の TABLE_NAME に値を送り格納
    self.database.database().ref(TABLE_NAME).set({user:name, message:text, date:getDateString()});
    self.$textArea.val('');
  },

  //受け取り後の処理
  addText:function(json){
   var msgDom = $('<li>');
   msgDom.html(json);
   this.$board.append(msgDom[0]);
  }
}

$(function(){
  //CHAT.fire.init();
});
function getDateString() {
      var date = new Date();

      var year_str = date.getFullYear();
      var month_str = date.getMonth();
      var day_str = date.getDate();
      var hour_str = date.getHours();
      var minute_str = date.getMinutes();
      var second_str = date.getSeconds();

      month_str = ('0' + month_str).slice(-2);
      day_str = ('0' + day_str).slice(-2);
      hour_str = ('0' + hour_str).slice(-2);
      minute_str = ('0' + minute_str).slice(-2);
      second_str = ('0' + second_str).slice(-2);

      format_str = 'YYYY-MM-DD hh:mm:ss';
      format_str = format_str.replace(/YYYY/g, year_str);
      format_str = format_str.replace(/MM/g, month_str);
      format_str = format_str.replace(/DD/g, day_str);
      format_str = format_str.replace(/hh/g, hour_str);
      format_str = format_str.replace(/mm/g, minute_str);
      format_str = format_str.replace(/ss/g, second_str);
   return format_str;
}