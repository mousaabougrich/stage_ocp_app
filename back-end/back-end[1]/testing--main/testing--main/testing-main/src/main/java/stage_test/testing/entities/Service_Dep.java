package stage_test.testing.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Service_Dep {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_s;
    @Column(unique = true, nullable = false)
    private String nom;

    @OneToOne(mappedBy = "serviceDep")
    private Secretaire secretaire;

    @OneToMany(mappedBy = "serviceDep", cascade = CascadeType.ALL)
    @JsonManagedReference("service-collaborateur")
    private List<Collaborateur> collaborateurs;

    @OneToMany(mappedBy = "serviceDep", cascade = CascadeType.ALL)
    @JsonManagedReference("service-planning")
    private List<Planning> plannings;
}
