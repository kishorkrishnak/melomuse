import React, { useState } from "react";
import { useAppContext } from "../../../App";
import { LoginButton, LogoutButton } from "../../sections";
import Profile from "../../sections/Profile/Profile";
import ModeSwitch from "../Header/ModeSwitch";
import Searchbar from "../Header/Searchbar";

const Header = () => {
  const { token } = useAppContext();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-[#151515] rounded-md flex justify-between items-center px-3 sm:px-6 py-5 w-[100%]">
      <Searchbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="flex items-center justify-center gap-3">
        <ModeSwitch />
        {!token ? (
          <LoginButton />
        ) : (
          <>
            <Profile />
            <LogoutButton />
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
