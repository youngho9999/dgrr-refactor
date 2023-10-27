package live.dgrr.domain.ranking.controller;

import live.dgrr.domain.ranking.entity.RankingMemberResponse;
import live.dgrr.domain.ranking.entity.RankingRequest;
import live.dgrr.domain.ranking.service.RankingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/ranking")
@RequiredArgsConstructor
@Slf4j
public class RankingController {

    private final RankingService rankingService;

    // ranking 추가
    @PostMapping
    public ResponseEntity<?> addRanking(@RequestBody RankingRequest request) {
        boolean result = rankingService.addRanking(request.memberId(), request.score());
        log.info(String.valueOf(request));
        return new ResponseEntity(result, HttpStatus.OK);
    }

    // member id 기준 ranking 조회
    @GetMapping("/member-id/{memberId}")
    public ResponseEntity<?> getRankingByMemberId(@PathVariable String memberId) {
        RankingMemberResponse response = rankingService.getRankingMember(Long.valueOf(memberId));
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}
