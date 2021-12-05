import React, { Component }  from "react";
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import MyRoom from "../MyRoom/MyRoom";
import {FormattedMessage} from 'react-intl'
import './MySpaces.css'

class MySpaces extends Component {

    constructor () {
        super();
        this.state = {
            data: [],
            id: -1,
            rooms: ''
        };
      }
    
    componentDidMount () {
        if(localStorage.getItem("spacesData")==null){
            fetch('https://gist.githubusercontent.com/josejbocanegra/0067d2b28b009140fee423cfc84e40e6/raw/6e6b11160fbcacb56621b6422684d615dc3a0d33/spaces.json')
                .then(resp => 
                    resp.json()
                )
                .then(data => {
                    localStorage.setItem("spacesData", JSON.stringify(data))
                    this.setState({data})
            });
        }else{
            this.setState({data: JSON.parse(localStorage.getItem("spacesData"))})
        }
        
    }

    renderRooms(roomid){
        if(roomid!==-1)
            this.setState({rooms: <MyRoom roomId={roomid}/>})
            this.setState({id: roomid})
    }

    render(){
        if(!this.state.data.length)
            return null;
        let cards = this.state.data.map((el, i) => (
            <Card key={el.id} onClick={() => this.renderRooms(el.id)}>
                <Card.Img variant="top" src={el.type==="house"?"https://static.vecteezy.com/system/resources/previews/001/200/294/non_2x/house-png.png":"https://foxonline.temple.edu/animations/sites/animations/files/2021-03/isometric-office-building.png"} />
                <Card.Body>
                <Card.Title>{el.name}</Card.Title>
                <Card.Text>
                    {el.address}
                </Card.Text>
                </Card.Body>
            </Card>
        ))
        return (
            <div className="mySpaces">
                <div className="tittle">
                    <h2><FormattedMessage id ="MySpaces"/></h2>
                </div>
                <CardGroup>
                    {cards}
                </CardGroup>
                {this.state.rooms}
            </div>
        );
    }
    
};

export default MySpaces;