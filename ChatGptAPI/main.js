/**
 * ChatGptAPIを使って文章を要約する関数
 *
 * @param {string} text - 要約する文章。指定されていない場合はエラーログを出力する。
 * @returns {string} - 要約された文章。
 */
const summarizeTextWithLLM = (text) => {
  // 文章がない場合は処理を中断
  if (!text) {
    Logger.log("ERROR: not found text");
    return;
  }

  // ChatGPTのAPIエンドポイント
  const CHATGPT_API_URL = "https://api.openai.com/v1/chat/completions";
  // APIキー
  const API_KEY = "**********"; // 自分のAPIキーに置き換える

  // HTTPリクエストのオプション
  const options = {
    method: "post",
    contentType: "application/json",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
    payload: JSON.stringify({
      // モデルの種類
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `次の文章を140文字以内で要約してください: ${text}`,
        },
      ],
      // 要約の設定
      temperature: 0.7,
      // 最大トークン数
      max_tokens: 1000,
    }),
    muteHttpExceptions: true, // エラーレスポンスを取得するために追加
  };

  try {
    // APIリクエストを実行
    const response = UrlFetchApp.fetch(CHATGPT_API_URL, options);
    const jsonResponse = JSON.parse(response.getContentText());

    // ログに要約結果を出力
    Logger.log(jsonResponse.choices[0].message.content.trim());
    // 要約結果を取得して返す
    return jsonResponse.choices[0].message.content.trim();
  } catch (error) {
    Logger.log(`ERROR: ${error.message}`);
    return `Error: ${error.message}`;
  }
};
