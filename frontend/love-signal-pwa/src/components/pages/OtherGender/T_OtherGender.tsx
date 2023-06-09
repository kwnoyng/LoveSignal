import { Dispatch, SetStateAction } from "react";
import style from "./styles/ExploreTeam.module.scss";
import { team } from "../../../types/member";
import A_OtherTeamDesc from "../../atoms/OtherGender/A_OtherTeamDesc";
import PictureBox from "../../molecules/OtherGender/M_OtherTeamPicture";
import ListBoxWithImgTitle from "../../atoms/Common/ListBoxWithImgTitle";
import A_Heartline from "../../atoms/Common/A_Heartline";
import { motion } from "framer-motion";
import { contentVariants } from "../../atoms/Common/contentVariants";
import M_NoOtherTeam from "../../molecules/OtherGender/M_NoOtherTeam";

type propsType = {
  getList: () => void;
  infinityScroll: boolean;
  lastList: boolean;
  setInfinityScroll: Dispatch<SetStateAction<boolean>>;
  viewDetail: (idx: number) => void;
  team: team[];
};

const T_OtherGender: React.FC<propsType> = ({
  getList,
  infinityScroll,
  lastList,
  setInfinityScroll,
  viewDetail,
  team,
}) => {
  //무한스크롤이 구현되어있는 함수입니다.
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;

    const isEnd =
      Math.round(target.scrollTop + target.clientHeight) >
      target.scrollHeight - 100;

    if (isEnd && !infinityScroll && lastList) {
      setInfinityScroll(true);
      getList();
    }
  };

  return (
    <div className={style.otherContainer}>
      <A_OtherTeamDesc />
      {team.length !== 0 ? (
        <div className={style.imgContainer} onScroll={handleScroll}>
          {team.map((item, idx) => (
            <ListBoxWithImgTitle
              idx={idx}
              title={
                <>
                  <A_Heartline type="red" count="3" />
                </>
              }
              type="red"
              key={idx}
            >
              <PictureBox viewDetail={viewDetail} idx={idx} team={item} />
            </ListBoxWithImgTitle>
          ))}
        </div>
      ) : (
        <>
          <M_NoOtherTeam />
        </>
      )}
    </div>
  );
};

export default T_OtherGender;
