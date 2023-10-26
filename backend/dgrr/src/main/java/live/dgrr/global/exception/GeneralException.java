package live.dgrr.global.exception;

public class GeneralException extends RuntimeException{
    private final ErrorCode errorCode;

    public GeneralException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}
