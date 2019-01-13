package com.idalavye.ppmtool.services;

import com.idalavye.ppmtool.domain.Backlog;
import com.idalavye.ppmtool.domain.Project;
import com.idalavye.ppmtool.domain.User;
import com.idalavye.ppmtool.exceptions.ProjectIdException;
import com.idalavye.ppmtool.exceptions.ProjectNotFoundException;
import com.idalavye.ppmtool.repositories.BacklogRepository;
import com.idalavye.ppmtool.repositories.ProjectRepositories;
import com.idalavye.ppmtool.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepositories projectRepositories;

    @Autowired
    private BacklogRepository backlogRepository;

    @Autowired
    private UserRepository userRepository;

    public Project saveOrUpdateProject(Project project, String username) {

        if (project.getId() != null) {
            Project existingProject = projectRepositories.findByProjectIdentifier(project.getProjectIdentifier());
            if (existingProject != null && (!existingProject.getProjectLeader().equals(username))) {
                throw new ProjectNotFoundException("Project not found in your account");
            }else if(existingProject == null){
                throw new ProjectNotFoundException("Project with ID : '" + project.getProjectIdentifier() + "' cannot be updated because it doesn't exists");
            }
        }

        try {
            User user = userRepository.findByUsername(username);
            project.setUser(user);
            project.setProjectLeader(user.getUsername());
            project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
            if (project.getId() == null) {
                Backlog backlog = new Backlog();
                project.setBacklog(backlog);
                backlog.setProject(project);
                backlog.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
            }
            if (project.getId() != null) {
                project.setBacklog(backlogRepository.findByProjectIdentifier(project.getProjectIdentifier().toUpperCase()));
            }
            return projectRepositories.save(project);
        } catch (Exception e) {
            throw new ProjectIdException("Project ID '" + project.getProjectIdentifier().toUpperCase() + "' already exist");
        }
    }

    public Project findProjectByIdentifier(String projectId, String username) {
        Project project = projectRepositories.findByProjectIdentifier(projectId.toUpperCase());
        if (project == null) {
            throw new ProjectIdException("Project does not exist");
        }
        if (!project.getProjectLeader().equals(username)) {
            throw new ProjectNotFoundException("Project not found in your account");
        }
        return project;
    }

    public Iterable<Project> findAllProjects(String username) {
        return projectRepositories.findAllByProjectLeader(username);
    }

    public void deleteProjectByIdentifier(String projectId, String username) {
        projectRepositories.delete(findProjectByIdentifier(projectId, username));
    }

    public Project updateProject(String projectId) {
        Project project = projectRepositories.findByProjectIdentifier(projectId.toUpperCase());
        if (project == null) {
            throw new ProjectIdException("Cannot Project with ID'" + projectId + "'. This project does not exist");
        }
        projectRepositories.save(project);
        return project;
    }
}
