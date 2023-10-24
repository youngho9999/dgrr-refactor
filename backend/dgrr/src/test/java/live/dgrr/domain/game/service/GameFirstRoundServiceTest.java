package live.dgrr.domain.game.service;

import live.dgrr.domain.game.entity.GameStartEvent;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class GameFirstRoundServiceTest {

    GameFirstRoundService gameFirstRoundService;
    @Test
    void gameStartTest() {
        gameFirstRoundService.gameStart(new GameStartEvent("a","b"));
    }
}