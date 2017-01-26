import React from 'react';

export default class Root extends React.Component {
  render() {
    return (
            <div>
                <div>
                    <div>
                        {this.props.children}
                    </div>
                </div>
            </div>
    );
  }
}
