import { ChakraProvider } from "@chakra-ui/react";
import MovieSearch from "./MovieSearch";

function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <MovieSearch />
      </ChakraProvider>
    </div>
  );
}

export default App;
