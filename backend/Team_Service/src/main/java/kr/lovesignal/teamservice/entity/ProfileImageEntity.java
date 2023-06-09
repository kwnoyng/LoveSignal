<<<<<<<< HEAD:Team_Service/src/main/java/kr/lovesignal/teamservice/entity/ProfileImageEntity.java
package kr.lovesignal.teamservice.entity;
========
package kr.lovesignal.fileservice.entity;
>>>>>>>> be_develop_file:File_Service/src/main/java/kr/lovesignal/fileservice/entity/ProfileImageEntity.java

import com.fasterxml.jackson.databind.ser.Serializers;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

@Entity
@Table(name ="profile_image")
@Getter
@SuperBuilder
@DynamicInsert
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProfileImageEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "profile_image_id", columnDefinition = "INT UNSIGNED")
    private Long profileImageId;

    @ManyToOne
    @JoinColumn(name = "member_id", nullable = false)
    private MemberEntity member;

    @Column(name = "stored_name", nullable = false)
    private String storedName;
}
