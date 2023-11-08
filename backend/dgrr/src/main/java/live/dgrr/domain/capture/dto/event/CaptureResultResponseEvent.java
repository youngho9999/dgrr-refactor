package live.dgrr.domain.capture.dto.event;

import live.dgrr.domain.capture.dto.CaptureResult;
import live.dgrr.domain.capture.dto.response.CaptureResultResponse;

public record CaptureResultEvent(String memberOneId, String memberTwoId, CaptureResultResponse captureResultResponse) {

}
