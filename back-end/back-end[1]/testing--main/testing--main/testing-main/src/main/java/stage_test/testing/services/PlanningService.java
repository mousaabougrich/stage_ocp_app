package stage_test.testing.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import stage_test.testing.entities.Collaborateur;
import stage_test.testing.entities.Planning;
import stage_test.testing.entities.Service_Dep;
import stage_test.testing.repositories.CollaborateurRepository;
import stage_test.testing.repositories.PlanningRepository;
import stage_test.testing.repositories.ServiceRepository;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class PlanningService {

    @Autowired
    private PlanningRepository planningRepository;

    @Autowired
    private ServiceRepository serviceDepRepository;

    @Autowired
    private CollaborateurRepository collaborateurRepository;

    public List<Planning> getGuardDutySchedule(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        int dayOfWeek = calendar.get(Calendar.DAY_OF_WEEK);

        if (dayOfWeek == Calendar.SATURDAY || dayOfWeek == Calendar.SUNDAY) {
            return planningRepository.findByIsGuardDutyTrueAndDate(date);
        }

        return null;
    }

    public void updateGuardDutySchedule() {
        List<Service_Dep> services = getAllServices();
        for (Service_Dep service : services) {
            List<Collaborateur> collaborateurs = service.getCollaborateurs();
            if (!collaborateurs.isEmpty()) {
                for (Collaborateur collaborateur : collaborateurs) {
                    List<Planning> guardDuties = planningRepository.findByCollaborateurAndIsGuardDutyTrue(collaborateur);
                    for (Planning guardDuty : guardDuties) {
                        if (!isAvailable(collaborateur, guardDuty.getDate())) {
                            Collaborateur newCollaborator = getNextAvailableCollaborator(service, guardDuty.getDate(), collaborateur);
                            if (newCollaborator != null && !newCollaborator.equals(collaborateur)) {
                                guardDuty.setCollaborateur(newCollaborator);
                                planningRepository.save(guardDuty);
                            }
                        }
                    }
                }
            }
        }

        // Ensure each collaborator gets equal guard duties
        for (Service_Dep service : services) {
            List<Collaborateur> collaborateurs = service.getCollaborateurs();
            Map<Collaborateur, Long> guardDutyCounts = new HashMap<>();
            for (Collaborateur collaborateur : collaborateurs) {
                long count = planningRepository.findByCollaborateurAndIsGuardDutyTrue(collaborateur).size();
                guardDutyCounts.put(collaborateur, count);
            }

            List<Map.Entry<Collaborateur, Long>> sortedCollaborateurs = guardDutyCounts.entrySet().stream()
                    .sorted(Map.Entry.comparingByValue())
                    .collect(Collectors.toList());

            Date nextSaturday = getNextSaturday();
            for (Map.Entry<Collaborateur, Long> entry : sortedCollaborateurs) {
                Collaborateur collaborateur = entry.getKey();
                if (isAvailable(collaborateur, nextSaturday)) {
                    scheduleGuardDuty(nextSaturday, collaborateur, service);
                    scheduleGuardDuty(getNextSunday(nextSaturday), collaborateur, service);
                    nextSaturday = getNextSaturdayFromDate(nextSaturday);
                }
            }
        }
    }

    public Planning addGuardDuty(Date date, Collaborateur collaborateur, Service_Dep serviceDep) {
        Planning planning = new Planning();
        planning.setDate(date);
        planning.setCollaborateur(collaborateur);
        planning.setServiceDep(serviceDep);
        planning.setGuardDuty(true);
        return planningRepository.save(planning);
    }

    public void fillPlanningTable(Date startDate, Date endDate) {
        List<Service_Dep> services = getAllServices();
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(startDate);

        while (!calendar.getTime().after(endDate)) {
            Date currentDate = calendar.getTime();
            int dayOfWeek = calendar.get(Calendar.DAY_OF_WEEK);

            if (dayOfWeek == Calendar.SATURDAY) {
                for (Service_Dep service : services) {
                    List<Collaborateur> collaborateurs = service.getCollaborateurs();
                    if (!collaborateurs.isEmpty()) {
                        Collaborateur selectedCollaborator = getNextAvailableCollaborator(service, currentDate, null);
                        if (selectedCollaborator != null) {
                            scheduleGuardDuty(currentDate, selectedCollaborator, service);
                            scheduleGuardDuty(getNextSunday(currentDate), selectedCollaborator, service);
                        }
                    }
                }
            }
            calendar.add(Calendar.DATE, 1);
        }
    }

    private void scheduleGuardDuty(Date date, Collaborateur collaborator, Service_Dep service) {
        Planning planning = new Planning();
        planning.setCollaborateur(collaborator);
        planning.setServiceDep(service);
        planning.setDate(date);
        planning.setGuardDuty(true);
        planningRepository.save(planning);
    }

    private Collaborateur getNextAvailableCollaborator(Service_Dep service, Date date, Collaborateur excludedCollaborator) {
        List<Collaborateur> collaborateurs = service.getCollaborateurs();
        List<Collaborateur> availableCollaborateurs = collaborateurs.stream()
                .filter(c -> isAvailable(c, date) && (excludedCollaborator == null || !c.equals(excludedCollaborator)))
                .collect(Collectors.toList());

        // Sort collaborators by the number of guard duties they have had
        availableCollaborateurs.sort(Comparator.comparingInt(this::getGuardDutyCount));

        if (availableCollaborateurs.isEmpty()) {
            return null;
        }

        return availableCollaborateurs.get(0);
    }

    private int getGuardDutyCount(Collaborateur collaborateur) {
        return planningRepository.findByCollaborateurAndIsGuardDutyTrue(collaborateur).size();
    }

    private boolean isAvailable(Collaborateur collaborateur, Date date) {
        Date nextSunday = getNextSunday(date);
        return collaborateur.getDisponibilites().stream()
                .noneMatch(disponibilite -> !date.before(disponibilite.getStartDate()) && !nextSunday.after(disponibilite.getEndDate()));
    }

    private Date getNextSaturday() {
        Calendar calendar = Calendar.getInstance();
        int dayOfWeek = calendar.get(Calendar.DAY_OF_WEEK);
        int daysUntilSaturday = (Calendar.SATURDAY - dayOfWeek + 7) % 7;
        calendar.add(Calendar.DAY_OF_WEEK, daysUntilSaturday);
        return calendar.getTime();
    }

    private Date getNextSunday(Date nextSaturday) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(nextSaturday);
        calendar.add(Calendar.DATE, 1);
        return calendar.getTime();
    }

    private Date getNextSaturdayFromDate(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.add(Calendar.WEEK_OF_YEAR, 1);
        return calendar.getTime();
    }

    private List<Service_Dep> getAllServices() {
        return serviceDepRepository.findAll();
    }

    private List<Collaborateur> getAllCollaborateurs() {
        return collaborateurRepository.findAll();
    }

    public List<Planning> getPlanningByDate(Date date) {
        return planningRepository.findByDate(date);
    }

    public void deletePlanning(int planningId) {
        if (!planningRepository.existsById(planningId)) {
            throw new RuntimeException("Planning not found with ID: " + planningId);
        }
        planningRepository.deleteById(planningId);
    }
}
