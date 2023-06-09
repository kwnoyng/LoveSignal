package kr.lovesignal.teamservice.repository;


import kr.lovesignal.teamservice.entity.MemberEntity;
import kr.lovesignal.teamservice.entity.TeamEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface MemberRepository extends JpaRepository<MemberEntity, Long> {

    Optional<MemberEntity> findByUUIDAndExpired(UUID UUID, String expired);

    List<MemberEntity> findByTeamAndExpired(TeamEntity team, String expired);
}
