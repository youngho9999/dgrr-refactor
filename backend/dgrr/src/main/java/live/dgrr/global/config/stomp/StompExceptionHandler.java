package live.dgrr.global.config.stomp;

import org.springframework.messaging.handler.annotation.MessageExceptionHandler;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class StompExceptionHandler  {

    @MessageExceptionHandler(RuntimeException.class)
    @SendToUser("/recv/errors")
    public String handleException(RuntimeException e) {
        System.out.println("e is back");
        return "Error";
    }
}
