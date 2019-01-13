import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createNewUser } from '../../actions/securityActions';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class register extends Component {

    constructor() {
        super();

        this.state = {
            username: "",
            password: "",
            fullName: "",
            confirmPassword: "",
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

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    onSubmit(e) {
        e.preventDefault();
        const newUser = {
            username: this.state.username,
            password: this.state.password,
            fullName: this.state.fullName,
            confirmPassword: this.state.confirmPassword
        }
        this.props.createNewUser(newUser, this.props.history);
    }

    render() {

        const { errors } = this.state;

        return (
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Sign Up</h1>
                            <p className="lead text-center">Create your Account</p>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid": errors.fullName
                                        })}
                                        placeholder="Full Name"
                                        name="fullName"
                                        value={this.state.fullName}
                                        onChange={this.onChange} />

                                    {
                                        errors.fullName && (
                                            <div className="invalid-feedback">{errors.fullName}</div>
                                        )
                                    }
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid": errors.username
                                        })}
                                        placeholder="Username"
                                        onChange={this.onChange}
                                        value={this.state.username}
                                        name="username" />

                                    {
                                        errors.username && (
                                            <div className="invalid-feedback">{errors.username}</div>
                                        )
                                    }

                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid": errors.password
                                        })}
                                        placeholder="Password"
                                        value={this.state.password}
                                        onChange={this.onChange}
                                        name="password" />

                                    {
                                        errors.password && (
                                            <div className="invalid-feedback">{errors.password}</div>
                                        )
                                    }
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid": errors.confirmPassword
                                        })}
                                        placeholder="Confirm Password"
                                        onChange={this.onChange}
                                        value={this.state.confirmPassword}
                                        name="confirmPassword" />

                                    {
                                        errors.confirmPassword && (
                                            <div className="invalid-feedback">{errors.confirmPassword}</div>
                                        )
                                    }
                                </div>
                                <input type="submit" className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

register.propTypes = {
    createNewUser: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    errors: state.errors
})

export default connect(mapStateToProps, { createNewUser })(register);
