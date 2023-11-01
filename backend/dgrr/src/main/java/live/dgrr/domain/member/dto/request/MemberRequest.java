package live.dgrr.domain.member.dto.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Size;

public record MemberRequest (
        Long memberId,
        @Size(min = 1, max = 12)
        String nickname,
        String profileImage,
        @Size(max = 20)
        String description
){
}
