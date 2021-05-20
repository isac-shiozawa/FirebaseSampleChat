class room {
  constructor() { /* コンストラクタ */
    // キー生成
    var l = 10;
    var c = "abcdefghijklmnopqrstuvwxyz0123456789";
    this.name = "";
    for(var i=0; i<l; i++){
      this.name += c[Math.floor(Math.random()*c.length)];
    }
  }
  calc() {  /* メソッド */
  }
}
class user {
  constructor() { /* コンストラクタ */
  }
  calc() {  /* メソッド */
  }
}
class message {
  room_id;
  user_id;
  mssage;
  constructor(id, uid, mess){
  	this.room_id = id;
  	this.user_id = uid;
  	this.message = mess;
  }
}