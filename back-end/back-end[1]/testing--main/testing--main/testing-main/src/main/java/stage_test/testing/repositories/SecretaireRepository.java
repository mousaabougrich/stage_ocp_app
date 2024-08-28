package stage_test.testing.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import stage_test.testing.entities.Collaborateur;
import stage_test.testing.entities.Secretaire;

import java.util.List;

public interface SecretaireRepository extends JpaRepository<Secretaire, Long> {
    Secretaire findByNomAndPrenomAndEmail(String nom, String prenom,String email);

    @Transactional
    void deleteByNomAndPrenomAndEmail(String nom, String prenom,String email);

    @Query("select s from Secretaire s where (s.nom like :kw or s.prenom like :kw)")
    List<Secretaire> searchSecretaire(@Param("kw") String keyword);
}
