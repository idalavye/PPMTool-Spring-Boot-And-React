import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { getProjectTask, updateProjectTask } from '../../../actions/backlogActions';


class UpdateProjectTask extends Component {
    constructor() {
        super();

        this.state = {
            id: '',
            summary: '',
            acceptanceCriteria: '',
            status: '',
            priority: 0,
            dueDate: '',
            projectIdentifier: '',
            projectSequence: '',
            create_At: '',
            errors: {}
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const newProjectTask = {
            id: this.state.id,
            summary: this.state.summary,
            acceptanceCriteria: this.state.acceptanceCriteria,
            status: this.state.status,
            priority: this.state.priority,
            dueDate: this.state.dueDate,
            create_At: this.state.create_At
        }
        const { backlog_id, pt_id } = this.props.match.params;
        this.props.updateProjectTask(backlog_id, pt_id, newProjectTask, this.props.history);
    }

    componentDidMount() {
        const { backlog_id, pt_id } = this.props.match.params;
        this.props.getProjectTask(backlog_id, pt_id, this.props.history);
    }

    componentWillReceiveProps(nextProps) {
        const {
            id,
            summary,
            acceptanceCriteria,
            status,
            priority,
            dueDate,
            projectIdentifier,
            projectSequence,
            create_At
        } = nextProps.project_task;

        this.setState({
            id,
            summary,
            acceptanceCriteria,
            status,
            priority,
            dueDate,
            projectIdentifier,
            projectSequence,
            create_At
        });

        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    render() {
        const { backlog_id } = this.props.match.params;
        const { errors } = this.state;

        return (
            <div className="add-PBI">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to={`/projectBoard/${backlog_id}`} href="#" className="btn btn-light">
                                Back to Project Board
                            </Link>
                            <h4 className="display-4 text-center">Update Project Task</h4>
                            <p className="lead text-center">Project Name: {this.state.projectIdentifier} + Project Task ID: {this.state.projectSequence}</p>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid": errors.summary
                                        })}
                                        name="summary"
                                        placeholder="Project Task summary"
                                        value={this.state.summary}
                                        onChange={this.onChange} />

                                    {
                                        errors.summary && (
                                            <div className="invalid-feedback">{errors.summary}</div>
                                        )
                                    }
                                </div>
                                <div className="form-group">
                                    <textarea
                                        className="form-control form-control-lg"
                                        placeholder="Acceptance Criteria"
                                        name="acceptanceCriteria"
                                        onChange={this.onChange}
                                        value={this.state.acceptanceCriteria}></textarea>
                                </div>
                                <h6>Due Date</h6>
                                <div className="form-group">
                                    <input
                                        type="date"
                                        className="form-control form-control-lg"
                                        name="dueDate"
                                        onChange={this.onChange}
                                        value={this.state.dueDate} />
                                </div>
                                <div className="form-group">
                                    <select
                                        className="form-control form-control-lg"
                                        name="priority"
                                        onChange={this.onChange}
                                        value={this.state.priority}>
                                        <option value={0}>Select Priority</option>
                                        <option value={1}>High</option>
                                        <option value={2}>Medium</option>
                                        <option value={3}>Low</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <select
                                        className="form-control form-control-lg"
                                        name="status"
                                        onChange={this.onChange}
                                        value={this.state.status}>
                                        <option value="">Select Status</option>
                                        <option value="TO_DO">TO DO</option>
                                        <option value="IN_PROGRESS">IN PROGRESS</option>
                                        <option value="DONE">DONE</option>
                                    </select>
                                </div>

                                <input type="submit" className="btn btn-primary btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

UpdateProjectTask.propTypes = {
    getProjectTask: PropTypes.func.isRequired,
    project_task: PropTypes.object.isRequired,
    updateProjectTask:PropTypes.func.isRequired,
    errors:PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    project_task: state.backlog.project_task,
    errors: state.errors
});

export default connect(mapStateToProps, { getProjectTask, updateProjectTask })(UpdateProjectTask);