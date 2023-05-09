import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './header.css'

function ContainerInsideExample() {
  return (
    <Navbar expand="lg" variant="secondary" bg="danger" className='navbar_header'>
      <Container>
        <Navbar.Brand href="#">Expense Tracker</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default ContainerInsideExample;