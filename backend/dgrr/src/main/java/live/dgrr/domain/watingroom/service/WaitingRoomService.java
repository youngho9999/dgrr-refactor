package live.dgrr.domain.watingroom.service;

import live.dgrr.domain.watingroom.entity.WaitingRoom;
import live.dgrr.domain.watingroom.repository.WaitingRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WaitingRoomService {

    private final WaitingRoomRepository waitingRoomRepository;

    public WaitingRoom findWaitingRoomById(String roomId) {
        return waitingRoomRepository.findById(roomId).orElseThrow(() -> new RuntimeException());
    }

}
