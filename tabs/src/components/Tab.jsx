import { useContext } from "react";
import { Home } from "../components/subs/Home";
import { TeamsFxContext } from "./Context";
// import config from "./sample/lib/config";

// const showFunction = Boolean(config.apiName);

export default function Tab() {
  const { themeString } = useContext(TeamsFxContext);
  console.log(themeString)
  return (
    <div className={themeString === "default" ? "" : ""}>
      <Home />
    </div>
  );
}
