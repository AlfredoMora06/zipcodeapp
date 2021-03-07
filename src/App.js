import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap-grid.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';



function City({ locationText, city, state, lat, long, population, totalWages }) {
  return (
    <div className="container pb-4">
      <div className="row justify-content-center">
        <div className="col-5">
          <div className="card">
            <div className="card-header">
              {locationText}
            </div>
            <div className="card-body">
              <ul>
                <li>State: {state}</li>
                <li>Location: {lat}, {long} </li>
                <li>Population (estimated): {population} </li>
                <li>Total Wages: {totalWages}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

function ZipSearchField({ onZipChange }) {
  return (
    <div className="text-center" >
      <label className="pr-4"><h5><strong>Zip Code: </strong></h5></label>
      <input type="text" onChange={onZipChange} />
    </div>
  );
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zipCode: '',
      cities: [],
    }
  }

  zipChanged(e) {

    let zip = e.target.value;
    // then, when you receive the result, store it in state

    if (zip.length === 5) {
      fetch("http://ctp-zip-api.herokuapp.com/zip/" + zip)
        .then((response) => response.json())
        .then(jsonResponse => {

          this.setState({
            cities: jsonResponse,
          })
        }).catch(err => {
          console.error('Error:', err);
        });


      this.setState({
        zipCode: e.target.value
      })
    }
    else {
      this.setState({
        cities: null,
      })
    }
  }




  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <Container className="py-5">
          <Row className="justify-content-center">
            <Col className="col-6">
              <ZipSearchField onZipChange={(e) => this.zipChanged(e)} />
            </Col>
          </Row>
        </Container>


        {
          (this.state.cities === null ?
            <h3 className="text-center">No Results</h3> :
            <div>
              {

                this.state.cities.map((c, index) => {

                  return <City
                    locationText={c.LocationText}
                    city={c.City}
                    state={c.State}
                    lat={c.Lat}
                    long={c.Long}
                    population={c.EstimatedPopulation}
                    totalWages={c.TotalWages}
                    key={index}
                  />

                })


                /*
                  Instead of hardcoding the following 3 cities,
                  Create them dynamically from this.state.cities
                */
              }


            </div>
          )
        }


      </div >
    );

  }
}

export default App;

/*

npm install -g npm@latest

TODO:
- Display more data about each city [X]
- remove results when extra characters are typed
- display "no results" if the zip is incorrect instead of empty
- add checks to prevent multiple requests if we know zip is invalid format
*/