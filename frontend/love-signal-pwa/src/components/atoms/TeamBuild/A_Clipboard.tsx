import { useRecoilState } from "recoil";
import { myTeamUUID } from "../../../atom/member";
import copy from "clipboard-copy";
import style from "./styles/A_Clipboard.module.scss";
import { motion } from "framer-motion";

const A_Clipboard = () => {
  const [teamUUID] = useRecoilState<string>(myTeamUUID);

  const copyToClipboard = (text: string) => {
    copy(text)
      .then(() => {
        console.log("텍스트 복사 완료");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCopyClick = () => {
    copyToClipboard(teamUUID);
  };

  return (
    <motion.div
      whileTap={{
        scale: 1.2,
        transition: { type: "spring", stiffness: 200, damping: 10 },
      }}
      className={style.container}
    >
      <img src="/assets/Team_Key.png" onClick={handleCopyClick} />
    </motion.div>
  );
};

export default A_Clipboard;