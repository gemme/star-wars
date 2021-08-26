import React,{useEffect, useState} from 'react';
import { Icon, Label, Menu, Table } from 'semantic-ui-react'

// Hooks 
export default function StarWars() {
    const [characterName, setCharacterName] = useState(null);
    const [films, setFilms] = useState([]);
    useEffect(() => {

        async function handlerStarwars(){
           
            const response = await fetch('https://swapi.dev/api/people/4', {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                headers: {
                  'Content-Type': 'application/json'
                  // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                // body: JSON.stringify(data) // body data type must match "Content-Type" header
              });
            const data = await response.json();
            setCharacterName(data.name);

            const promisesFilms = data.films.map(film => {
                return fetch(film).then(response => response.json());
            });

            const filmsFormatted = await Promise.all(promisesFilms)
            setFilms(filmsFormatted);
        } 
        try{
            handlerStarwars();
        }catch(error){
            console.log('error', error);
        }
        
        
    }, []);

    return (
        <div style={{
            height: 300,
            width: 600
        }}>

        <h1>{characterName}</h1>
        
        <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Director</Table.HeaderCell>
            <Table.HeaderCell>Producer</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
    
        <Table.Body>
            {
                films.map(film => {
                    return (
                        <Table.Row>
                            <Table.Cell>
                            <Label ribbon>{film.title}</Label>
                            </Table.Cell>
                            <Table.Cell>{film.director}</Table.Cell>
                            <Table.Cell>{film.producer}</Table.Cell>
                        </Table.Row>
                    )
                })
            }
        </Table.Body>
    
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan='3'>
              <Menu floated='right' pagination>
                <Menu.Item as='a' icon>
                  <Icon name='chevron left' />
                </Menu.Item>
                <Menu.Item as='a'>1</Menu.Item>
                <Menu.Item as='a'>2</Menu.Item>
                <Menu.Item as='a'>3</Menu.Item>
                <Menu.Item as='a'>4</Menu.Item>
                <Menu.Item as='a' icon>
                  <Icon name='chevron right' />
                </Menu.Item>
              </Menu>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
      </div>
      )
}


/* export default class StarWars extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            characterName: null,
            films: []
        };
    }

    componentDidMount(){
        fetch('https://swapi.dev/api/people/4', {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            // body: JSON.stringify(data) // body data type must match "Content-Type" header
          })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            this.setState({
                characterName: data.name
            });
            return data.films;
        })
        .then(films => {
            const promisesFilms = films.map(film => {
                return fetch(film).then(response => response.json());
            });

            Promise
            .all(promisesFilms)
            .then(filmsFormatted => {
                // filmsFormatted[0].director;
                this.setState({
                    films: filmsFormatted
                });
            });
        })
    }

    render(){
        return (
        <div style={{
            height: 200,
            width: 300
        }}>

        <h1>{this.state.characterName}</h1>
        
        <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Director</Table.HeaderCell>
            <Table.HeaderCell>Producer</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
    
        <Table.Body>
            {
                this.state.films.map(film => {
                    return (
                        <Table.Row>
                            <Table.Cell>
                            <Label ribbon>{film.title}</Label>
                            </Table.Cell>
                            <Table.Cell>{film.director}</Table.Cell>
                            <Table.Cell>{film.producer}</Table.Cell>
                        </Table.Row>
                    )
                })
            }
        </Table.Body>
    
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan='3'>
              <Menu floated='right' pagination>
                <Menu.Item as='a' icon>
                  <Icon name='chevron left' />
                </Menu.Item>
                <Menu.Item as='a'>1</Menu.Item>
                <Menu.Item as='a'>2</Menu.Item>
                <Menu.Item as='a'>3</Menu.Item>
                <Menu.Item as='a'>4</Menu.Item>
                <Menu.Item as='a' icon>
                  <Icon name='chevron right' />
                </Menu.Item>
              </Menu>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
      </div>
      )

    }

}
 */