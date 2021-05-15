import React from 'react';
import { Link } from 'react-router-dom';

function approveMessageScreen(props) {
    return (
        <div class="alert alert-info text-center alert-general" role="alert" id="select2-drop">
            Shpallja juaj do të postohet pasi të aprovohet nga Admini, këtë mund të e shikoni në linkun:
            <Link to="/profili">Shpalljet tuaja</Link>, ju faleminderit.
      </div>
    )
}

export default approveMessageScreen;