import React from "react";

import Header from "../components/Header";
import { PreferencesPage } from "../components/PreferencePage";
import UserFeedList from "../components/UserFeedList";
import { useAppSelector } from "../hooks";
import { RootState } from "../store";
// import { RootState } from "../store";
// import { useAppSelector } from "../hooks";
const MyFeedPage: React.FC = () => {
  const { hasSetPreferences } = useAppSelector(
    (state: RootState) => state.preferences
  );

  return (
    <div className="my-feed-page">
      <Header />
      <main className="main">
        <div className="container">
          {!hasSetPreferences ? <PreferencesPage /> : <UserFeedList />}
        </div>
      </main>
    </div>
  );
};

export default MyFeedPage;
