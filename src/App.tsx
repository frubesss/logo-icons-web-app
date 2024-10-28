import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { LogoIcon } from "./LogoIcon.tsx";
import SearchIcon from "./SearchIcon.svg";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isPending } = useQuery({
    queryKey: ["logoIcons"],
    queryFn: async (): Promise<string[]> => {
      const response = await fetch(
        "https://logo-icons-lookup-api.deno.dev/all_logo_icons",
      );
      return await response.json();
    },
  });

  const filteredData = data?.filter((logo) =>
    logo.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div>
      <header>
        <a href="https://github.com/frubesss/logo-icons-web-app">Github</a>
      </header>
      <main>
        <h1 style={{ textAlign: "center", marginBottom: "48px" }}>
          Logo Icons
        </h1>
        <input
          style={{
            background: `url('${SearchIcon}') no-repeat 10px #fff`,
            padding: "16px 8px 16px 40px",
            width: "100%",
            marginBottom: "40px",
            borderRadius: "8px",
            border: 0,
            boxShadow:
              "0 1px 3px 0 rgb(0 0 0 / 10%), 0 1px 2px 0 rgb(0 0 0 / 6%)",
          }}
          type="search"
          placeholder={`Search ${data?.length ?? "100"} icons...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {isPending ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            Loading logo icons...
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {filteredData?.map((logo) => <LogoIcon logo={logo} key={logo} />)}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
