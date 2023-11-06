interface GameStateInfo {
  when: 'START' | 'ROUND' | 'END';
  gameState?: 'ATTACK' | 'DEFENSE';
  roundResult?: 'NO_LAUGH' | 'LAUGH';
}

export const GameStateModal = ({ when, gameState, roundResult }: GameStateInfo) => {
  return (
    <div className="z-10 bg-black/30 w-full h-full max-w-[500px] fixed top-0 flex justify-center items-center">
      <div className="w-4/5 h-1/2 max-h-[600px] overflow-scroll bg-white rounded-lg border-2 border-black px-4 pb-4 overflow-x-hidden">
        {when === 'START' ? (
          <h1>게임 시작할 때</h1>
        ) : when === 'ROUND' ? (
          <h1>2라운드 넘어갈 때</h1>
        ) : (
          <h1>게임 끝났을 때</h1>
        )}
      </div>
    </div>
  );
};
