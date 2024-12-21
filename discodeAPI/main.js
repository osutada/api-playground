/**
 * DiscodAPIを使ってメッセージを投稿する関数
 *
 * @param {string} message - 投稿するメッセージ。指定されていない場合はエラーログを出力する。
 */
const sendDiscodePost = (message) => {
  // メッセージがない場合は処理を中断
  if (!message) {
    Logger.log("ERROR: not found message");
    return;
  }

  const DISCODE_WEBHOOK_URL = "***"; // 自分のWebhook URLに置き換える

  // HTTPリクエストのオプション
  const options = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify({
      content: message, // メッセージをペイロードにセット
    }),
  };

  // APIリクエストを実行
  const response = UrlFetchApp.fetch(DISCODE_WEBHOOK_URL, options);
  // 結果をログに表示
  Logger.log(response.getContentText());
};
