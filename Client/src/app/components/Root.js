import React from 'react';

import {Header} from './Header';

export class Root extends React.Component {
  render() {
    return (
            <div>
                <div>
                    <div>
                        <Header />
                    </div>
                </div>
                <hr/>
                <div>
                    <div>
                        {this.props.children}
                    </div>
                </div>
            </div>
    );
  }
}
