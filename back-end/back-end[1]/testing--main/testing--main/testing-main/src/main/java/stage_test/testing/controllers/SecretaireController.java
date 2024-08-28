package stage_test.testing.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import stage_test.testing.dtos.CollaborateurDTO;
import stage_test.testing.dtos.SecretaireDTO;
import stage_test.testing.services.SecretaireService;

import java.util.List;
@CrossOrigin("*")
@RestController
@RequestMapping("/api/secretaires")
public class SecretaireController {

    @Autowired
    private SecretaireService secretaireService;

    @PostMapping("/add")
    public SecretaireDTO addSecretaire(@RequestBody SecretaireDTO secretaireDTO, @RequestParam String serviceName) {
        return secretaireService.addSecretaire(secretaireDTO, serviceName);
    }

    @DeleteMapping("/delete")
    public void deleteSecretaire(@RequestParam String nom, @RequestParam String prenom,@RequestParam String email) {
        secretaireService.deleteSecretaire(nom, prenom,email);
    }

    @PutMapping("/update")
    public SecretaireDTO updateSecretaire(
            @RequestParam String nom,
            @RequestParam String prenom,
            @RequestParam String email,
            @RequestParam String serviceName,
            @RequestBody SecretaireDTO secretaireDTO
            ) {
        return secretaireService.updateSecretaire(nom, prenom,email,secretaireDTO, serviceName);
    }


    @GetMapping("/all")
    public List<SecretaireDTO> getAllSecretaires() {
        return secretaireService.getAllSecretaires();
    }

    @GetMapping("/all/search")
    public List<SecretaireDTO> searchSecretaires(@RequestParam(name="keyword", defaultValue = "") String keyword) {
        return secretaireService.searchSecretaire("%"+keyword+"%");
    }
}
