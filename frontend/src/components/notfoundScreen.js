import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundScreen(props) {
    return (
        <div id="NotFound">
            <div id="notfound">
                <div className="notfound" id="select2-drop">
                    <div className="notfound-404" id="select3-drop">
                    <div className="bg-warning"></div>
                    <h1>404</h1>
                    </div>
                    <h3>Faqja Nuk Egziston</h3>
                    <p>Na vjen keq! Faqja që ju po kërkoni nuk mund të gjindet.</p>
                    <Link to="/">Faqja Kryesore</Link>
                    <div className="notfound-social">
                    <a href="#"><i className="fab fa-facebook-f"></i></a>
                    <a href="#"><i className="fab fa-twitter"></i></a>
                    <a href="#"><i className="fab fa-youtube"></i></a>
                    <a href="#"><i className="fab fa-google"></i></a>
                    </div>
                </div>
            </div>
      </div>
    )
}

export default NotFoundScreen;