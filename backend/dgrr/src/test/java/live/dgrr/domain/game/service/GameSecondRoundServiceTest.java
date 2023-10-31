package live.dgrr.domain.game.service;


import live.dgrr.domain.game.entity.GameMember;
import live.dgrr.domain.game.entity.GameRoom;
import live.dgrr.domain.game.entity.GameStatus;
import live.dgrr.domain.game.entity.event.SecondRoundPreparedEvent;
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

import static org.assertj.core.api.Assertions.assertThat;
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
    private ArgumentCaptor<SecondRoundPreparedEvent> eventCaptor;

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
        verify(publisher).publishEvent(eventCaptor.capture());
        SecondRoundPreparedEvent capturedEvent = eventCaptor.getValue();

        assertThat(capturedEvent.memberOneId()).isEqualTo(memberOneId);
        assertThat(capturedEvent.memberTwoId()).isEqualTo(memberTwoId);
    }

}