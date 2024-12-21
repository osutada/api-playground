/**
 * ChatWork APIを使ってメッセージを投稿する関数
 * https://developer.chatwork.com/docs/endpoints
 *
 * @param {string} message - 投稿するメッセージ。指定されていない場合はエラーログを出力する。
 */
const sendChatWorkPost = (message) => {
  // メッセージがない場合は処理を中断
  if (!message) {
    Logger.log("ERROR: not found message");
    return;
  }

  const CHATWORK_API_TOKEN = "***"; // 自分のAPIトークンに置き換える
  const CHATWORK_ROOM_ID = "***"; // 自分のルームIDに置き換える
  // エンドポイント
  const MESSAGE_POST_ENDPOINT = `https://api.chatwork.com/v2/rooms/${CHATWORK_ROOM_ID}/messages`;

  // HTTPリクエストのオプション
  const options = {
    method: "post",
    headers: {
      "X-ChatWorkToken": CHATWORK_API_TOKEN, // ヘッダーにAPIトークンをセット
    },
    payload: {
      body: message, // メッセージをペイロードにセット
    },
  };

  // APIリクエストを実行
  const response = UrlFetchApp.fetch(MESSAGE_POST_ENDPOINT, options);
  // 結果をログに表示
  Logger.log(response.getContentText());
};
