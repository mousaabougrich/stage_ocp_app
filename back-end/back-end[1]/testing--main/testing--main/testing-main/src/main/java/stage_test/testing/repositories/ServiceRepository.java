package stage_test.testing.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import stage_test.testing.entities.Service_Dep;

import java.util.List;
import java.util.Optional;

public interface ServiceRepository extends JpaRepository<Service_Dep, Integer> {
    Service_Dep findByNom(String nom);
    void deleteByNom(String nom);
    @Query("select s from Service_Dep s where s.nom like :kw")
    List<Service_Dep> searchService(@Param("kw") String keyword);
}
