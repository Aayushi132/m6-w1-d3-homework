import React, { Component } from "react";
import { Button, ButtonGroup, Container, Table } from "reactstrap";
import AppNavbar from "./Navbar";
import { Link } from "react-router-dom";

class InventoryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      isLoading: true,
    };
  }
  componentDidMount() {
    this.setState({ isLoading: true });

    fetch("api/books")
      .then((response) => response.json())
      .then((data) => this.setState({ books: data, isLoading: false }));

    console.log("books", this.state.books);
  }

  removeInv = async (id) => {
    await fetch(`/api/book/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    console.log("Remove Done!");
    // update inventory state minus removed item
    let updatedBooks = [...this.state.books].filter(
      (i) => i._id !== id
    );
    this.setState({ books: updatedBooks });
  };

  render() {
    const { books, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const InventoryList = books.map((inventory) => {
      return (
        <tr key={inventory._id}>
          <td style={{ whiteSpace: "nowrap" }}>{inventory.prodname}</td>
          <td>{inventory.author}</td>
          
          <td>
            <ButtonGroup>
              <Button
                size="sm"
                color="info"
                tag={Link}
                to={"/books/" + inventory._id}
              >
                Edit
              </Button>
              <Button
                size="sm"
                color="warning"
                onClick={() => this.removeInv(inventory._id)}
              >
                Delete
              </Button>
            </ButtonGroup>
          </td>
        </tr>
      );
    });

    return (
      <div>
        <AppNavbar />
        <Container fluid>
          <div className="float-right">
            <Button
              color="success"
              className="my-4"
              tag={Link}
              to="/books/new"
            >
              Add Book
            </Button>
          </div>
          <h3>Book List</h3>
          <Table className="mt-4">
            <thead>
              <tr>
                <th width="20%">Book Title</th>
                <th width="15%">Author</th>
                <th width="15%">Actions</th>
              </tr>
            </thead>
            <tbody>{InventoryList}</tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default InventoryList;
