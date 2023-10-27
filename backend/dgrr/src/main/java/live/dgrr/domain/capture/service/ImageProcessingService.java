package live.dgrr.domain.capture.service;

import live.dgrr.domain.capture.entity.ImageResult;
import live.dgrr.domain.capture.entity.StompHeader;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class ImageProcessingService {

    public void processingCaptureImage(String data)throws ParseException {
        JSONParser parser = new JSONParser();

        JSONObject analyzedData = (JSONObject) parser.parse(data);

        JSONObject header = (JSONObject) analyzedData.get("header");

        int round = ((Long) header.get("round")).intValue();
        String gameSessionId = (String) header.get("gameSessionId");

        boolean success = (boolean) analyzedData.get("success");
        String emotion = (String) analyzedData.get("emotion");
        double probability = (double) analyzedData.get("probability");
        double smileProbability = (double) analyzedData.get("smileProbability");
        String encodedImage = (String) analyzedData.get("encodedImage");

        StompHeader stompHeader = new StompHeader(round, gameSessionId);
        ImageResult imageResult = new ImageResult(success, emotion, probability, smileProbability, encodedImage, stompHeader);

        System.out.println(imageResult.printField());

    }

}