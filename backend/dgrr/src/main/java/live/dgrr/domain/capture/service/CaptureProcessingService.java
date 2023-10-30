package live.dgrr.domain.capture.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import live.dgrr.domain.capture.entity.CaptureResult;
import live.dgrr.domain.game.entity.GameMember;
import live.dgrr.domain.game.entity.GameRoom;
import live.dgrr.domain.game.repository.GameRoomRepository;
import live.dgrr.global.exception.ErrorCode;
import live.dgrr.global.exception.GameException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class CaptureProcessingService {

    private static final String CAPTURE_RESULT_DEST = "recv/cpature-result";
    private final GameRoomRepository gameRoomRepository;
    private final SimpMessagingTemplate template;

    public void processingCaptureImage(String data) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        CaptureResult captureResult = objectMapper.readValue(data, CaptureResult.class);
        log.info("Capture Result : {}", captureResult);

        String gameSessionId = captureResult.getHeader().getGameSessionId();
        sendCaptureResult(gameSessionId, captureResult);
    }

    public void sendCaptureResult(String gameSessionId, CaptureResult captureResult) {
        GameRoom gameRoom = gameRoomRepository.findById(gameSessionId).orElseThrow(() -> new GameException(ErrorCode.GAME_ROOM_NOT_FOUND));

        GameMember memberOne = gameRoom.getMemberOne();
        GameMember memberTwo = gameRoom.getMemberTwo();

        if (memberOne != null && memberTwo != null) {
            template.convertAndSendToUser(memberOne.memberId(), CAPTURE_RESULT_DEST, captureResult);
            template.convertAndSendToUser(memberTwo.memberId(), CAPTURE_RESULT_DEST, captureResult);
        }
        else {
            throw new GameException(ErrorCode.MEMBER_NOT_FOUND);
        }

    }
}