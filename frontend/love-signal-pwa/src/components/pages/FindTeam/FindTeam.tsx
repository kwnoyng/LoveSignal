import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { footerIdx } from "../../../atom/footer";
import style from "./styles/FindTeam.module.scss";
import T_FindTeam from "../../templates/FindTeam/T_FindTeam";
import M_FindTeamDesc from "../../molecules/FindTeam/M_FindTeamDesc";
import O_FindTeamMenu from "../../organisms/FindTeam/O_FindTeamMenu";
import TeamBuildFilter from "../../Filter/TeamBuildFilter";
import { motion } from "framer-motion";
import { contentVariants } from "../../atoms/Common/contentVariants";

const FindTeam = () => {
  const [, setIdx] = useRecoilState<number>(footerIdx);
  useEffect(() => {
    setIdx(1);
  }, []);

  return (
    <TeamBuildFilter>
      <motion.div
        variants={contentVariants}
        initial="hidden"
        animate="visible"
        // exit="exit"
        className={`${style.container}`}
      >
        <T_FindTeam>
          <M_FindTeamDesc />
          <O_FindTeamMenu />
        </T_FindTeam>
      </motion.div>
    </TeamBuildFilter>
  );
};

export default FindTeam;
