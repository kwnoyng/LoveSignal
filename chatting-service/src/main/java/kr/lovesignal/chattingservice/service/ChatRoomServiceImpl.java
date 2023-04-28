package kr.lovesignal.chattingservice.service;

import kr.lovesignal.chattingservice.entity.ChatRoom;
import kr.lovesignal.chattingservice.entity.Member;
import kr.lovesignal.chattingservice.entity.Participant;
import kr.lovesignal.chattingservice.model.request.ReqChatRoom;
import kr.lovesignal.chattingservice.model.response.ResChatRoomDto;
import kr.lovesignal.chattingservice.pubsub.RedisSubscriber;
import kr.lovesignal.chattingservice.repository.ChatRoomJpaRepository;
import kr.lovesignal.chattingservice.repository.MemberJpaRepository;
import kr.lovesignal.chattingservice.repository.ParticipantJpaRepository;
import kr.lovesignal.chattingservice.util.CommonUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RequiredArgsConstructor
@Service
@Transactional
public class ChatRoomServiceImpl implements ChatRoomService{

    // 채팅방(topic)에 발행되는 메시지를 처리할 Listner
    private final RedisMessageListenerContainer redisMessageListener;
    // 구독 처리 서비스
    private final RedisSubscriber redisSubscriber;
    // 채팅방의 대화 메시지를 발행하기 위한 redis topic 정보. 서버별로 채팅방에 매치되는 topic정보를 Map에 넣어 roomId로 찾을수 있도록 한다.
    private Map<String, ChannelTopic> topics;

    private final CommonUtils commonUtils;
    private final ChatRoomJpaRepository chatRoomJpaRepository;
    private final MemberJpaRepository memberJpaRepository;
    private final ParticipantJpaRepository participantJpaRepository;


    /**
     * 채팅방 목록 불러오기
     */

    @Override
    public List<ResChatRoomDto> getChatRoomList(String userUUID) {
        UUID uuid = commonUtils.getValidUUID(userUUID);
        Member member = memberJpaRepository.findMemberByUUID(uuid);

        List<ChatRoom> list = participantJpaRepository.findByMemberId(member.getMemberId());
        List<ResChatRoomDto> chatRoomList = new ArrayList<>();

        for(ChatRoom chatRoom : list) {
            ResChatRoomDto resChatRoomDto = ResChatRoomDto.toDto(chatRoom);
            chatRoomList.add(resChatRoomDto);
        }

        return chatRoomList;
    }

    @Override
    public ResChatRoomDto getChatRoom(String roomUUID) {
        UUID uuid = commonUtils.getValidUUID(roomUUID);
        ChatRoom chatRoom = chatRoomJpaRepository.findByUUID(uuid);
        ResChatRoomDto reschatRoomDto = ResChatRoomDto.toDto(chatRoom);
        return reschatRoomDto;
    }


    /**
     * 채팅방 생성 : 서버간 채팅방 공유를 위해 redis hash에 저장한다.
     */

    @Override
    public ChatRoom createSystemChatroom(ReqChatRoom reqChatRoom, String userUUID) {
        ChatRoom chatRoom = reqChatRoom.toEntity();
        chatRoomJpaRepository.save(chatRoom);

        List<ChatRoom> chatRooms = chatRoomJpaRepository.findAll();
        Long chatRoomId = chatRooms.get(chatRooms.size() - 1).getRoomId();

        UUID uuid = commonUtils.getValidUUID(userUUID);
        Member member = memberJpaRepository.findMemberByUUID(uuid);

        Participant participant = Participant.builder()
                .memberId(member.getMemberId())
                .chatroomId(chatRoomId)
                .build();
        participantJpaRepository.save(participant);

        return chatRoom;
    }

    @Override
    public ChatRoom createSameGenderChatRoom(ReqChatRoom reqChatRoom, List<String> userUUIDs) {
        ChatRoom chatRoom = reqChatRoom.toEntity();
        chatRoomJpaRepository.save(chatRoom);

        for(String userUUID : userUUIDs) {
            UUID uuid = commonUtils.getValidUUID(userUUID);
            Member member = memberJpaRepository.findMemberByUUID(uuid);

            Participant participant  = Participant.builder()
                    .memberId(member.getMemberId())
                    .chatroomId(chatRoom.getRoomId())
                    .build();
            participantJpaRepository.save(participant);
        }

        return chatRoom;
    }


    /**
     * 채팅방 입장 : redis에 topic을 만들고 pub/sub 통신을 하기 위해 리스너를 설정한다.
     */

    public void enterChatRoom(String roomUUID) {
        ChannelTopic topic = topics.get(roomUUID);
        if (topic == null)
            topic = new ChannelTopic(roomUUID);
        redisMessageListener.addMessageListener(redisSubscriber, topic);
        topics.put(roomUUID, topic);
    }

    public ChannelTopic getTopic(String roomId) {
        return topics.get(roomId);
    }
}

