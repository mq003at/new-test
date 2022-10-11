import { useRef, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { dateHandler2, nameHandler } from "../../js/tool_function";
import { useTranslation } from "react-i18next";
function CSVInterface() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [statusText, setStatusText] = useState({st: "", text: "Waiting for file..."});
  const { t } = useTranslation("translation", { keyPrefix: "schedule" });

  const uploadErr = useRef(null);

  function onFileUpload() {
    console.log("trigger")
    if (!selectedFile) setStatusText((statusText) => {statusText.text = t("Please put the file in the box"); return statusText});
    else if (selectedFile.name > 5000000) setStatusText((statusText) => {statusText.text = t("File size is too large."); return statusText});
    else if (!(selectedFile.name.split(".").pop() === "csv")) setStatusText((statusText) => {statusText.st = ".text-danger"; statusText.text = "This is not a .csv file"; return statusText});
    else {
      let fileString = [];
      const reader = new FileReader();
      reader.readAsText(selectedFile, "ISO-8859-1");
      reader.onload = (e) => {
        let isCSVErr = false;
        fileString = e.target.result.split("\n");
        fileString.shift();
        fileString.forEach((arr) => {
            if (arr.split(";").length !== 4) isCSVErr = true;
        })

        if (isCSVErr) setStatusText ({st: "red", text: "CSV File Error. Please get the file again."})
        else {
            setStatusText({st: "", text: "Waiting for file..."})
            // Enter codes to POST to SFTP
            const response = fetch("./send", {
                method: 'POST',
                body: fileString
            })
            console.log(response);
        }
      };
      
    }
  }

  return (
    <div className="csv-int-wrap">
      <div className="csv-title">Upload</div>
      <div className="input-group">
        <input type="file" className="form-control" id="selectedFile" accept=".csv" onChange={(e) => setSelectedFile(e.target.files[0])} />
        <button className="input-group-text" onClick={() => onFileUpload()}>
          {"Upload"}
        </button>
      </div>
      <div className={"csv-status" + statusText.st}><small>{statusText.text}</small></div>
    </div>
  );
}

export default CSVInterface;
