import { useState } from "react";
import axios from "axios";
import { Header } from "./Header";
import { Loader } from "./Loader";
import { ResultPage } from "./ResultPage";

export const MainPage = () => {
  const [displayAdvancedMenu, setDisplayAdvancedMenu] = useState(false);
  const [screen, setScreen] = useState("form");

  const [formData, setFormData] = useState({
    proteinSeq: "",
    jobName: "",
    amberRelax: "Yes",
    templateMode: false,
    numRecycle: 1,
  });

  function toggleAdvancedMenu() {
    const advancedMenuButton = document.querySelector(
      'button[aria-haspopup="true"]'
    );

    setDisplayAdvancedMenu(!displayAdvancedMenu);

    if (!displayAdvancedMenu) {
      advancedMenuButton.setAttribute("aria-expanded", "true");
    } else {
      advancedMenuButton.setAttribute("aria-expanded", "false");
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setScreen("loader");

    axios
      .post("http://localhost:3001/submitdata", formData)
      .then((response) => {
        setScreen("result");
        console.log(response);
      });
  }

  return (
    <div>
      <div className="bgImage"/>
      <Header />
      {screen === "form" ? (
        <main>
          <form onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor="protein-sequence">Protein Sequence</label>
            <textarea
              id="protein-sequence"
              rows="5"
              placeholder="Enter your protein sequence here..."
              aria-required="true"
              value={formData.proteinSeq}
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  proteinSeq: e.target.value,
                }))
              }
              required
            />
            <button
              type="button"
              onClick={() => toggleAdvancedMenu()}
              aria-haspopup="true"
              aria-expanded="false"
            >
              Advanced Options
            </button>
            <br />
            {displayAdvancedMenu && (
              <div
                id="advanced-menu"
                aria-labelledby="advanced-options-heading"
              >
                <h3 id="advanced-options-heading">Advanced Options</h3>
                <div className="advanced-option">
                  <label htmlFor="job-name">Job Name</label>
                  <input
                    type="text"
                    id="job-name"
                    placeholder="Enter a job name"
                    aria-label="Job Name"
                    value={formData.jobName}
                    onChange={(e) =>
                      setFormData((prevState) => ({
                        ...prevState,
                        jobName: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="advanced-option">
                  <label htmlFor="amber-relaxation">AMBER Relaxation</label>
                  <select
                    id="amber-relaxation"
                    aria-label="AMBER Relaxation"
                    value={formData.amberRelax}
                    onChange={(e) =>
                      setFormData((prevState) => ({
                        ...prevState,
                        amberRelax: e.target.value,
                      }))
                    }
                  >
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
                <div className="advanced-option">
                  <label htmlFor="template-mode">Template Mode</label>
                  <input
                    type="checkbox"
                    id="template-mode"
                    aria-label="Template Mode"
                    value={formData.templateMode}
                    onClick={(e) =>
                      setFormData((prevState) => ({
                        ...prevState,
                        templateMode: !formData.templateMode,
                      }))
                    }
                  />
                </div>
                <div className="advanced-option">
                  <label htmlFor="num-recycle">Num-Recycle</label>
                  <select
                    id="num-recycle"
                    aria-label="Num-Recycle"
                    value={formData.numRecycle}
                    onChange={(e) =>
                      setFormData((prevState) => ({
                        ...prevState,
                        numRecycle: e.target.value,
                      }))
                    }
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </div>
              </div>
            )}
            <br />
            <button type="submit" aria-label="Submit">
              Submit
            </button>
          </form>
        </main>
      ) : screen === "loader" ? <Loader /> : <ResultPage />}
    </div>
  );
};
