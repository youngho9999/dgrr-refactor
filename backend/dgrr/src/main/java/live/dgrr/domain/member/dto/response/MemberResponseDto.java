package live.dgrr.domain.member.dto.response;

import lombok.Builder;

@Builder
public record MemberResponseDto(
        Long memberId,
        String nickname,
        String profileImage,
        String description
) {
    public static MemberResponseDto of(Long memberId, String nickname, String profileImage, String description) {
        return MemberResponseDto.builder()
                .memberId(memberId)
                .nickname(nickname)
                .profileImage(profileImage)
                .description(description)
                .build();
    }
}
