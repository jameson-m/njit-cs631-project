import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ user, userType, exact, path, children }) => {
  if (user.type === '' || user.id === '' || user.type !== userType) {
    if (userType === 'student') return <Redirect to="/students" />;
    if (userType === 'faculty') return <Redirect to="/faculty" />;
    return <Redirect to="/" />;
  } else {
    return (
      <Route exact={exact} path={path}>
        {children}
      </Route>
    );
  }
};

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(PrivateRoute);
