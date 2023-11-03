package live.dgrr.domain.capture.service;

import live.dgrr.domain.capture.entity.CaptureResult;
import live.dgrr.domain.capture.entity.event.CaptureResultEvent;
import live.dgrr.domain.game.entity.GameMember;
import live.dgrr.domain.game.entity.GameRoom;
import live.dgrr.domain.game.entity.GameStatus;
import live.dgrr.domain.game.entity.RoundResult;
import live.dgrr.domain.game.entity.event.*;
import live.dgrr.domain.game.repository.GameRoomRepository;
import live.dgrr.global.entity.Tier;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;
import org.springframework.context.ApplicationEventPublisher;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = Strictness.LENIENT)
class CaptureServiceTest {

    @InjectMocks
    CaptureService captureService;
    @Spy
    GameRoomRepository gameRoomRepository;

    @Mock
    ApplicationEventPublisher publisher;
    @Captor
    private ArgumentCaptor<FirstRoundOverEvent> firstRoundOverEventCaptor;
    @Captor
    private ArgumentCaptor<SecondRoundOverEvent> secondRoundOverEventCaptor;

    @Captor
    private ArgumentCaptor<CaptureResultEvent> captureResultEventCaptor;

    @DisplayName("1라운드 - 웃었을 때")
    @Test
    void deSerializationCaptureTest_1Round_LAUGH() {

        String captureJson =
                "{" +
                        "\"success\":true," +
                        "\"emotion\":\"Smile\"," +
                        "\"probability\":0.95," +
                        "\"smileProbability\":0.95," +
                        "\"encodedImage\":\"AABS@9XX1234\"," +
                        "\"header\":" +
                        "{" +
                        "\"round\":1," +
                        "\"gameSessionId\":\"id\"" +
                        "}" +
                        "}";


        String gameRoomId = "id";
        String memberOneId = "M1";
        String memberTwoId = "M2";
        GameMember memberOne = new GameMember(memberOneId, "Player1", "jpg", "This is description", 1500, Tier.SILVER);
        GameMember memberTwo = new GameMember(memberTwoId, "Player2", "jpg", "This is description", 1200, Tier.BRONZE);
        GameRoom gameRoom = new GameRoom(gameRoomId, memberOne, memberTwo, GameStatus.FIRST_ROUND);

        when(gameRoomRepository.findById(gameRoomId)).thenReturn(Optional.of(gameRoom));

        CaptureResult captureResult = captureService.deSerializationCapture(captureJson);

        assertNotNull(captureResult);
        assertTrue(captureResult.isSuccess());
        assertEquals("Smile", captureResult.getEmotion());
        assertEquals(0.95, captureResult.getProbability());
        assertEquals(0.95, captureResult.getSmileProbability());
        assertEquals("AABS@9XX1234", captureResult.getEncodedImage());
        assertNotNull(captureResult.getHeader());
        assertEquals(1, captureResult.getHeader().getRound());
        assertEquals("id", captureResult.getHeader().getGameSessionId());

        verify(publisher).publishEvent(captureResultEventCaptor.capture());
        CaptureResultEvent captureResultEvent = captureResultEventCaptor.getValue();
        assertThat(captureResultEvent.memberOneId()).isEqualTo(memberOneId);
        assertThat(captureResultEvent.memberTwoId()).isEqualTo(memberTwoId);
        assertThat(captureResultEvent.captureResult()).isEqualTo(captureResult);

        verify(publisher).publishEvent(firstRoundOverEventCaptor.capture());
        verify(publisher, times(0)).publishEvent(secondRoundOverEventCaptor.capture());
        FirstRoundOverEvent firstRoundOverEvent = firstRoundOverEventCaptor.getValue();
        assertThat(firstRoundOverEvent.gameRoomId()).isEqualTo(gameRoomId);
        assertThat(firstRoundOverEvent.roundResult()).isEqualTo(RoundResult.LAUGH);

    }

    @DisplayName("1라운드 - 웃지 않았을 때")
    @Test
    void deSerializationCaptureTest_1Round_NO_LAUGH() {

        String captureJson =
                "{" +
                        "\"success\":true," +
                        "\"emotion\":\"Angry\"," +
                        "\"probability\":0.7," +
                        "\"smileProbability\":0.35," +
                        "\"header\":" +
                        "{" +
                        "\"round\":1," +
                        "\"gameSessionId\":\"id\"" +
                        "}" +
                        "}";


        String gameRoomId = "id";
        String memberOneId = "M1";
        String memberTwoId = "M2";
        GameMember memberOne = new GameMember(memberOneId, "Player1", "jpg", "This is description", 1500, Tier.SILVER);
        GameMember memberTwo = new GameMember(memberTwoId, "Player2", "jpg", "This is description", 1200, Tier.BRONZE);
        GameRoom gameRoom = new GameRoom(gameRoomId, memberOne, memberTwo, GameStatus.FIRST_ROUND);

        when(gameRoomRepository.findById(gameRoomId)).thenReturn(Optional.of(gameRoom));


        CaptureResult captureResult = captureService.deSerializationCapture(captureJson);


        assertNotNull(captureResult);
        assertTrue(captureResult.isSuccess());
        assertEquals("Angry", captureResult.getEmotion());
        assertEquals(0.7, captureResult.getProbability());
        assertEquals(0.35, captureResult.getSmileProbability());
        assertNull(captureResult.getEncodedImage());
        assertNotNull(captureResult.getHeader());
        assertEquals(1, captureResult.getHeader().getRound());
        assertEquals("id", captureResult.getHeader().getGameSessionId());

        verify(publisher).publishEvent(captureResultEventCaptor.capture());
        CaptureResultEvent captureResultEvent = captureResultEventCaptor.getValue();
        assertThat(captureResultEvent.memberOneId()).isEqualTo(memberOneId);
        assertThat(captureResultEvent.memberTwoId()).isEqualTo(memberTwoId);
        assertThat(captureResultEvent.captureResult()).isEqualTo(captureResult);

        verify(publisher,times(0)).publishEvent(firstRoundOverEventCaptor.capture());
        verify(publisher, times(0)).publishEvent(secondRoundOverEventCaptor.capture());

    }

    @DisplayName("2라운드 - 웃었을 때")
    @Test
    void deSerializationCaptureTest_2Round_LAUGH() {

        String captureJson =
                "{" +
                        "\"success\":true," +
                        "\"emotion\":\"Smile\"," +
                        "\"probability\":0.95," +
                        "\"smileProbability\":0.95," +
                        "\"encodedImage\":\"AABS@9XX1234\"," +
                        "\"header\":" +
                        "{" +
                        "\"round\":2," +
                        "\"gameSessionId\":\"id\"" +
                        "}" +
                        "}";


        String gameRoomId = "id";
        String memberOneId = "M1";
        String memberTwoId = "M2";
        GameMember memberOne = new GameMember(memberOneId, "Player1", "jpg", "This is description", 1500, Tier.SILVER);
        GameMember memberTwo = new GameMember(memberTwoId, "Player2", "jpg", "This is description", 1200, Tier.BRONZE);
        GameRoom gameRoom = new GameRoom(gameRoomId, memberOne, memberTwo, GameStatus.FIRST_ROUND);

        when(gameRoomRepository.findById(gameRoomId)).thenReturn(Optional.of(gameRoom));

        CaptureResult captureResult = captureService.deSerializationCapture(captureJson);

        assertNotNull(captureResult);
        assertTrue(captureResult.isSuccess());
        assertEquals("Smile", captureResult.getEmotion());
        assertEquals(0.95, captureResult.getProbability());
        assertEquals(0.95, captureResult.getSmileProbability());
        assertEquals("AABS@9XX1234", captureResult.getEncodedImage());
        assertNotNull(captureResult.getHeader());
        assertEquals(2, captureResult.getHeader().getRound());
        assertEquals("id", captureResult.getHeader().getGameSessionId());

        verify(publisher).publishEvent(captureResultEventCaptor.capture());
        CaptureResultEvent captureResultEvent = captureResultEventCaptor.getValue();
        assertThat(captureResultEvent.memberOneId()).isEqualTo(memberOneId);
        assertThat(captureResultEvent.memberTwoId()).isEqualTo(memberTwoId);
        assertThat(captureResultEvent.captureResult()).isEqualTo(captureResult);

        verify(publisher,times(0)).publishEvent(firstRoundOverEventCaptor.capture());
        verify(publisher).publishEvent(secondRoundOverEventCaptor.capture());
        SecondRoundOverEvent secondRoundOverEvent = secondRoundOverEventCaptor.getValue();
        assertThat(secondRoundOverEvent.gameRoomId()).isEqualTo(gameRoomId);
        assertThat(secondRoundOverEvent.roundResult()).isEqualTo(RoundResult.LAUGH);

    }

    @DisplayName("2라운드 - 웃지 않았을 때")
    @Test
    void deSerializationCaptureTest_2Round_NO_LAUGH() {

        String captureJson =
                "{" +
                        "\"success\":true," +
                        "\"emotion\":\"Angry\"," +
                        "\"probability\":0.7," +
                        "\"smileProbability\":0.35," +
                        "\"header\":" +
                        "{" +
                        "\"round\":2," +
                        "\"gameSessionId\":\"id\"" +
                        "}" +
                        "}";


        String gameRoomId = "id";
        String memberOneId = "M1";
        String memberTwoId = "M2";
        GameMember memberOne = new GameMember(memberOneId, "Player1", "jpg", "This is description", 1500, Tier.SILVER);
        GameMember memberTwo = new GameMember(memberTwoId, "Player2", "jpg", "This is description", 1200, Tier.BRONZE);
        GameRoom gameRoom = new GameRoom(gameRoomId, memberOne, memberTwo, GameStatus.FIRST_ROUND);

        when(gameRoomRepository.findById(gameRoomId)).thenReturn(Optional.of(gameRoom));


        CaptureResult captureResult = captureService.deSerializationCapture(captureJson);


        assertNotNull(captureResult);
        assertTrue(captureResult.isSuccess());
        assertEquals("Angry", captureResult.getEmotion());
        assertEquals(0.7, captureResult.getProbability());
        assertEquals(0.35, captureResult.getSmileProbability());
        assertNull(captureResult.getEncodedImage());
        assertNotNull(captureResult.getHeader());
        assertEquals(2, captureResult.getHeader().getRound());
        assertEquals("id", captureResult.getHeader().getGameSessionId());

        verify(publisher).publishEvent(captureResultEventCaptor.capture());
        CaptureResultEvent captureResultEvent = captureResultEventCaptor.getValue();
        assertThat(captureResultEvent.memberOneId()).isEqualTo(memberOneId);
        assertThat(captureResultEvent.memberTwoId()).isEqualTo(memberTwoId);
        assertThat(captureResultEvent.captureResult()).isEqualTo(captureResult);

        verify(publisher,times(0)).publishEvent(firstRoundOverEventCaptor.capture());
        verify(publisher, times(0)).publishEvent(secondRoundOverEventCaptor.capture());

    }

}