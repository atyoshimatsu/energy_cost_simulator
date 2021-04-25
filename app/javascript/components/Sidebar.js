import React from "react"
import PropTypes from "prop-types"
class Sidebar extends React.Component {
  render () {
    return (
      <div className="sidebar">
        <div className="sidebar_title">
          <div className="sidebar_title_main">使い方</div>
          <div className="sidebar_title_close">&times;</div>
        </div>
        <div className="sidebar_main">
          <div className="sidebar_main_num">1</div>
          <div className="sidebar_main_contents">
            <p>
              現在の契約情報を入力します。
            </p>
            <p>
              電力会社名を検索窓に入力して候補の中から「選択する」で指定し
              エリア、メニュー、契約容量をプルダウンメニューから選択してください。
            </p>
            <p>
              月毎の電気使用量を半角数字で入力してください。
              使用量はひと月以上入力してください。
            </p>
          </div>
          <div className="sidebar_main_num">2</div>
          <div className="sidebar_main_contents">
            <p>
              比較した電力会社を検索し、「この会社と比較」ボタンで決定してください。
            </p>
          </div>
          <div className="sidebar_main_num">3</div>
          <div className="sidebar_main_contents">
            <p>
              比較対象の料金メニューを選択し、「電気料金を計算する！」ボタンを押すと年間の増減額が表示されます。
              ボタンを押せない場合は１、２の情報を正しく入力し直してください。
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Sidebar
