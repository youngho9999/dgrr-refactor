package live.dgrr.domain.capture.entity;

import lombok.*;

@Getter
@AllArgsConstructor
@RequiredArgsConstructor
public class ImageResult {

    private final boolean success;
    private String emotion;
    private double probability;
    private double smileProbability;
    private String encodedImage;
    private StompHeader stompHeader;

    public String printField() {
        return "success : " + success +
                ", emotion : " + emotion +
                ", probability : " + probability +
                ", smileProbability : " + smileProbability +
                ", encodedImage : " + (encodedImage == null ? "null, " : encodedImage.substring(0, Math.min(40, encodedImage.length()))) +
                stompHeader.toString() +
                "}";
    }
}