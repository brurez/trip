import React from "react";
import { Container, Button, Input, Dropdown, Form, List } from "semantic-ui-react";
import axios from "axios";
import "./App.css";

const countries = [
  { key: "br", text: "Brazil", value: "br" },
  { key: "ca", text: "Canada", value: "ca" }
];

const cities = {
  br: [{ key: "São Paulo", text: "São Paulo", value: "São Paulo" }],
  ca: [
    { key: "Montreal", text: "Montreal", value: "Montreal" },
    { key: "Vancouver", text: "Vancouver", value: "Vancouver" }
  ]
};

const Destination = ({ values, onChange, onAddClick }) => {
  const handleChange = (e, p) => {
    const { name, value } = p;
    onChange({ [name]: value });
  };

  return (
    <Form onSubmit={onAddClick}>
      <Form.Field>
        <Dropdown
          placeholder="Country"
          name="country"
          options={countries}
          value={values.country}
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field>
        <Dropdown
          placeholder="City"
          name="city"
          options={cities[values.country]}
          value={values.city}
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field>
        <label>Hotel address: </label>
        <Input
          type="text"
          name="hotelAddress"
          value={values.hotelAddress}
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field>
        <label>Budget: </label>
        <Input
          type="text"
          name="budget"
          value={values.budget}
          onChange={handleChange}
        />
      </Form.Field>
    </Form>
  );
};

const ExistingTrips = ({trips}) => (
  <List>
    {trips.map( values => {
      return (
        <List.Item>
          <h3>{values.name}</h3>
        </List.Item>
      )
    })}
  </List>
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trips: [],
      trip: {
        name: "",
        destinations: []
      }
    };
  }

  fetchApi = () => {
    axios.get('api/trips').then( res => this.setState({ trips: res.data }))
  };

  componentDidMount() {
    this.fetchApi();
  }

  save = () => {
    axios.post("/api/trips", this.state.trip).then( res => this.fetchApi());
  };

  handleDestinationChange = (change, index) => {
    const { destinations } = this.state.trip;

    this.setState({
      trip: {
        destinations: destinations.map((destination, i) => {
          if (i === index) {
            return { ...destination, ...change };
          }
          return destination;
        })
      }
    });
  };

  handleNameChange = (e, p) => this.setState({ trip: { ...this.state.trip, name: p.value }});

  addDestination = () => {
    const { destinations } = this.state.trip;
    this.setState({
      trip: {
        destinations: [...destinations, {}]
      }
    });
  };

  render() {
    const {
      trip: { destinations }
    } = this.state;
    return (
      <div className="App">
        <Container>
          <h1>Trip app</h1>
          <h2>Existing trips</h2>
          <ExistingTrips trips={this.state.trips} />
          <h2>Add new trip</h2>
          <Form.Field>
            <label>Trip name: </label>
            <Input
              type="text"
              name="name"
              value={this.state.trip.name}
              onChange={this.handleNameChange}
            />
          </Form.Field>
          <Button onClick={this.addDestination}>Add destination</Button>
          <Button onClick={this.save}>Save</Button>
          {destinations.map((values, index) => (
            <Destination
              key={index}
              values={values}
              onChange={change => this.handleDestinationChange(change, index)}
            />
          ))}
        </Container>
      </div>
    );
  }
}

export default App;
