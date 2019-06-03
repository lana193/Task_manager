import React, { Component, Fragment } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Container
 } from 'reactstrap';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SignUpModal from '../auth/SignUpModal';
import LogInModal from '../auth/LogInModal';
import LogOut from '../auth/LogOut';

class AppNavbar extends Component {
    state = {
        isOpen: false
    };

    static propTypes = {
        auth: PropTypes.object.isRequired
    };
    
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    render(){
        const { isAuthenticated, user } = this.props.auth;
        const authLinks = (
            <Fragment>
                <NavItem>
                    <span className='navbar-text mr-3'>
                        <strong>{ user ? `Welcome ${user.name}` : ''}</strong>
                    </span>
                </NavItem>
                <NavItem>
                    <LogOut />
                </NavItem>
            </Fragment>
        );

        const guestLinks = (
            <Fragment>
                <NavItem>
                    <SignUpModal />
                </NavItem>
                <NavItem>
                    <LogInModal />
                </NavItem>
            </Fragment>
        );

        return (
            <div>
            <Navbar color="dark" dark expand="sm" className="mb-5">
                <Container>
                    <NavbarBrand style={{textTransform: 'uppercase'}} href="/">Task Manager</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className='ml-auto' navbar>
                            {isAuthenticated ? authLinks : guestLinks}
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, null)(AppNavbar);
