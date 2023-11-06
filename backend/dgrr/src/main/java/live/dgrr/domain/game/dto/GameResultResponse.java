package live.dgrr.domain.game.dto;

import live.dgrr.domain.game.entity.GameMember;
import live.dgrr.domain.game.entity.GameResult;
import live.dgrr.domain.game.entity.event.GameType;
import live.dgrr.domain.gamehistory.entity.GameHistory;
import live.dgrr.domain.member.entity.Member;
import live.dgrr.global.entity.Tier;
import lombok.Builder;

@Builder
public record GameResultResponse(GameMember myInfo, GameMember enemyInfo, String highlightImage, GameResult gameResult,
                                 int afterRating, Tier afterTier)  {
}
