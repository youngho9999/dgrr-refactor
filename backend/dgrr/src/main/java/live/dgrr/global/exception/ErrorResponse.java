package live.dgrr.global.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

@Getter
public class ErrorResponse {
    private final LocalDateTime timestamp;
    private final int errorCode;
    private final String message;

    public ErrorResponse(HttpStatus status, String message) {
        timestamp = LocalDateTime.now();
        this.errorCode = status.value();
        this.message = message;
    }
}
