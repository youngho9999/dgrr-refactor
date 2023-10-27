package live.dgrr.domain.capture.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@Getter
@AllArgsConstructor
@RequiredArgsConstructor
public class StompHeader {
    private int round;
    private String gameSessionId;

    @Override
    public String toString() {
        return "StompHeader : {" +
                "round : " + Integer.toString(round) +
                ", gameSessionId : " + gameSessionId
                +"}";

    }
}