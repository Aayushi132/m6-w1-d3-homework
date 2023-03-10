import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import AppNavbar from "./Navbar";

class InventoryEdit extends Component {
  emptyInventory = {
    prodname: "",
  
    author: "",
  };
  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyInventory,
    };
  }
  async componentDidMount() {
    if (this.props.match.params.id !== "new") {
      const inventory = await (
        await fetch(`/api/book/${this.props.match.params.id}`)
      ).json();
      this.setState({ item: inventory });
    }
  }
  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = { ...this.state.item };
    item[name] = value;
    this.setState({ item });
  };
  handleSubmit = async (event) => {
    event.preventDefault();
    const { item } = this.state;

    await fetch("/api/book", {
      method: item._id ? "PUT" : "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    this.props.history.push("/books");
  };
  render() {
    const { item } = this.state;
    const title = (
      <h2 className="mt-3">
        {/* if item has an id number, otherwise.. */}
        {item._id ? "Edit Inventory" : "Add Inventory"}
      </h2>
    );
    return (
      <div>
        <AppNavbar />
        <Container>
          {/* display the appropriate title */}
          {title}
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="prodname" className="h5 mt-3">
                Book Title
              </Label>
              <Input
                type="text"
                name="prodname"
                id="prodname"
                value={item.prodname || ""}
                onChange={this.handleChange}
                autoComplete="prodname"
              />
            </FormGroup>
            
            <FormGroup>
              <Label for="status" className="h5 mt-3">
                Author
              </Label>
              <Input
                type="text"
                name="status"
                id="status"
                value={item.status || ""}
                onChange={this.handleChange}
                autoComplete="status"
              />
            </FormGroup>
            <FormGroup>
              <Button
                color="primary"
                type="submit"
                className="mt-3"
                tag={Link}
                to="/"
              >
                Save
              </Button>{" "}
              <Button
                color="secondary"
                className="mt-3"
                tag={Link}
                to="/"
              >
                Cancel
              </Button>
            </FormGroup>
          </Form>
        </Container>
      </div>
    );
  }
}

export default InventoryEdit;
