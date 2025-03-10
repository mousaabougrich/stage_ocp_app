package stage_test.testing.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import stage_test.testing.dtos.CollaborateurDTO;
import stage_test.testing.entities.Collaborateur;
import stage_test.testing.entities.Disponibilite;
import stage_test.testing.entities.Service_Dep;
import stage_test.testing.repositories.CollaborateurRepository;
import stage_test.testing.repositories.DisponibiliteRepository;
import stage_test.testing.repositories.ServiceRepository;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CollaborateurService {

    @Autowired
    private CollaborateurRepository collaborateurRepository;

    @Autowired
    private ServiceRepository serviceRepository;
    @Autowired
    private DisponibiliteRepository disponibiliteRepository;


    public CollaborateurDTO addCollaborateur(Collaborateur collaborateur, String serviceName) {
        Service_Dep serviceDep = serviceRepository.findByNom(serviceName);
        if (serviceDep == null) {
            throw new RuntimeException("Service not found with name: " + serviceName);
        }
        collaborateur.setServiceDep(serviceDep);
        Collaborateur savedCollaborateur = collaborateurRepository.save(collaborateur);
        return new CollaborateurDTO(savedCollaborateur.getId_col(), savedCollaborateur.getNom(), savedCollaborateur.getPrenom(), serviceDep.getNom());
    }


    @Transactional
    public void deleteCollaborateur(String nom, String prenom) {
        collaborateurRepository.deleteByNomAndPrenom(nom, prenom);
    }


    @Transactional
    public CollaborateurDTO updateCollaborateur(String nom, String prenom, Collaborateur collaborateur, String serviceName) {
        Collaborateur existingCollaborateur = collaborateurRepository.findByNomAndPrenom(nom, prenom);
        if (existingCollaborateur != null) {
            Service_Dep serviceDep = serviceRepository.findByNom(serviceName);
            if (serviceDep == null) {
                throw new RuntimeException("Service not found with name: " + serviceName);
            }
            existingCollaborateur.setNom(collaborateur.getNom());
            existingCollaborateur.setPrenom(collaborateur.getPrenom());
            existingCollaborateur.setServiceDep(serviceDep);
            Collaborateur updatedCollaborateur = collaborateurRepository.save(existingCollaborateur);
            return new CollaborateurDTO(updatedCollaborateur.getId_col(), updatedCollaborateur.getNom(), updatedCollaborateur.getPrenom(), serviceDep.getNom());
        } else {
            throw new RuntimeException("Collaborateur not found with nom: " + nom + " and prenom: " + prenom);
        }
    }


    public List<CollaborateurDTO> getCollaborateursByServiceName(String serviceName) {
        Service_Dep serviceDep = serviceRepository.findByNom(serviceName);
        if (serviceDep == null) {
            throw new RuntimeException("Service not found with name: " + serviceName);
        }
        List<Collaborateur> collaborateurs = collaborateurRepository.findByServiceDep(serviceDep);
        return collaborateurs.stream()
                .map(collaborateur -> new CollaborateurDTO(collaborateur.getId_col(), collaborateur.getNom(), collaborateur.getPrenom(), serviceName))
                .collect(Collectors.toList());
    }
    public Disponibilite addDisponibilite(Long collaborateurId, Date startDate, Date endDate) {
        Collaborateur collaborateur = collaborateurRepository.findById(collaborateurId).orElseThrow(() -> new IllegalArgumentException("Invalid collaborateur ID"));
        Disponibilite disponibilite = new Disponibilite();
        disponibilite.setStartDate(startDate);
        disponibilite.setEndDate(endDate);
        disponibilite.setCollaborateur(collaborateur);
        return disponibiliteRepository.save(disponibilite);
    }

    //search collaborateur by service and keyword
    public List<CollaborateurDTO> searchCollaborateurs(String keyword, String serviceName) {
        List<Collaborateur> collaborateurs = collaborateurRepository.searchCollaborateur(keyword, serviceName);
        return collaborateurs.stream()
                .map(collaborateur -> new CollaborateurDTO(collaborateur.getId_col(), collaborateur.getNom(), collaborateur.getPrenom(), collaborateur.getServiceDep().getNom()))
                .collect(Collectors.toList());
    }


    public List<CollaborateurDTO> getAllCollaborateurs() {
        List<Collaborateur> collaborateurs = collaborateurRepository.findAll();
        return collaborateurs.stream()
                .map(collaborateur -> new CollaborateurDTO(collaborateur.getId_col(), collaborateur.getNom(), collaborateur.getPrenom(), collaborateur.getServiceDep().getNom()))
                .collect(Collectors.toList());
    }
    public List<CollaborateurDTO> searchAllCollaborateurs(String keyword) {
        List<Collaborateur> collaborateurs =collaborateurRepository.searchAllCollaborateur(keyword);
        return collaborateurs.stream()
                .map(collaborateur -> new CollaborateurDTO(collaborateur.getId_col(), collaborateur.getNom(), collaborateur.getPrenom(), collaborateur.getServiceDep().getNom()))
                .collect(Collectors.toList());
    }



}
