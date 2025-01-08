import React from "react";
import { Navbar } from "./components/Navbar";
import Main from "./components/Main";
import Input from "./components/Input";
import Chat from "./components/Chats";

function App() {
  return (
    <div className="flex h-screen max-w-screen">
      <Navbar />
      <div>
        {/* <Input/> */}
        {/* <Main/> */}
        {/* used chat component instead of Input and Main*/}
        <Chat />
      </div>
    </div>
  );
}

export default App;
