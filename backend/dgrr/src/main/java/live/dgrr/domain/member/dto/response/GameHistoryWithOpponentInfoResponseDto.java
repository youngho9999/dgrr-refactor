package live.dgrr.domain.member.dto.response;

import live.dgrr.domain.game.entity.GameResult;
import live.dgrr.domain.game.entity.event.GameType;
import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record GameHistoryWithOpponentInfoResponseDto(
        Long gameHistoryId,
        GameResult gameResult,
        GameType gameType,
        Integer holdingTime,
        String highlightImage,
        LocalDateTime createdAt,
        String opponentNickname,
        String opponentProfileImage,
        String opponentDescription

) {
    public static GameHistoryWithOpponentInfoResponseDto of(Long gameHistoryId,
                                                            GameResult gameResult,
                                                            GameType gameType,
                                                            Integer holdingTime,
                                                            String highlightImage,
                                                            LocalDateTime createdAt,
                                                            String opponentNickname,
                                                            String opponentProfileImage,
                                                            String opponentDescription
    ) {
       return GameHistoryWithOpponentInfoResponseDto.builder()
               .gameHistoryId(gameHistoryId)
               .gameResult(gameResult)
               .gameType(gameType)
               .holdingTime(holdingTime)
               .highlightImage(highlightImage)
               .createdAt(createdAt)
               .opponentNickname(opponentNickname)
               .opponentProfileImage(opponentProfileImage)
               .opponentDescription(opponentDescription)
               .build();
    }
}
