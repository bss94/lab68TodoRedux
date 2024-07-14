import ToDo from './containers/ToDo/ToDo';
import {Col, Container, Row} from 'react-bootstrap';

const App = () => {
  return (
    <Container>
      <Row>
        <Col/>
        <Col sm={8}>
          <ToDo/>
        </Col>
        <Col/>
      </Row>
    </Container>
  );
};

export default App;
