import React from 'react';
import {Link} from 'react-router';

export const Header = props => {
  return (
        <nav>
            <div>
                <div>
                    <ul>
                        <li><Link to={'/home'}>Home</Link></li>
                        <li><Link to={'/user/10'}>User</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
  );
};
