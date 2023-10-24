package live.dgrr.domain.game.service;

import live.dgrr.domain.game.entity.GameMember;
import live.dgrr.domain.game.entity.GameRoom;
import live.dgrr.domain.game.entity.GameStatus;
import live.dgrr.domain.game.repository.GameRoomRepository;
import live.dgrr.domain.member.service.MemberService;
import live.dgrr.domain.openvidu.OpenviduService;
import live.dgrr.domain.watingroom.entity.GameStartEvent;
import live.dgrr.global.entity.Rank;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class GameFirstRoundService {

    private final MemberService memberService;
    private final OpenviduService openviduService;
    private final GameRoomRepository gameRoomRepository;
    @EventListener
    public void gameStart(GameStartEvent gameStartEvent) {
        GameMember memberOne = new GameMember(gameStartEvent.memberOneId(), " ", "descript1", 1400, Rank.BRONZE);
        GameMember memberTwo = new GameMember(gameStartEvent.memberTwoId(), " ", "descript2", 1400, Rank.GOLD);

        //게임 ID 생성
        String gameRoomId = UUID.randomUUID().toString();

        //오픈비두 세션 생성, 토큰 생성
        String openviduSessionId = openviduService.createSession(gameRoomId);
        String openviduTokenOne = openviduService.createConnection(openviduSessionId);
        String openviduTokenTwo = openviduService.createConnection(openviduSessionId);

        //Redis 에 게임 객체 저장
        GameRoom gameRoom = new GameRoom(gameRoomId, memberOne, memberTwo, GameStatus.BEFORE_START);
        gameRoomRepository.save(gameRoom);
    }
}
