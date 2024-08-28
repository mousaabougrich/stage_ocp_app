package stage_test.testing.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import stage_test.testing.entities.Collaborateur;
import stage_test.testing.entities.Service_Dep;

import java.util.List;

public interface CollaborateurRepository extends JpaRepository<Collaborateur, Long> {
    List<Collaborateur> findByServiceDep(Service_Dep serviceDep);
    Collaborateur findByNomAndPrenom(String nom, String prenom);
    List<Collaborateur> findByNom(String nom);


    @Transactional
    void deleteByNomAndPrenom(String nom, String prenom);


    @Query("select c from Collaborateur c where (c.nom like :kw or c.prenom like :kw) and c.serviceDep.nom = :serviceName")
    List<Collaborateur> searchCollaborateur(@Param("kw") String keyword, @Param("serviceName") String serviceName);

    @Query("select c from Collaborateur c where (c.nom like :kw or c.prenom like :kw)")
    List<Collaborateur> searchAllCollaborateur(@Param("kw") String keyword);

}
