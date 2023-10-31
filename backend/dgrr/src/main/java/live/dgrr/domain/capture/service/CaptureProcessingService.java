package live.dgrr.domain.capture.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import live.dgrr.domain.capture.entity.CaptureResult;
import live.dgrr.domain.game.entity.RoundResult;
import live.dgrr.domain.game.entity.event.FirstRoundOverEvent;
import live.dgrr.domain.game.entity.event.SecondRoundOverEvent;
import live.dgrr.global.exception.ErrorCode;
import live.dgrr.global.exception.GameException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;


@Service
@Slf4j
@RequiredArgsConstructor
public class CaptureProcessingService {
    private final ApplicationEventPublisher publisher;
    private final ObjectMapper objectMapper;

    public static final int FIRST_ROUND = 1;
    public static final int SECOND_ROUND = 2;

    public CaptureResult deSerializationCapture(String capture) {
        try {
            CaptureResult captureResult = objectMapper.readValue(capture, CaptureResult.class);

            log.info(capture);

            if (captureResult.getEncodedImage() != null) {
                publishingLaugh(captureResult);
            }

            return captureResult;
        } catch (JsonProcessingException e) {
            throw new GameException(ErrorCode.IMAGE_PROCESSING_ERROR);
        }
    }

    public void publishingLaugh(CaptureResult captureResult) {
        String gameSessionId = captureResult.getHeader().getGameSessionId();
        int round = captureResult.getHeader().getRound();

        if (round == FIRST_ROUND) {
            publisher.publishEvent(new FirstRoundOverEvent(gameSessionId, RoundResult.LAUGH));
        }
        else if (round == SECOND_ROUND) {
            publisher.publishEvent(new SecondRoundOverEvent(gameSessionId, RoundResult.LAUGH));
        }
    }

}