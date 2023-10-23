package live.dgrr.domain.watingroom.entity;

import jakarta.persistence.Id;
import live.dgrr.global.entity.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.redis.core.RedisHash;


@Getter
@RedisHash(value = "waitingmember")
@NoArgsConstructor
@AllArgsConstructor
public class WaitingMember extends BaseEntity {
    @Id
    private String waitingMemberId;
    private String nickname;
    private String profileImage;
    private boolean isReady;

}
