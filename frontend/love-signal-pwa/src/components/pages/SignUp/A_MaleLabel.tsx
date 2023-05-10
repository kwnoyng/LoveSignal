import style from "./styles/GenderLabel.module.scss";

type propstType = {
  gender: string;
  changeGender: (e: React.MouseEvent<HTMLElement>) => void;
};

const A_MaleLabel: React.FC<propstType> = ({ gender, changeGender }) => {
  return (
    <div className={style.container}>
      <label className={style.selectGender}>
        <input
          type="radio"
          name="M"
          value="M"
          checked={gender === "M"}
          onClick={changeGender}
          className={style.radio}
        />
        <img src="/assets/male.png" id="M" className={style.genderImg} />
      </label>
    </div>
  );
};

export default A_MaleLabel;