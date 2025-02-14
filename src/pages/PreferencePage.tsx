import { PreferencesPage } from "../components/PreferencePage";
import Header from "../components/Header";
export default function PreferencePage() {
  return (
    <div className="my-feed-page">
      <Header />
      <main className="main">
        <div className="container">
          <PreferencesPage />
        </div>
      </main>
    </div>
  );
}
