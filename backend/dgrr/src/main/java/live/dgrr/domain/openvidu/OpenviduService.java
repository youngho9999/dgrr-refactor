package live.dgrr.domain.openvidu;

import org.springframework.stereotype.Service;

@Service
public interface OpenviduService {
    public String createSession(String gameSessionId);
    public String createConnection(String sessionId);
}
