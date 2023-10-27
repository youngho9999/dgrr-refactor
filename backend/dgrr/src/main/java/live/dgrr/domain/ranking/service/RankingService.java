package live.dgrr.domain.ranking.service;

import live.dgrr.domain.ranking.dto.RankingMemberResponse;
import live.dgrr.domain.ranking.dto.RankingResponse;
import live.dgrr.global.config.redis.RankingConfig;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
@Slf4j
public class RankingService {

    private final RedisTemplate<String, Long> redisTemplate;
    private final String key;

    @Autowired
    public RankingService(RedisTemplate<String, Long> redisTemplate, RankingConfig rankingConfig) {
        this.redisTemplate = redisTemplate;
        this.key = rankingConfig.getKey() + rankingConfig.getSeason();
    }

    public boolean addRanking(Long memberId, double score) {
        return redisTemplate.opsForZSet().add(key, memberId, score);
    }

    public RankingMemberResponse getRankingMember(Long memberId) {
        List<RankingResponse> rankings = new ArrayList<>();
        Set<ZSetOperations.TypedTuple<Long>> results = redisTemplate.opsForZSet().rangeWithScores(key, 0, -1);
        if (results != null) {
            for (ZSetOperations.TypedTuple<Long> result : results) {
                String value = String.valueOf(result.getValue());
                Double score = result.getScore();
                rankings.add(
                         RankingResponse.of(
                                Long.valueOf(value),
                                score,
                                redisTemplate.opsForZSet().reverseRank(key, Long.valueOf(value))+1
                        )
                );
            }
        }

        return RankingMemberResponse.of(getRanking(memberId), rankings);
    }

    public RankingResponse getRanking(Long memberId) {
        // 멤버 스코어 조회
        Double score = redisTemplate.opsForZSet().score(key, memberId);
        if (score == null) {
            log.info("score is null");
            return null;
        }

        // 멤버 랭킹 조회 (0부터 시작하므로 1을 더해줌)
        Long rank = redisTemplate.opsForZSet().reverseRank(key, memberId);
        if (rank == null) {
            log.info("rank is null");
            return null;
        }
        rank += 1;

        return RankingResponse.of(memberId, score, rank);
    }
}
