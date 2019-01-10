package com.idalavye.ppmtool.services;

import com.idalavye.ppmtool.domain.Backlog;
import com.idalavye.ppmtool.domain.Project;
import com.idalavye.ppmtool.domain.ProjectTask;
import com.idalavye.ppmtool.exceptions.ProjectNotFoundException;
import com.idalavye.ppmtool.repositories.BacklogRepository;
import com.idalavye.ppmtool.repositories.ProjectRepositories;
import com.idalavye.ppmtool.repositories.ProjectTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectTaskService {

    @Autowired
    private BacklogRepository backlogRepository;

    @Autowired
    private ProjectTaskRepository projectTaskRepository;

    @Autowired
    private ProjectRepositories projectRepositories;

    public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask) {
        try{
            Backlog backlog = backlogRepository.findByProjectIdentifier(projectIdentifier.toUpperCase());
            projectTask.setBacklog(backlog);

            Integer BacklogSequence = backlog.getPTSequence();
            BacklogSequence++;
            backlog.setPTSequence(BacklogSequence);

            projectTask.setProjectSequence(projectIdentifier.toUpperCase() + "-" + BacklogSequence);
            projectTask.setProjectIdentifier(projectIdentifier.toUpperCase());

//        if (projectTask.getPriority() == 0 || projectTask.getPriority() == null) {
//            projectTask.setPriority(3);
//        }

            if (projectTask.getStatus() == null || projectTask.getStatus() == "") {
                projectTask.setStatus("TO_DO");
            }

            return projectTaskRepository.save(projectTask);
        }catch (Exception e){
            throw new ProjectNotFoundException("Project Not Found");
        }
    }

    public Iterable<ProjectTask> findBacklogById(String id){

        Project project = projectRepositories.findByProjectIdentifier(id.toUpperCase());
        if (project == null){
            throw new ProjectNotFoundException(("Project with ID: '" + id + "' does not exist"));
        }

        return projectTaskRepository.findByProjectIdentifierOrderByPriority(id);
    }
}
