package stage_test.testing.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import stage_test.testing.dtos.CollaborateurDTO;
import stage_test.testing.dtos.SecretaireDTO;
import stage_test.testing.entities.Collaborateur;
import stage_test.testing.entities.Secretaire;
import stage_test.testing.entities.Service_Dep;
import stage_test.testing.repositories.SecretaireRepository;
import stage_test.testing.repositories.ServiceRepository;
import stage_test.testing.repositories.UtilisateurRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SecretaireService {

    @Autowired
    private SecretaireRepository secretaireRepository;

    @Autowired
    private ServiceRepository serviceRepository;

    @Autowired
    private UtilisateurRepository utilisateurRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional
    public SecretaireDTO addSecretaire(SecretaireDTO secretaireDTO, String serviceName) {
        if (utilisateurRepository.findByEmail(secretaireDTO.getEmail()) != null) {
            throw new RuntimeException("User with email " + secretaireDTO.getEmail() + " already exists.");
        }

        Service_Dep serviceDep = serviceRepository.findByNom(serviceName);
        if (serviceDep == null) {
            throw new RuntimeException("Service not found with name: " + serviceName);
        }

        Secretaire secretaire = new Secretaire();
        secretaire.setNom(secretaireDTO.getNom());
        secretaire.setPrenom(secretaireDTO.getPrenom());
        secretaire.setEmail(secretaireDTO.getEmail());
        String pwd = secretaireDTO.getPassword();
        secretaire.setPassword(passwordEncoder.encode(pwd));
        //secretaire.setPassword(secretaireDTO.getPassword());  // Remove encoding if not needed
        secretaire.setServiceDep(serviceDep);

        Secretaire savedSecretaire = secretaireRepository.save(secretaire);

        return new SecretaireDTO(savedSecretaire.getNom(), savedSecretaire.getPrenom(), savedSecretaire.getEmail(), savedSecretaire.getPassword(), serviceDep.getNom());
    }

    @Transactional
    public void deleteSecretaire(String nom, String prenom,String email) {
        secretaireRepository.deleteByNomAndPrenomAndEmail(nom, prenom,email);
    }

    @Transactional
    public SecretaireDTO updateSecretaire(String nom, String prenom,String email, SecretaireDTO secretaireDTO, String serviceName) {
        // Log incoming parameters to verify correct reception
        System.out.println("Updating secretaire with name: " + nom + " " + prenom + " and service: " + serviceName);
        // Attempt to find the existing secretaire
        Secretaire existingSecretaire = secretaireRepository.findByNomAndPrenomAndEmail(nom, prenom, email);
        if (existingSecretaire == null) {
            throw new RuntimeException("Secretaire not found with nom: " + nom + " and prenom: " + prenom);
        }
        // Attempt to find the service
        Service_Dep serviceDep = serviceRepository.findByNom(serviceName);
        if (serviceDep == null) {
            throw new RuntimeException("Service not found with name: " + serviceName);
        }
        // Update details
        existingSecretaire.setNom(secretaireDTO.getNom());
        existingSecretaire.setPrenom(secretaireDTO.getPrenom());
        existingSecretaire.setEmail(secretaireDTO.getEmail());
        existingSecretaire.setPassword(secretaireDTO.getPassword()); // Assuming you handle password encryption elsewhere
        existingSecretaire.setServiceDep(serviceDep);
        // Save and return updated secretaire
        secretaireRepository.save(existingSecretaire);
        return new SecretaireDTO(
                existingSecretaire.getNom(),
                existingSecretaire.getPrenom(),
                existingSecretaire.getEmail(),
                existingSecretaire.getPassword(),
                serviceDep.getNom()
        );
    }


    public List<SecretaireDTO> getAllSecretaires() {
        return secretaireRepository.findAll().stream()
                .map(secretaire -> new SecretaireDTO(
                        secretaire.getNom(),
                        secretaire.getPrenom(),
                        secretaire.getEmail(),
                        secretaire.getPassword(),
                        secretaire.getServiceDep().getNom()))
                .collect(Collectors.toList());
    }

    public List<SecretaireDTO> searchSecretaire(String keyword) {
        List<Secretaire> secretaires =secretaireRepository.searchSecretaire(keyword);
        return secretaires.stream()
                .map(secretaire -> new SecretaireDTO(
                        secretaire.getNom(),
                        secretaire.getPrenom(),
                        secretaire.getEmail(),
                        secretaire.getPassword(),
                        secretaire.getServiceDep().getNom()))
                .collect(Collectors.toList());
    }

}
