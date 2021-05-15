import React from 'react';
import Header from '../../Screens/header/header';
import Footer from '../../Screens/footer/footer';
import { withRouter } from 'react-router';

const Layout = withRouter((props) => {
    return (
        <div>
            <Header />
            <div>
                {props.children}
            </div>
            <Footer />
            {/* { props.location.pathname !== '/login' && props.location.pathname !== '/register' && <Footer /> } */}
        </div>
    )
})

export default Layout;