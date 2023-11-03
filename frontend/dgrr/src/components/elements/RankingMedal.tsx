interface RankingMedalProps {
  ranking: number;
}

const RankingMedal = ({ranking}: RankingMedalProps) => {
  <div>
    {ranking === 1 ? (
      <div></div>
    ) : null}
  </div>
}

export default RankingMedal;