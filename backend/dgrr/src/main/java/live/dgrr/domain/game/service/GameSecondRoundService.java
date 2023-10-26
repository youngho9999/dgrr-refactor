package live.dgrr.domain.game.service;

import live.dgrr.domain.game.entity.GameRoom;
import live.dgrr.domain.game.repository.GameRoomRepository;
import live.dgrr.global.exception.ErrorCode;
import live.dgrr.global.exception.GameException;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GameSecondRoundService {

    private final GameRoomRepository gameRoomRepository;
    private final ApplicationEventPublisher applicationEventPublisher;

    /**
     * 2라운드 준비 신호
     * @param gameRoomId
     */
    public void prepareSecondRoundStart(String gameRoomId) {
        GameRoom gameRoom = gameRoomRepository.findById(gameRoomId).orElseThrow(() -> new GameException(ErrorCode.GAME_ROOM_NOT_FOUND));
        int prepareCounter = gameRoom.secondRoundPrepare();
        gameRoomRepository.save(gameRoom);

        //todo: 동시성 이슈 처리 필요
        //둘 모두 준비되었을때만 시작
        if(prepareCounter == 2) {
            secondRoundStart(gameRoomId, gameRoom);
        }
    }

    private void secondRoundStart(String gameRoomId, GameRoom gameRoom) {

    }
}
