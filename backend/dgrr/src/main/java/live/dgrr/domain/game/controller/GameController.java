package live.dgrr.domain.game.controller;

import live.dgrr.domain.game.GameStartDto;
import live.dgrr.domain.game.service.GameFirstRoundService;
import live.dgrr.domain.watingroom.entity.GameStartEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class GameController {

    private final GameFirstRoundService gameFirstRoundService;
    private final SimpMessagingTemplate template;

    private static final String GAME_START_DEST = "/recv/game-start";
    private static final String FIRST_ROUND_START = "/recv/firstroundstart";
    @EventListener
    public void gameStart(GameStartEvent gameStartEvent) {
        List<GameStartDto> gameStartDtos = gameFirstRoundService.gameStart(gameStartEvent.memberOneId(), gameStartEvent.memberTwoId());

        template.convertAndSendToUser(gameStartDtos.get(0).myInfo().memberId(),GAME_START_DEST,gameStartDtos.get(0));
        template.convertAndSendToUser(gameStartDtos.get(1).myInfo().memberId(),GAME_START_DEST,gameStartDtos.get(1));
    }

    @MessageMapping("/firstroundstart")
    public void firstRoundStart(@Payload String gameRoomId) {
        List<String> memberIds = gameFirstRoundService.firstRoundStart(gameRoomId);

        template.convertAndSendToUser(memberIds.get(0), FIRST_ROUND_START, "START");
        template.convertAndSendToUser(memberIds.get(1), FIRST_ROUND_START, "START");
    }
}
