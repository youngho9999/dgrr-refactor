package live.dgrr.domain.game.controller;

import live.dgrr.domain.watingroom.entity.GameStartEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class GameController {

    private final ApplicationEventPublisher applicationEventPublisher;

    @MessageMapping("/game")
    public void test1() {
        applicationEventPublisher.publishEvent(new GameStartEvent("oneId","twoId"));
    }

}
