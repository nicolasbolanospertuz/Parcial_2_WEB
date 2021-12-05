import React from "react";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FormattedMessage } from "react-intl";
import "./MyRoom.css";
import PieChart from "../PieChart/PieChart";

class MyRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      room: "",
      roomId: "",
    };
    this.table = "";
    this.cards = "";
  }

  componentDidMount() {
    this.fetchInfo(this.props.roomId);
    this.renderCards();
  }

  componentWillReceiveProps(props) {
    const { roomId } = this.props;
    if (props.roomId !== roomId) {
      this.fetchInfo(props.roomId);
      this.renderCards();
      this.table = "";
      this.setState({ roomId: props.roomId });
    }
  }

  fetchInfo(roomId) {
    if (localStorage.getItem("roomsData") == null) {
      fetch(
        "https://gist.githubusercontent.com/josejbocanegra/92c90d5f2171739bd4a76d639f1271ea/raw/9effd124c825f7c2a7087d4a50fa4a91c5d34558/rooms.json"
      )
        .then((resp) => resp.json())
        .then((data) => {
          localStorage.setItem("roomsData", JSON.stringify(data));
          var temp = [];
          for (const el of data) {
            if (el.homeId === roomId) temp.push(el);
          }
          this.setState({ data: temp });
        });
    } else {
      var temp = [];
      var data = JSON.parse(localStorage.getItem("roomsData"));
      for (const el of data) {
        if (el.homeId === roomId) temp.push(el);
      }
      this.setState({ data: temp });
    }
  }

  renderCards() {
    this.cards = this.state.data.map((el, i) => (
      <Card key={el.homeId + el.name} onClick={() => this.renderTable(el.name)}>
        <Card.Body>
          <Card.Title>{el.name}</Card.Title>
        </Card.Body>
        <Card.Img
          variant="bottom"
          src={
            el.name === "Living room"
              ? "https://www.kindpng.com/picc/m/403-4036484_living-room-cartoon-png-transparent-png.png"
              : el.name === "Kitchen"
              ? "https://www.pngall.com/wp-content/uploads/8/Kitchen-PNG-Image-File.png"
              : "https://cdn-icons-png.flaticon.com/512/256/256641.png"
          }
        />
      </Card>
    ));
  }

  renderTable(roomType) {
    let devices = [];
    for (const el of this.state.data) {
      if (el.name === roomType) {
        for (const device of el.devices) {
          devices.push(device);
        }
      }
    }
    let tableRows = devices.map((el, i) => (
      <tr key={el.id != null ? el.id : "NA"}>
        <th>{i + 1}</th>
        <td>{el.id != null ? el.id : "NA"}</td>
        <td>{el.name}</td>
        <td>{el.desired.value}</td>
      </tr>
    ));
    this.table = (
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>ID</th>
            <th>
              <FormattedMessage id="Device" />
            </th>
            <th>
              <FormattedMessage id="Value" />
            </th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </Table>
    );
    this.setState({ room: roomType });
  }

  render() {
    if (!this.state.data.length) return null;
    this.renderCards();
    return (
      <div className="myRoom">
        <div className="tittle">
          <h2>
            <FormattedMessage id="MyRooms" />
          </h2>
        </div>
        <Container>
          <Row>
            <Col sm={8}>
              <div className="roomElements">
                <CardGroup>{this.cards}</CardGroup>
              </div>
            </Col>
            <Col sm={4}>
              <div className="tableDevices">
                {this.state.room === "" ? "" : this.table}
              </div>
            </Col>
          </Row>
        </Container>
        <PieChart data={this.state.data} outerRadius="900" innnerRadius="0" />
      </div>
    );
  }
}

export default MyRoom;
