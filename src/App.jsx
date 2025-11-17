import { MantineProvider } from '@mantine/core';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <LoginPage />
    </MantineProvider>
  );
}

export default App;
