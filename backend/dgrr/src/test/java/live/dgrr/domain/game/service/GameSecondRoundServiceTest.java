package live.dgrr.domain.game.service;


import live.dgrr.domain.game.entity.GameMember;
import live.dgrr.domain.game.entity.GameRoom;
import live.dgrr.domain.game.entity.GameStatus;
import live.dgrr.domain.game.entity.RoundResult;
import live.dgrr.domain.game.entity.event.*;
import live.dgrr.domain.game.repository.GameRoomRepository;
import live.dgrr.global.entity.Rank;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.InjectMocks;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.context.ApplicationEventPublisher;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.doAnswer;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class GameSecondRoundServiceTest {

    @Spy
    GameRoomRepository gameRoomRepository;
    @Spy
    ApplicationEventPublisher publisher;
    @InjectMocks
    GameSecondRoundService gameSecondRoundService;
    @Captor
    private ArgumentCaptor<SecondRoundPreparedEvent> secondRoundPreparedEventCaptor;

    @Captor
    private ArgumentCaptor<SecondRoundEndEvent> secondRoundEndEventCaptor;

    @Test
    void 이라운드_시작() {
        //given
        String gameRoomId = "roomId";
        String memberOneId = "M1";
        String memberTwoId = "M2";

        GameMember memberOne = new GameMember(memberOneId, "Player1", "jpg", "This is description", 1500, Rank.SILVER);
        GameMember memberTwo = new GameMember(memberTwoId, "Player2", "jpg", "This is description", 1200, Rank.BRONZE);
        GameRoom gameRoom = new GameRoom(gameRoomId, memberOne, memberTwo, GameStatus.BEFORE_START);

        //when
        gameSecondRoundService.secondRoundStart(gameRoomId,gameRoom);

        //then
        verify(publisher).publishEvent(secondRoundPreparedEventCaptor.capture());
        SecondRoundPreparedEvent capturedEvent = secondRoundPreparedEventCaptor.getValue();

        assertThat(capturedEvent.memberOneId()).isEqualTo(memberOneId);
        assertThat(capturedEvent.memberTwoId()).isEqualTo(memberTwoId);
    }

    @Test
    void 웃은경우_이라운드_종료() {

        //given
        String gameRoomId = "id";
        String memberOneId = "M1";
        String memberTwoId = "M2";
        doAnswer(invocation -> {
            GameMember memberOne = new GameMember(memberOneId, "Player1", "jpg", "This is description", 1500, Rank.SILVER);
            GameMember memberTwo = new GameMember(memberTwoId, "Player2", "jpg", "This is description", 1200, Rank.BRONZE);
            GameRoom gameRoom = new GameRoom(gameRoomId, memberOne, memberTwo, GameStatus.FIRST_ROUND);
            return Optional.of(gameRoom);
        }).when(gameRoomRepository).findById(gameRoomId);

        //when
        gameSecondRoundService.secondRoundOver(new SecondRoundOverEvent(gameRoomId, RoundResult.LAUGH));

        //then
        verify(publisher).publishEvent(secondRoundEndEventCaptor.capture());
        SecondRoundEndEvent event = secondRoundEndEventCaptor.getValue();

        assertThat(event.memberOneId()).isEqualTo(memberOneId);
        assertThat(event.roundResult()).isEqualTo(RoundResult.LAUGH);
    }

    @Test
    void 안웃은경우_이라운드_종료() {

        //given
        String gameRoomId = "id";
        String memberOneId = "M1";
        String memberTwoId = "M2";
        doAnswer(invocation -> {
            GameMember memberOne = new GameMember(memberOneId, "Player1", "jpg", "This is description", 1500, Rank.SILVER);
            GameMember memberTwo = new GameMember(memberTwoId, "Player2", "jpg", "This is description", 1200, Rank.BRONZE);
            GameRoom gameRoom = new GameRoom(gameRoomId, memberOne, memberTwo, GameStatus.FIRST_ROUND);
            return Optional.of(gameRoom);
        }).when(gameRoomRepository).findById(gameRoomId);

        //when
        gameSecondRoundService.secondRoundOver(new SecondRoundOverEvent(gameRoomId, RoundResult.NO_LAUGH));

        //then
        verify(publisher).publishEvent(secondRoundEndEventCaptor.capture());
        SecondRoundEndEvent event = secondRoundEndEventCaptor.getValue();

        assertThat(event.memberOneId()).isEqualTo(memberOneId);
        assertThat(event.roundResult()).isEqualTo(RoundResult.NO_LAUGH);
    }
}