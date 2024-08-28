package stage_test.testing.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(uniqueConstraints = {
        @UniqueConstraint(columnNames = {"nom", "prenom", "service_id"})
})
public class Collaborateur {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_col;
    private String nom;
    private String prenom;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "service_id")
    @JsonBackReference("service-collaborateur")
    private Service_Dep serviceDep;

    @OneToMany(mappedBy = "collaborateur", cascade = CascadeType.ALL)
    @JsonManagedReference("collaborateur-planning")
    private List<Planning> plannings;

    @OneToMany(mappedBy = "collaborateur", cascade = CascadeType.ALL)
    @JsonManagedReference("collaborateur-disponibilite")
    private List<Disponibilite> disponibilites;
}
