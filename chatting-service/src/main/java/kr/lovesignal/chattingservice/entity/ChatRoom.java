package kr.lovesignal.chattingservice.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Entity
@Table(name = "chatroom")
@Getter
@Setter
@SuperBuilder
@DynamicInsert
@NoArgsConstructor
public class ChatRoom extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roomId;
    private String type;
    private String roomName;

    @Builder.Default
    @OneToMany(mappedBy = "chatRoom")
    @JsonIgnore
    private List<Participant> participants = new ArrayList<>();

}
