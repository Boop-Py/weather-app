import { Container, Typography } from '@mui/material';

const Header = () => {
  return (
    <Container>
        <Typography variant="h2" component="h2" padding={6} style={{ textAlign: "center" }}>Weather Watch</Typography>
    </Container>
  );
};

export default Header;