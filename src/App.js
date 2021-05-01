import AppContextProvider from './components/contexts/appContextProvider';
import PageContent from './components/pageContent/pageContent';

function App() {
  return (
    <AppContextProvider>
        <div className="App">
          <PageContent />
      </div>
    </AppContextProvider>
  );
}

export default App;
