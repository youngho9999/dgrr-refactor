package live.dgrr.domain.capture.service;

import live.dgrr.domain.capture.entity.CaptureResult;
import live.dgrr.domain.capture.entity.Highlight;
import live.dgrr.domain.capture.entity.HighlightID;
import live.dgrr.domain.capture.repository.HighlightRepository;
import live.dgrr.domain.game.entity.RoundResult;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class HighlightService {

    private final HighlightRepository highlightRepository;

    public void saveFirstRoundHighlight(CaptureResult captureResult) {
        String gameRoomId = captureResult.getHeader().getGameSessionId();
        int round = captureResult.getHeader().getRound(); // round는 1만 온다고 가정

        Highlight highlight = new Highlight(new HighlightID(gameRoomId, round), captureUrl);
        highlightRepository.save(highlight);

    }

}
