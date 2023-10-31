package live.dgrr.domain.member.dto.response;

import live.dgrr.global.entity.Rank;
import lombok.Builder;

@Builder
public record MemberRankingResponseDto(
        //시즌, 레이팅, 랭크(등수), 티어
        Integer season,
        Double rating,
        Long rank,
        Rank tier

) {
    public static MemberRankingResponseDto of(Integer season, Double rating, Long rank, Rank tier) {
        return MemberRankingResponseDto.builder()
                .season(season)
                .rating(rating)
                .rank(rank)
                .tier(tier)
                .build();
    }
}
