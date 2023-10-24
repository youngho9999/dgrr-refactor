package live.dgrr.domain.game.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class GameController {

    private final ApplicationEventPublisher applicationEventPublisher;

    @GetMapping("/game")
    public void test1() {

    }

}
