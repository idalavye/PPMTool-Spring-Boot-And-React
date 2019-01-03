package com.idalavye.ppmtool.services;

import com.idalavye.ppmtool.domain.Project;
import com.idalavye.ppmtool.exceptions.ProjectIdException;
import com.idalavye.ppmtool.repositories.ProjectRepositories;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepositories projectRepositories;

    public Project saveOrUpdateProject(Project project) {
        try {
            project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
            return projectRepositories.save(project);
        } catch (Exception e) {
            throw new ProjectIdException("Project ID '" + project.getProjectIdentifier().toUpperCase() + "' already exist");
        }
    }

    public Project findProjectByIdentifier(String projectId) {
        Project project = projectRepositories.findByProjectIdentifier(projectId.toUpperCase());
        if (project == null) {
            throw new ProjectIdException("Project does not exist");
        }
        return project;
    }

    public Iterable<Project> findAllProjects() {
        return projectRepositories.findAll();
    }

    public void deleteProjectByIdentifier(String projectId) {
        Project project = projectRepositories.findByProjectIdentifier(projectId.toUpperCase());
        if (project == null) {
            throw new ProjectIdException("Cannot Project with ID'" + projectId + "'. This project does not exist");
        }
        projectRepositories.delete(project);
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
