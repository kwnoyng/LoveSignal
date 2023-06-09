import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { footerIdx } from "../../../atom/footer";
import { footerIsOn } from "../../../atom/footer";
import { useRecoilState } from "recoil";
import style from "./styles/Footer.module.scss";
import A_FooterIcon from "../../atoms/Footer/A_FooterIcon";

const Footer = () => {
  const navigate = useNavigate();

  const [idx, setIdx] = useRecoilState<number>(footerIdx);
  const [isOn, setFooterIsOn] = useRecoilState<boolean>(footerIsOn);

  const [color, setColor] = useState<string[]>([
    "black",
    "black",
    "black",
    "black",
  ]);

  let [, setClickNav] = useState<boolean[]>([false, false, false, false]);

  useEffect(() => {
    setClickNav(falseArr.map((_, index) => index === idx));
    setColor(color.map((_, index) => (index === idx ? "color" : "black")));

    if (idx !== 2) {
      setFooterIsOn(true);
    }
  }, [idx]);

  const falseArr = [false, false, false, false];
  const setNav = (id: number, path: string) => {
    setClickNav(falseArr.map((_, index) => index === id));
    setColor(color.map((_, index) => (index === id ? "color" : "black")));
    navigate(path);
  };

  const isClickNav = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLImageElement;
    const navid: number = +target.id;
    if (idx === navid) return;
    setIdx(navid);

    if (navid === 0) {
      setNav(0, "/OtherGender");
    } else if (navid === 1) {
      setNav(1, "/SameGender");
    } else if (navid === 2) {
      setNav(2, "/Chat");
    } else if (navid === 3) {
      setNav(3, "/Mypage");
    }
  };

  return (
    <div className={`${style.container} ${!isOn ? style.closed : ""}`}>
      <div className={style.content}>
        <A_FooterIcon
          idx="0"
          color={color[0]}
          address="othergender"
          isClickNav={isClickNav}
          size="1"
        />
        <A_FooterIcon
          idx="1"
          color={color[1]}
          address="group"
          isClickNav={isClickNav}
          size="1"
        />
        <A_FooterIcon
          idx="2"
          color={color[2]}
          address="chat"
          isClickNav={isClickNav}
          size="2"
        />
        <A_FooterIcon
          idx="3"
          color={color[3]}
          address="mypage"
          isClickNav={isClickNav}
          size="2"
        />
      </div>
    </div>
  );
};

export default Footer;
