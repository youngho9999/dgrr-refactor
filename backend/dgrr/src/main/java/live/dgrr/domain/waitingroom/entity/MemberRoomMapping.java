package live.dgrr.domain.waitingroom.entity;

import org.springframework.data.annotation.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.redis.core.RedisHash;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@RedisHash(value = "memberroommapping", timeToLive = 600)
public class MemberRoomMapping {
    @Id
    private Long memberId;
    private int roomId;
}
