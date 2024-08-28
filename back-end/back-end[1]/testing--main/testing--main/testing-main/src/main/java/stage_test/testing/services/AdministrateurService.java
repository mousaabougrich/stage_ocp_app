package stage_test.testing.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import stage_test.testing.entities.Administrateur;
import stage_test.testing.repositories.AdministrateurRepository;

import java.util.List;

@Service
@Transactional
public class AdministrateurService {

    @Autowired
    private AdministrateurRepository administrateurRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public Administrateur addAdministrateur(Administrateur administrateur) {
        if (administrateurRepository.findByEmail(administrateur.getEmail()) != null) {
            throw new RuntimeException("User with email " + administrateur.getEmail() + " already exists.");

        }
        String pwd=administrateur.getPassword();
        administrateur.setPassword(passwordEncoder.encode(pwd));
        return administrateurRepository.save(administrateur);
    }

    public void deleteAdministrateur(Long id) {
        administrateurRepository.deleteById(id);
    }

    public Administrateur updateAdministrateur(Long id, Administrateur administrateurDetails) {
        Administrateur administrateur = administrateurRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Admin not found with id " + id));
        administrateur.setNom(administrateurDetails.getNom());
        administrateur.setPrenom(administrateurDetails.getPrenom());
        administrateur.setEmail(administrateurDetails.getEmail());
        administrateur.setPassword(administrateurDetails.getPassword());
        administrateur.setNom_post(administrateurDetails.getNom_post());
        return administrateurRepository.save(administrateur);
    }

    public List<Administrateur> getAllAdministrateurs() {
        return administrateurRepository.findAll();
    }

    public Administrateur getAdministrateurById(Long id) {
        return administrateurRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Admin not found with id " + id));
    }
}
