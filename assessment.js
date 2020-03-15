'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

// https://publish.twitter.com/# ←Twitterボタン作成サイト

/**
* 指定した要素の子どもを全て削除する
* @param {HTMLElement} element HTMLの要素
*/

function removeALLChildren(element) {
  while (element.firstChild)
  {
    // 子どもの要素があるかぎり削除
    element.removeChild(element.firstChild);
  }
}

// assessmentButton.onclick = function ()
// {
//   console.log('ボタンが押されました。');
// };

assessmentButton.onclick = () => {
  const userName = userNameInput.value;
  if (userName.length === 0)
  {
    // 名前が空の時は処理を終了する
    return;
  }

  userNameInput.onkeydown = (event) => {
    if (event.key === 'Enter') {
      //TODO ボタンのonclick() 処理を呼び出す
      assessmentButton.onclick();
    }
  };

  // console.log(userName);

  // 診断表示エリアの作成
  removeALLChildren(resultDivided);
  const header = document.createElement('h3');
  header.innerText = '診断結果';
  resultDivided.appendChild(header);

  // while (resultDivided.firstChild)
  // {
  //   // 子どもの要素があるかぎり削除
  //   resultDivided.removeChild(resultDivided.firstChild);
  // }
  const paragraph = document.createElement('p');
  const result = assessment(userName);
  paragraph.innerText = result;
  resultDivided.appendChild(paragraph);

  // TODO ツイートエリアの作成
  removeALLChildren(tweetDivided);
  const anchor = document.createElement('a');
  const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag=' + encodeURIComponent('あなたのいいところ') + '&ref_src=twsrc%5Etfw'

  anchor.setAttribute('href', hrefValue);
  anchor.className = 'twitter-hashtag-button';
  anchor.setAttribute('data-text', result);
  anchor.innerText = 'Tweet #あなたのいいところ';

  tweetDivided.appendChild(anchor);

  const script = document.createElement('script');
  script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
  tweetDivided.appendChild(script);

  // <a href="https://twitter.com/intent/tweet?button_hashtag=あなたのいいところ&ref_src=twsrc%5Etfw" class="twitter-hashtag-button" data-text="診断結果の文章" data-show-count="false">Tweet #あなたのいいところ</a>
  // <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
};

const answers = [
  '{userName}のいいところは声です。',
  '{userName}のいいところはまなざしです。',
  '{userName}のいいところは情熱です。',
  '{userName}のいいところは厳しさです。',
  '{userName}のいいところは知識です。',
  '{userName}のいいところはユニークさです。',
  '{userName}のいいところは用心深さです。',
  '{userName}のいいところは見た目です。',
  '{userName}のいいところは決断力です。',
  '{userName}のいいところは思いやりです。',
  '{userName}のいいところは感受性です。',
  '{userName}のいいところは節度です。',
  '{userName}のいいところは好奇心です。',
  '{userName}のいいところは気配りです。',
  '{userName}のいいところはその全てです。',
  '{userName}のいいところは自制心です。',
];
/**
 *名前の文字列を渡すと診断結果を返す関数
 *@param {string} username ユーザーの名前
 *@return {string} 診断結果
 */
function assessment(userName) {
  // TODO診断結果を実装する
  return '';
}

function assessment(userName) {
  //全文字のコード番号を取得してそれを足し合わせる
  let sumOfCharCode = 0;
  for (let i = 0; i < userName.length; i++) {
    sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
  }

  //文字のコード番号の合計を回答の数で割って添字の数値を求める
  const index = sumOfCharCode % answers.length;
  let result = answers[index];

  result = result.replace(/\{userName\}/g, userName);
  return result;
}

// console.log(assessment('太郎'));
// console.log(assessment('次郎'));
// console.log(assessment('太郎'));

console.assert(
  assessment('太郎') === '{userName}のいいところは決断力です。', '診断結果の文言の特定の部分を名前に書き換える処理が正しくありません。'
);

console.assert(
  assessment('太郎') === '{userName}のいいところは決断力です。', '診断結果の文言の特定の部分を入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
);
