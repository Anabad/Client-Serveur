/**
 * Created by anand on 14/01/17.
 */
import React from "react";
import {connect} from "react-redux";
import {Table, Column, Cell} from 'fixed-data-table';
import Request from 'react-http-request';
import { browserHistory } from "react-router";

class Vehicles extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      vehicles : []
    };
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(event) {
    this.state[event.target.id] = event.target.value;
    console.log(this.state);
  }
  
  render() {
    return (
        <div>
          <Request
              url= { `http://localhost:3000/api/users/${this.props.user.userId}/relationships/vehicles` }
              method='get'
              accept='application/vnd.api+json'
              verbose={true}
          >
            {
              ({error, result, loading}) => {
                if (loading) {
                  return <div>loading...</div>;
                } else {
                  return <div>{JSON.stringify(result)}</div>
                  }
                  return null;
                }
              }
          </Request>
          <div className="row">
    
            <div className="medium-7 large-6 columns">
              <h1>Manage your fleet</h1>
              <button className="button">Add a vehicle</button>
            </div>
  
            <div className="medium-5 large-3 columns">
              <div className="callout secondary">
                  <div className="row">
                    <div className="small-12 columns">
                        <input type="text" placeholder="License plate"/>
                    </div>
                    <div className="small-12 columns">
                        <input type="text" placeholder="Location"/>
                    </div>
                    <div className="small-12 columns">
                      <label>In transit
                        <input type="checkbox"/>
                      </label>
                    </div>
                  </div>
              </div>
            </div>
          </div>
          <div className="row column">
            <hr/>
          </div>
          <div className="row column">
            <p className="lead">Your current fleet</p>
          </div>
          <div>
           {/* <Table
                rowHeight={50}
                rowsCount={3}
                width={5000}
                height={5000}
                headerHeight={50}>
              <Column
                  header={<Cell>Col 1</Cell>}
                  cell={<Cell>Column 1 static content</Cell>}
                  width={2000}
              />
              <Column
                  header={<Cell>Col 2</Cell>}
                  cell={<MyCustomCell mySpecialProp="column2" />}
                  width={1000}
              />
              <Column
                  header={<Cell>Col 3</Cell>}
                  cell={({rowIndex, ...props}) => (
                      <Cell {...props}>
                        Data for column 3: {rows[rowIndex][2]}
                      </Cell>
                  )}
                  width={2000}
              />
            </Table>*/}
          </div>
        </div>
    );
  }
}

const mapStateToProps = state => ({
  user : state.user
});

const mapDispatchToProps = dispatch => ({
  onUserLoggedIn : (user) => {
    dispatch({
      type: "LOGIN",
      user
    })
  },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Vehicles)