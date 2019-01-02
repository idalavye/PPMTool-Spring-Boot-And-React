package com.idalavye.ppmtool.services;

import com.idalavye.ppmtool.domain.Project;
import com.idalavye.ppmtool.repositories.ProjectRepositories;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepositories projectRepositories;

    public Project saveOrUpdateProject(Project project) {

        //todo logic
        return projectRepositories.save(project);
    }
}
