import React from "react";
import style from "./styles/A_ChatItemPreview.module.scss";

const A_ChatItemPreview = () => {
  return (
    <div className={style.previewBox}>
      <p className={style.lastMsg}>
        동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리 나라 만세. 무궁화
        삼천리 화려강산 대한사람 대한으로 길이 보전하세.
      </p>
    </div>
  );
};

export default A_ChatItemPreview;