import { useEffect } from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { CSVLink } from "react-csv";
import axios from "axios";
import {csvMaker} from "../../js/tool_function";

function Extra() {
  const [apiRes, setApiRes] = useState(null);

  const data = [
    ["firstname", "lastname", "email"],
    ["Ahmed", "Tomi", "ah@smthing.co.com"],
    ["Raed", "Labes", "rl@smthing.co.com"],
    ["Yezzi", "Min l3b", "ymin@cocococo.com"],
  ];

  const callApi = () => {
    let file = csvMaker(data, ";");
    fetch("/test", {
      method: 'POST',
      headers: {
        "Content-Type": 'multipart/form-data',
      },
      body: file
    })
      .then((res) => res.text())
      .then((res) => setApiRes(res));
  };

  // const downloadCsv = () => {
  //   const csvFromArrayOfArrays = convertArrayToCSV(data, {
  //     separator: ';'
  //   });
  //   const elem = document.createElement("a");
  //   const file = new Blob([csvFromArrayOfArrays], {type: "text/plain"});
  //   elem.href = URL.createObjectURL(file);
  //   elem.download = "myFile.csv";
  //   elem.click();
  // }



  useEffect(() => {
    callApi();
  }, []);

  useEffect(() => {
    if (apiRes) console.log(apiRes);
  }, [apiRes]);

  return (
    <div className="extra">
      <div className="extra title">EXTRA</div>
      {/* <Button onClick={() => downloadCsv(data, ";", "myFile")}>Download CSV</Button> */}
      {apiRes ? apiRes : "loading..."}

      
    </div>
  );
}

export default Extra;
