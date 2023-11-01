package live.dgrr.domain.ranking.dto.response;

import lombok.Builder;

@Builder
public record RankingResponse(Long memberId, Double score, Long rank) {
    public static RankingResponse of(Long memberId, Double score, Long rank) {
        return RankingResponse.builder()
                .memberId(memberId)
                .score(score)
                .rank(rank)
                .build();
    }
}
