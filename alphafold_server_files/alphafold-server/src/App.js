import "./App.css";
import { ThemeProvider, BaseStyles } from "@primer/react";
import { MainPage } from "./MainPage";
import "./styles.css";

function App() {
  return (
    <ThemeProvider>
      <BaseStyles>
        <div className="App">          
          <MainPage />
        </div>
      </BaseStyles>
    </ThemeProvider>
  );
}

export default App;
