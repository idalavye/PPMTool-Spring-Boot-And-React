import React, { Component } from 'react';
import ProjectItem from './project/ProjectItem';
import CreateProject from './project/CreateProject';
import { connect } from 'react-redux';
import { getProjects } from '../actions/projectActions';
import PropTypes from 'prop-types';

class Dashboard extends Component {

    componentDidMount() {
        this.props.getProjects();
    }

    render() {

        const { projects } = this.props.project;

        return (
            <div>
                <div className="projects">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <h1 className="display-4 text-center">Projects</h1>
                                <br />
                                <CreateProject />
                                <br />
                                <hr />
                                {projects.map(project => (
                                    <ProjectItem project={project} key={project.id} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    project: PropTypes.object.isRequired,
    getProjects: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    project: state.project
})

export default connect(mapStateToProps, { getProjects })(Dashboard);