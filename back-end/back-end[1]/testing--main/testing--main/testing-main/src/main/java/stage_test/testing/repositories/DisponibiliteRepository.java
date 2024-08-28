package stage_test.testing.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import stage_test.testing.entities.Collaborateur;
import stage_test.testing.entities.Disponibilite;

import java.util.List;

public interface DisponibiliteRepository extends JpaRepository<Disponibilite, Long> {
    List<Disponibilite> findByCollaborateur(Collaborateur collaborateur);


}
