import React from 'react';
import PropTypes from 'prop-types';
import NavItem from "../nav-item/nav-item";

const Profile = props => {
  return (
    <NavItem {...props} />
  );
};

const profileTypes ={
  title: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
}

Profile.propTypes = profileTypes.isRequired;

export default Profile;