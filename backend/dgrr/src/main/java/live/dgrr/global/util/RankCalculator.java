package live.dgrr.global.util;

import live.dgrr.global.entity.Rank;

public class RankCalculator {
    private RankCalculator() {
    }

    public static Rank calculateRank(int score) {
        if(score >= 1600) {
            return Rank.GOLD;
        }
        else if(score >= 1400) {
            return Rank.SILVER;
        }
        else {
            return Rank.BRONZE;
        }
    }
}
