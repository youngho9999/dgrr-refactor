package live.dgrr.domain.capture.controller;

import live.dgrr.domain.capture.entity.CaptureResult;
import live.dgrr.domain.capture.service.CaptureService;
import live.dgrr.domain.game.entity.GameRoom;
import live.dgrr.domain.game.repository.GameRoomRepository;
import live.dgrr.global.exception.ErrorCode;
import live.dgrr.global.exception.GameException;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor

public class CaptureController {
    private final CaptureService captureService;
    private final GameRoomRepository gameRoomRepository;
    private final SimpMessagingTemplate template;
    private static final String CAPTURE_RESULT_DEST = "recv/cpature-result";


    @MessageMapping("/capture-image")
    public void sendCaptureResultToUsers(@Payload String capture) {
        CaptureResult captureResult = captureService.deSerializationCapture((capture));
        String gameSessionId = captureResult.getHeader().getGameSessionId();
        GameRoom gameRoom = gameRoomRepository.findById(gameSessionId).orElseThrow(() -> new GameException(ErrorCode.GAME_ROOM_NOT_FOUND));

        template.convertAndSendToUser(gameRoom.getMemberOne().memberId(), CAPTURE_RESULT_DEST, captureResult);
        template.convertAndSendToUser(gameRoom.getMemberTwo().memberId(), CAPTURE_RESULT_DEST, captureResult);

    }

}
