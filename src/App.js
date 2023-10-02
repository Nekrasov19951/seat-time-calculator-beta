import React, { useEffect, useState } from "react";
import ReactExport from "react-data-export";
import { InterimResult } from "./components/InterimResult";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import convertToTime from "./components/ConvertToTime";
import resultObject from "./components/ResultObject";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const initialState = [
  { day: "понеде", nofWH: 8.4, employment: 90.234, payment: 300 },
  { day: "понедельник", nofWH: "", employment: 90.234, payment: 300 },
  { total: "привет" },
];

let multiDataSet = [
  {
    columns: [
      {title: "Text", width: {wch: 15}},
      {title: "Words per hour", width: {wch: 15}, },
      {title: "Time", width: {wch: 20}, }
    ],
    data: [
      [
        {value: 0},
        {value: 0},
        {value: 0}
      ]
    ]
  },
  {
    ySteps: 1,
    columns: [
      {title: "Video", width: {wch: 15}},
      {title: "Coefficient", width: {wch: 15}},
      {title: "Time", width: {wch: 20}, }
    ],
    data: [
      [
        {value: 0},
        {value: 0},
        {value: 0}
      ]
    ]
  },
  {
    ySteps: 1,
    columns: [
      {title: "Quiz (minutes)", width: {wch: 15}},
      {title: "", width: {wch: 15}},
      {title: "Time", width: {wch: 20}, }
    ],
    data: [
      [
        {value: 0},
        {value: 0},
        {value: 0}
      ]
    ]
  },
  
  {
    ySteps: 1,
    columns: [
      {title: "Curated Text", width: {wch: 15}},
      {title: "", width: {wch: 15}},
      {title: "Time", width: {wch: 20}, }
    ],
    data: [
      [
        {value: 0},
        {value: 0},
        {value: 0}
      ]
    ]
  },
  
  {
    ySteps: 1,
    columns: [
      {title: "Curated Video", width: {wch: 15}},
      {title: "Coefficient", width: {wch: 15}},
      {title: "Time", width: {wch: 20}, }
    ],
    data: [
      [
        {value: 0},
        {value: 0},
        {value: 0}
      ]
    ]
  },
  
  {
    ySteps: 1,
    columns: [
      {title: "", width: {wch: 15}},
      {title: "", width: {wch: 15}},
      {title: "", width: {wch: 20}, }
    ],
    data: [
      [
        {value: 0},
        {value: 0},
        {value: 0}
      ]
    ]
  }
];





let text = {
  values: [0],
  wph: [1]
};


let quiz = {
  values: [0]
};

let video = {
  values: [0],
  coefs: [1]
};

let curtext = {
  values: [0],
};

let curvideo = {
  values: [0],
  coefs: [1]
};

let CommonObj = {
  text,
  quiz,
  video,
  curtext,
  curvideo
};

/* Блок с промежуточным результатом */

let InterTotal = ({ title, value }) => {
  return (
    <div className="inter-total-div">
      <div>
        <p>{title}</p>
        </div>
      <div
       className="result">{value}</div>
    </div>
  );
};

/**/

let CommonDiv = ({ obj }) => {
  let [CommonTotal, SetCommonTotal] = useState(0);
  let [Text, SetTotalText] = useState(0);
  let [Quiz, SetTotalQuiz] = useState(0)
  let [Video, SetTotalVideo] = useState(0);
  let [CurText, SetTotalCurText] = useState(0);
  let [CurVideo, SetTotalCurVideo] = useState(0);
  let [TotalCur, SetTotalCur] = useState(0)

  useEffect(() => {
    SetTotalCur(CurText + CurVideo)
    SetCommonTotal(Text + Video + CurText + CurVideo + Quiz);
    multiDataSet[0].data = resultObject.Text;
    multiDataSet[1].data = resultObject.Video;
    multiDataSet[2].data = resultObject.Quiz;
    multiDataSet[3].data = resultObject.CuratedText;
    multiDataSet[4].data = resultObject.CuratedVideo;
    multiDataSet[5].data = [
      [
        {value: 'Total Curated', style: {font: {bold: true}}},
        {value: ''},
        {value: convertToTime(CurText + CurVideo), style: {fill: {patternType: "solid", fgColor: {rgb: "e0b0fe"}}, font: {bold: true}}}
      ],
      [
        {value: 'Overall Seat Time', style: {font: {bold: true}}},
        {value: ''},
        {value: convertToTime(Text + Video + CurText + CurVideo + Quiz), style: {fill: {patternType: "solid", fgColor: {rgb: "e0b0fe"}}, font: {bold: true}}}
      ]
    ]
  });


  let [wordsPH, SetwordsPH] = useState(1);


  

  return (
    <div className="common-div container">
      <div className="header-row">
        <h1>Seat Time Calculator</h1>
      </div>

      <div className="row">
        <div>
        </div>

      </div>
      <div className="row">      
        
      <div className="col-3">
        <div>
        <span className="main-header">Text</span>
        
        <p>Enter the number of words per hour</p>
        <input onChange={(event) => {SetwordsPH(event.target.value) }}/>
        <p>Number of words</p>
        <InterimResult obj={obj.text} change={SetTotalText} wph={wordsPH} ResultObjectComp={'Text'}/>
        </div>
        <div>
        <span className="block-header">Quiz</span>
          <p>Minutes</p>
        <InterimResult obj={obj.quiz} quiz={true} change={SetTotalQuiz} ResultObjectComp={'Quiz'}/>
        </div>
        <div>
        <span className="block-header">Video</span>
          <p>Duration in sec</p>
        <InterimResult obj={obj.video} change={SetTotalVideo} addButton={true} coef={true} arrofcoef={[1, 1.5, 2, 2.5, 3, 3.5, 4]} ResultObjectComp={'Video'}/>
        </div>
      </div>
      <div className="col-6 CC">
        <div>
          <span className="main-header">Curated Content</span>
        </div>
        <div className="CC_Inputs">
          <div>
          <span className="block-header">Text</span>
          <p>Number of words</p>
          <InterimResult obj={obj.curtext} change={SetTotalCurText} wph={wordsPH} addButton={true} ResultObjectComp={'CuratedText'}/>
            </div>
          <div>
          <span className="block-header">Video</span>
          <p>Duration in sec</p>
        <InterimResult obj={obj.curvideo} change={SetTotalCurVideo} addButton={true} coef={true} arrofcoef={[1, 1.5, 2, 2.5, 3, 3.5, 4]} ResultObjectComp={'CuratedVideo'}/>

          </div>
        </div>

      </div>
      <div className="col-3">
        <div>
          <span className="main-header">Calculations</span>
        </div>
        <div className="Inter-Totals">
        <InterTotal title={"Total text"} value={convertToTime(Text)} />
        <InterTotal title={"Total video"} value={convertToTime(Video)} />
        <InterTotal title={"Quiz"} value={convertToTime(Quiz)} />
        <InterTotal title={"Total curated text"} value={convertToTime(CurText)} />
        <InterTotal title={"Total curated video"} value={convertToTime(CurVideo)} />
        <InterTotal title={"Total curated"} value={convertToTime(TotalCur)} />

        </div>
        <div>
          <span className="main-header">Overall Seat Time</span>
          <p>
            Total:
          </p>
          <div className="total">{convertToTime(CommonTotal)}</div>
        </div>
        <div>
        <span className="main-header">Export</span>
        <p>Click the button below to export</p>
          <ExcelFile element={<button>Export</button>}>
            <ExcelSheet dataSet={multiDataSet} name="Organization" />
          </ExcelFile>
        </div>
      </div>

      </div>
    </div>
  );
};

function App() {
  return <CommonDiv obj={CommonObj}/>;
}
export default App;
