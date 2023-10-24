package live.dgrr.domain.game.entity;

import jakarta.persistence.Id;
import live.dgrr.global.entity.BaseEntity;
import org.springframework.data.redis.core.RedisHash;

import java.time.LocalDateTime;

@RedisHash(value = "gameRoom", timeToLive = 200)
public class GameRoom extends BaseEntity {

    @Id
    private String gameRoomId;
    private GameMember memberOne;
    private GameMember memberTwo;
    private GameStatus gameStatus;
    private LocalDateTime firstRoundStartTime;
    private LocalDateTime firstRoundEndTime;
    private LocalDateTime secondRoundStartTime;
    private LocalDateTime secondRoundEndTime;
    private RoundResult firstRoundResult;
    private RoundResult secondRoundResult;
}
