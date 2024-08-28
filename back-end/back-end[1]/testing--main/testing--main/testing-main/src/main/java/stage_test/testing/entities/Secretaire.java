package stage_test.testing.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@DiscriminatorValue("sec")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Secretaire extends Utilisateur {
    @OneToOne
    @JoinColumn(name = "service_id")
    @JsonIgnore
    private Service_Dep serviceDep;
    @Override
    public String getRole() {
        return "ROLE_SEC";
    }
    @Override
    public int hashCode() {
        // Custom hashCode implementation
        return getId() != 0 ? Long.hashCode(getId()) : 0;
    }

    @Override
    public boolean equals(Object obj) {
        // Custom equals implementation
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Secretaire other = (Secretaire) obj;
        return getId() != 0 && getId() == other.getId();
    }
}
