import React from "react";

import Header from "../components/Header";
import { PreferencesPage } from "../components/PreferencePage";
import { RootState } from "../store";
import { useAppSelector } from "../hooks";
const MyFeedPage: React.FC = () => {
  const { preferredSources, preferredCategories, hasSetPreferences } =
    useAppSelector((state: RootState) => state.preferences);
  //   const hasSetPreferences = useSelector(
  //     (state: RootState) => state.preferences.hasSetPreferences
  //   );

  return (
    <div className="search-page">
      <Header />
      <main className="main">
        <div className="container">
          {hasSetPreferences ? <PreferencesPage /> : <PreferencesPage />}
        </div>
      </main>
    </div>
  );
};

export default MyFeedPage;
