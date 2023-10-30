package live.dgrr.domain.capture.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import live.dgrr.domain.capture.service.CaptureProcessingService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CaptureController {
    private final CaptureProcessingService imageProcessingService;

    public CaptureController(CaptureProcessingService captureProcessingService) {
        this.imageProcessingService = captureProcessingService;
    }

    @MessageMapping("/capture-image")
    public void receiveImageDataFromPythonClient(@Payload String img) throws JsonProcessingException {
        imageProcessingService.processingCaptureImage(img);
    }
}
