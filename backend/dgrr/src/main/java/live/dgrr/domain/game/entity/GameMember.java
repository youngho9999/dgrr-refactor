package live.dgrr.domain.game.entity;

import live.dgrr.global.entity.Rank;


public record GameMember(String nickname, String profileImage, String description, int rating, Rank rank) {
}
