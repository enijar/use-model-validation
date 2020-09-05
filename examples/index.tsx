import * as React from "react";
import { render } from "react-dom";
import { hot } from "react-hot-loader/root";
import config from "./config";

function App() {
  const [example, setExample] = React.useState<any>(config[0]);

  const handleChange = React.useCallback(
    (event) => {
      const example = config.find(({ name }) => name === event.target.value);
      setExample(example);
    },
    [setExample]
  );

  return (
    <div className="App">
      <div className="App__selector">
        <select onChange={handleChange} defaultValue={example.name}>
          {config.map(({ name, label }, index) => {
            return (
              <option value={name} key={index}>
                {label}
              </option>
            );
          })}
        </select>
      </div>
      {example && (
        <div className="App__example">
          {React.createElement(example.component)}
        </div>
      )}
    </div>
  );
}

const AppRoot = hot(App);

render(<AppRoot />, document.querySelector("#app"));
