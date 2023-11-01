package live.dgrr.domain.ranking.dto.response;

import live.dgrr.global.entity.Tier;
import lombok.Builder;

@Builder
public record MemberRankingResponseDto(
        //시즌, 레이팅, 랭크(등수), 티어
        Integer season,
        Double rating,
        Long rank,
        Tier tier

) {
    public static MemberRankingResponseDto of(Integer season, Double rating, Long rank, Tier tier) {
        return MemberRankingResponseDto.builder()
                .season(season)
                .rating(rating)
                .rank(rank)
                .tier(tier)
                .build();
    }
}
