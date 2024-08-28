package stage_test.testing.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import stage_test.testing.entities.Administrateur;
import stage_test.testing.services.AdministrateurService;

import java.util.List;
@CrossOrigin("*")
@RestController
@RequestMapping("/api/administrateurs")
public class AdministrateurController {

    @Autowired
    private AdministrateurService administrateurService;

    @PostMapping("/add")
    public Administrateur addAdministrateur(@RequestBody Administrateur administrateur) {
        return administrateurService.addAdministrateur(administrateur);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteAdministrateur(@PathVariable Long id) {
        administrateurService.deleteAdministrateur(id);
    }

    @PutMapping("/update/{id}")
    public Administrateur updateAdministrateur(@PathVariable Long id, @RequestBody Administrateur administrateurDetails) {
        return administrateurService.updateAdministrateur(id, administrateurDetails);
    }

    @GetMapping("/all")
    public List<Administrateur> getAllAdministrateurs() {
        return administrateurService.getAllAdministrateurs();
    }
}
