package live.dgrr.domain.member.service;

import live.dgrr.domain.gamehistory.entity.GameHistory;
import live.dgrr.domain.gamehistory.repository.GameHistoryRepository;
import live.dgrr.domain.gamehistory.dto.response.GameHistoryWithOpponentInfoResponse;
import live.dgrr.domain.member.dto.request.MemberRequest;
import live.dgrr.domain.member.dto.response.MemberInfoResponse;
import live.dgrr.domain.ranking.dto.response.MemberRankingInfoResponse;
import live.dgrr.domain.member.dto.response.MemberResponse;
import live.dgrr.domain.member.entity.Member;
import live.dgrr.domain.member.repository.MemberRepository;
import live.dgrr.global.util.TierCalculator;
import live.dgrr.domain.ranking.repository.RankingRepository;
import live.dgrr.global.exception.ErrorCode;
import live.dgrr.global.exception.GeneralException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final RankingRepository rankingRepository;
    private final GameHistoryRepository gameHistoryRepository;

    private final int MAX_NICKNAME_LENGTH = 12;
    private final int MAX_DESCRIPTION_LENGTH = 20;

    public Member findMemberById(Long memberId) {
        return memberRepository.findById(memberId).orElseThrow(() -> new GeneralException(ErrorCode.MEMBER_NOT_FOUND));
    }

    @Transactional(readOnly=true)
    public MemberInfoResponse getMyInfo(String memberId) {
        Member member = findMemberById(Long.parseLong(memberId));
        MemberResponse memberDto = MemberResponse.of(member.getMemberId(), member.getNickname(), member.getProfileImage(), member.getDescription());

        MemberRankingInfoResponse ranking = MemberRankingInfoResponse.of(
                rankingRepository.getcurentSeason(),
                rankingRepository.getRatingByMemberId(Long.valueOf(memberId)),
                rankingRepository.getRankByMemberId(Long.valueOf(memberId)),
                TierCalculator.calculateRank((int) rankingRepository.getRatingByMemberId(Long.valueOf(memberId)).doubleValue())
        );
        List<GameHistory> gameHistoryList = gameHistoryRepository.findTop3ByMember_MemberIdOrderByCreatedAtDesc(Long.parseLong(memberId));

        return MemberInfoResponse.of(memberDto, ranking, changeGameHistoryDto(gameHistoryList));
    }

    private List<GameHistoryWithOpponentInfoResponse> changeGameHistoryDto(List<GameHistory> gameHistoryList) {
        return gameHistoryList.stream()
                .map(gameHistory -> {
                    Member opponentMember = getOpponentMemberForGameHistory(gameHistory);
                    return GameHistoryWithOpponentInfoResponse.of(gameHistory, opponentMember);
                })
                .collect(Collectors.toList());
    }

    private Member getOpponentMemberForGameHistory(GameHistory gameHistory) {
        GameHistory opponentGameHistory = gameHistoryRepository.findByMember_OpponentMemberIdForGameHistory(gameHistory.getGameRoomId(), gameHistory.getMember().getMemberId())
                .orElseThrow(() -> new GeneralException(ErrorCode.OPPONENT_MEMBER_NOT_FOUND));
        return findMemberById(opponentGameHistory.getMember().getMemberId());
    }

    @Transactional(readOnly=true)
    public List<GameHistoryWithOpponentInfoResponse> getMyGameHistory(String memberId) {
        List<GameHistory> gameHistoryList = gameHistoryRepository.findByMember_MemberIdOrderByCreatedAtDesc(Long.parseLong(memberId));
        return changeGameHistoryDto(gameHistoryList);
    }

    @Transactional
    public void updateByMember(String memberId, MemberRequest memberRequest) {
        //TODO: checkRequestValidation 함수에 닉네임 체크로직도 추가
        Member member = findMemberById(Long.parseLong(memberId));
        checkRequestValidation(member.getNickname(), memberRequest.nickname(), memberRequest.description());
        member.updateMember(memberRequest.nickname(),memberRequest.profileImage(),memberRequest.description());
    }

    private void checkRequestValidation(String memberNickname, String nickname, String description) {
        if(!memberNickname.equals(nickname)) {
            checkNickname(nickname);
        }

        checkDescription(description);
    }

    private void checkNickname(String nickname) {
        if (nickname.isEmpty() || nickname.length() > MAX_NICKNAME_LENGTH) {
            throw new GeneralException(ErrorCode.NICKNAME_LENGTH_INVALID);
        }

        if (isDuplicateNickname(nickname)) {
            throw new GeneralException(ErrorCode.NICKNAME_ALREADY_EXIST);
        }
    }
    private boolean isDuplicateNickname(String nickname) {
        List<Member> memberList = memberRepository.findByNickname(nickname);
        if(memberList.isEmpty()) {
            return false;
        }
        return true;
    }

    private void checkDescription(String description) {
        if (description.length() > MAX_DESCRIPTION_LENGTH) {
            throw new GeneralException(ErrorCode.DESCRIPTION_LENGTH_INVALID);
        }
    }
}
