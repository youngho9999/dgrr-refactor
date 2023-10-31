package live.dgrr.domain.member.service;

import live.dgrr.domain.gamehistory.entity.GameHistory;
import live.dgrr.domain.gamehistory.repository.GameHistoryRepository;
import live.dgrr.domain.member.dto.response.GameHistoryWithOpponentInfoResponseDto;
import live.dgrr.domain.member.dto.response.MemberInfoResponseDto;
import live.dgrr.domain.member.dto.response.MemberRankingResponseDto;
import live.dgrr.domain.member.dto.response.MemberResponseDto;
import live.dgrr.domain.member.entity.Member;
import live.dgrr.domain.member.repository.MemberRepository;
import live.dgrr.global.util.TierCalculator;
import live.dgrr.domain.ranking.repository.RankingRepository;
import live.dgrr.global.exception.ErrorCode;
import live.dgrr.global.exception.GeneralException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final RankingRepository rankingRepository;
    private final GameHistoryRepository gameHistoryRepository;

    public Member findMemberById(Long memberId) {
        return memberRepository.findById(memberId).orElseThrow(() -> new GeneralException(ErrorCode.MEMBER_NOT_FOUND));
    }

    @Transactional(readOnly=true)
    public MemberInfoResponseDto getMyInfo(String memberId) {
        Member member = findMemberById(Long.parseLong(memberId));
        MemberResponseDto memberDto = MemberResponseDto.of(member.getMemberId(), member.getNickname(), member.getProfileImage(), member.getDescription());

        MemberRankingResponseDto ranking = MemberRankingResponseDto.of(
                rankingRepository.getcurentSeason(),
                rankingRepository.getScoreByMemberId(Long.valueOf(memberId)),
                rankingRepository.getRankByMemberId(Long.valueOf(memberId)),
                TierCalculator.calculateRank((int) rankingRepository.getScoreByMemberId(Long.valueOf(memberId)).doubleValue())
        );
        List<GameHistory> gameHistoryList = gameHistoryRepository.findTop3ByMember_MemberIdOrderByCreatedAtAsc(Long.parseLong(memberId));

        return MemberInfoResponseDto.of(memberDto, ranking, changeGameHistoryDto(gameHistoryList));
    }

    private List<GameHistoryWithOpponentInfoResponseDto> changeGameHistoryDto(List<GameHistory> gameHistoryList) {
        List<GameHistoryWithOpponentInfoResponseDto> responseDtoList = new ArrayList<>();

        for (GameHistory gameHistory : gameHistoryList) {
            Member opponentMember = getOpponentMemberForGameHistory(gameHistory);
            GameHistoryWithOpponentInfoResponseDto responseDto = GameHistoryWithOpponentInfoResponseDto.of(
                    gameHistory.getGameHistoryId(),
                    gameHistory.getGameResult(),
                    gameHistory.getGameType(),
                    gameHistory.getHoldingTime(),
                    gameHistory.getHighlightImage(),
                    gameHistory.getCreatedAt(),
                    opponentMember.getNickname(),
                    opponentMember.getProfileImage(),
                    opponentMember.getDescription());
            responseDtoList.add(responseDto);
        }
        return responseDtoList;

    }

    private Member getOpponentMemberForGameHistory(GameHistory gameHistory) {
        GameHistory opponentGameHistory = gameHistoryRepository.findByMember_OpponentMemberIdForGameHistory(gameHistory.getGameRoomId(), gameHistory.getMember().getMemberId());
        return findMemberById(opponentGameHistory.getMember().getMemberId());
    }
}
