package live.dgrr.domain.member.dto.response;

import lombok.Builder;

import java.util.List;

@Builder
public record MemberInfoResponseDto(
        MemberResponseDto member,
        MemberRankingResponseDto ranking,
        List<GameHistoryWithOpponentInfoResponseDto> gameHistoryList

) {
    public static MemberInfoResponseDto of(MemberResponseDto member,
                                           MemberRankingResponseDto ranking,
                                           List<GameHistoryWithOpponentInfoResponseDto> gameHistoryList) {
        return MemberInfoResponseDto.builder()
                .member(member)
                .ranking(ranking)
                .gameHistoryList(gameHistoryList)
                .build();
    }
}
