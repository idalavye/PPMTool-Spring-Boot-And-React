import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createProject} from '../../actions/projectActions';

class AddProject extends Component {
    constructor(){
        super();
        this.state = {
            projectName:'',
            projectIdentifier:'',
            description:'',
            start_date:'',
            end_date:''
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e){
        this.setState({
            [e.target.name]:e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();
        const newProject = {
            projectName: this.state.projectName,
            projectIdentifier: this.state.projectIdentifier,
            description: this.state.description,
            start_date: this.state.start_date,
            end_date: this.state.end_date
        }

        this.props.createProject(newProject,this.props.history);
    }

    render() {
        return (
            <div>
                <div className="project">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 m-auto">
                                <h5 className="display-4 text-center">Create / Edit Project form</h5>
                                <hr />
                                <form onSubmit={this.onSubmit}>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control form-control-lg "
                                            placeholder="Project Name"
                                            name="projectName"
                                            onChange={this.onChange}
                                            value={this.state.projectName} />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            placeholder="Unique Project ID"
                                            name="projectIdentifier"
                                            onChange={this.onChange}
                                            value={this.state.projectIdentifier}
                                        />
                                    </div>
                                    {/* <!-- disabled for Edit Only!! remove "disabled" for the Create operation --> */}
                                    <div className="form-group">
                                        <textarea
                                            class="form-control form-control-lg"
                                            placeholder="Project Description"
                                            name="description"
                                            onChange={this.onChange}
                                            value={this.state.description}></textarea>
                                    </div>
                                    <h6>Start Date</h6>
                                    <div className="form-group">
                                        <input 
                                            type="date" 
                                            class="form-control 
                                            form-control-lg" 
                                            onChange={this.onChange}
                                            name="start_date"
                                            value={this.state.start_date} />
                                    </div>
                                    <h6>Estimated End Date</h6>
                                    <div className="form-group">
                                        <input 
                                            type="date" 
                                            class="form-control form-control-lg" 
                                            name="end_date"
                                            onChange={this.onChange}
                                            value={this.state.end_date} />
                                    </div>

                                    <input type="submit" class="btn btn-primary btn-block mt-4" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

AddProject.propTypes = {
    createProject :PropTypes.func.isRequired
}

export default connect(null,{createProject})(AddProject);