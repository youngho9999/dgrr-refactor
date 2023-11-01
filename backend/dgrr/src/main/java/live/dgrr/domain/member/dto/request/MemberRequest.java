package live.dgrr.domain.member.dto.request;

public record MemberRequest (
        Long memberId,
        String nickname,
        String profileImage,
        String description
){
}
