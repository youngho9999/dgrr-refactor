package live.dgrr.domain.watingroom.service;

import live.dgrr.domain.watingroom.entity.MemberRoomMapping;
import live.dgrr.domain.watingroom.repository.MemberRoomMappingRepository;
import live.dgrr.global.exception.ErrorCode;
import live.dgrr.global.exception.GeneralException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class MemberRoomMappingService {

    private final MemberRoomMappingRepository memberRoomMappingRepository;

    public MemberRoomMapping findRoomIdByMemberId(long memberId) {
        return memberRoomMappingRepository.findById(memberId).orElseThrow(() -> new GeneralException(ErrorCode.MAPPING_NOT_FOUND));
    }

}
