import React from "react";
import UnreadMessages from "./components/UnreadMessages";

const App: React.FC = () => {
    return (
        <div>
            <h1>Пример компонента</h1>
            <UnreadMessages />
        </div>
    );
};

export default App;