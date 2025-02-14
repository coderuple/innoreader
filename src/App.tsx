import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import MyFeedPage from "./pages/MyFeedPage";
import { useGetNewsSourcesQuery } from "./features/articles/newsApi";
import { useEffect } from "react";
import { useAppDispatch } from "./hooks";
import PreferencesPage from "./pages/PreferencePage";

function App() {
  const { data: sources = [] } = useGetNewsSourcesQuery();
  const dispatch = useAppDispatch();
  useEffect(() => {
    //console.log("sources", sources);
    // const newsSources = [
    //   { id: "guardian", name: "The Guardian" },
    //   { id: "nytimes", name: "New York Times" },
    //   { id: "newsapi", name: "NewsAPI" },
    // ];
    //dispatch(setSources(sources));
  }, [sources, dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MyFeedPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/preferences" element={<PreferencesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
