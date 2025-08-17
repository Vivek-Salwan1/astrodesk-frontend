import React, { useEffect } from 'react';
import axios from 'axios';
import './styles/report.css'
import fpage from './fpage.png'
import lpage from './lpage.jpeg'
import { useUser } from './contexts/UserContext';
// import dayimg from './images/days/removed-bg.png'
// import grahimg from './images/lg3.png'
// import grahmissing from './images/lgg/Slide1.PNG'
// import grahupay from './images/green/lgg/Slide1.PNG'


function Report({ name, dob, bhagyankv, bhagyankData, mulyank, mulyankData, setShowreport, janmVar, dayData, grahData, missingandUpay, plansData, dobDigits, kuaNumber, mobileno }) {


  useEffect(() => {
    const disableContextMenu = (e) => e.preventDefault();
    const disableShiftF10 = (e) => {
      if (e.shiftKey && e.key === 'F10') {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', disableContextMenu);
    document.addEventListener('keydown', disableShiftF10);

    return () => {
      document.removeEventListener('contextmenu', disableContextMenu);
      document.removeEventListener('keydown', disableShiftF10);
    };
  }, []);

  const {userId} = useUser();
  console.log('missin and upay ', missingandUpay)
  console.log('result ', grahData)
  console.log('mobileno ', mobileno)

  const dobDigitsGrah = {
    राहु: 4,
    मंगळ: 9,
    चंद्र: 2,
    गुरू: 3,
    बुध: 5,
    केतू: 7,
    शनी: 8,
    सूर्य: 1,
    शुक्र: 6,
  };

  const specificNumbers = [
    "राहु",
    "मंगळ",
    "चंद्र",
    "गुरू",
    "बुध",
    "केतू",
    "शनी",
    "सूर्य",
    "शुक्र",
  ];


  // console.log('chandra info is ' + (chandraInfo[0].result));

  const countOccurrences = (numbers, digits, grahMapping) => {
    // Initialize the count object with all specific numbers set to 0
    let counts = numbers.reduce((acc, number) => {
      acc[number] = 0;
      return acc;
    }, {});

    // Iterate through each digit and compare with grahMapping
    digits.forEach((obj) => {
      for (let name in grahMapping) {
        if (grahMapping[name] == obj.digit) {
          counts[name] += 1;
          break; // Stop the loop once a match is found
        }
      }
    });

    return counts;
  };

  let counts = countOccurrences(specificNumbers, dobDigits, dobDigitsGrah);
  console.log('Counts of specific numbers:', counts);

  let date;
  const CurrentDate = () => {
    date = new Date().toLocaleDateString();



  }

  CurrentDate();

  const handleSaveAndPrint = () => {

    axios.post('https://astrobuddy-2wus.onrender.com/save-customer-data', {name, dob, userId,mobileno } )
    .then(resp => {
      console.log(resp.data)
    })
    .catch(err => console.log(err));


    window.print();
  }
  return (
    <div className='wrapper'>
      <div className="all">
        <div className="fpage">
          <p className='report-note'>Report Generated Successfully! Scroll Down upto bottom to save and print generated report <br /> <br /> </p> 
          <img src={fpage} alt="panchtavta sahita iamge" srcset="" />    
        </div>

        <br />
        {/* <h1>LOSSU REPORT</h1> */}

        <div className='report'>
          <div className="personalData">

            <div className="navgrahBox">

              {specificNumbers.map(number => (
                <div
                  key={number}
                  className="box"
                  style={{ color: counts[number] == 0 ? 'red' : 'black' }}
                  value='Rahu'
                >
                  {counts[number] == 0 ? number : `${number} ${counts[number]}`}
                </div>
              ))}
            </div>

            <div className="pData">
              <div className="topDetails">
                <p>|| श्री || </p>
                <p>दिनांक:-{date}</p>
              </div>


              <div className="pDetails">

                <div className="pD1">
                  <p>नाव:- <span>{name}</span> </p>
                  <p>जन्म तारीख:- <span>{dob}</span> </p>
                  <p>जन्मवार:- <span> {janmVar}</span></p>
                  <p>पत्ता:-</p>
                </div>
                <div className="pD2">
                  <p>मुलांक:- <span>{mulyank}</span></p>
                  <p>भाग्यांक:- <span>{bhagyankv}</span></p>
                  <p>कुआ नंबर:- <span> {kuaNumber}</span></p>
                </div>
              </div>

            </div>


          </div> <br /><br />

          <div>
            {/* <br /><br /> <b>जन्मवारानुसार स्वभाव:</b> */}
            <div class="page-break devider">
              <div className="image">
                <img src={dayData.dayImg} alt="img" srcset="" />
              </div>
              <div className="data"> {dayData.description} </div>
            </div>

            <br /><br />
            {/* <b>मुलांक:</b> */}
            <div class="page-break devider">
              <div className="image">
                <img src={mulyankData.mulyankImg} alt="" srcset="" />
              </div>
              <div className="data">
                {mulyankData.data}
              </div>
            </div>

            <br /><br />
            {/* <b>भाग्यांक:</b> */}
            <div class="bhagyank devider">
              <div className="image">
                <img src={bhagyankData.bhagyankImg} alt="" srcset="" />
              </div>
              <div className="data">

                {bhagyankData.data}
              </div>
            </div><br /><br /><br />

            {/* <b>प्लॅन्स:</b> */}
            <div class="plans devider">
              <div className="image">

              </div>
              <div className="data">
                {plansData}
              </div>

            </div>
          </div>


          <div>
            <div className='page-break'>
              <br /><br />
              {/* <h2>Present Grah Data</h2> */}
              {grahData.map((result) => (

                <div className='devider' key={result.id} style={{ marginBottom: '20px', padding: '10px' }}>
                  <div className="image">

                    <img src={result.whiteImg} alt="img" srcset="" />
                  </div>
                  <div className="data">
                    {/* <h3>ID: {result.id}</h3> */}
                    <p className='heading' style={{color:'darkblue'}}>{result.grahname} {result.count} </p><br />
                    <p> </p>
                    <p className='allText'><div dangerouslySetInnerHTML={{
                      __html: ` ${result.result} `
                    }} /> </p>
                  </div>

                </div>
              ))}
            </div>

            <div>
              <br />
              {/* <h2>Missing Grah Data</h2> */}
              {missingandUpay.map((data) => (
                <div className='missingAndUpay'>
                  <div className='devider' key={data.id} style={{ marginBottom: '20px', paddingLeft: '4px' }}>

                    <div className="image">
                      <img src={data.redImg} alt="img" srcset="" />
                    </div>
                    <div className="data">



                      <p className='heading' style={{color:'red'}}>{data.grahname} मिसिंग</p><br />
                      <p className='allText'> <div dangerouslySetInnerHTML={{
                        __html: `${data.missingData}`

                      }} ></div> </p>



                    </div>
                  </div><br /><br />

                  <div className="upay devider">
                    <div className="image">
                      <img src={data.greenImg} alt="" srcset="" />
                    </div>
                    <div className="data">
                      <p className="heading" style={{color:'green'}}>{data.grahname} उपाय</p><br />
                      <p className='allText'> <div dangerouslySetInnerHTML={{
                        __html: `${data.upay}`
                      }} ></div> </p>

                    </div>

                  </div>

                </div>
              ))}
            </div>

            {/* <div className='upay'>
              <br /><br /> <h2>Upay</h2>
              {missingandUpay.map((data) => (
                <div key={data.id} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
                  <h4>Missing Grah: {data.grahname}</h4>
                  <p>Upay:  <div dangerouslySetInnerHTML={{
                    __html: `${data.upay}`
                  }} ></div> </p>
                </div>
              ))}
            </div> */}


          </div><br /><br />

          <div className="fpage">
            <img src={lpage} alt="panchtavta sahita iamge" srcset="" />
          </div>

          <div className='btns'>
            <button className='goBack' onClick={() => setShowreport(false)}>Go Back</button>

            <button className='print' onClick={handleSaveAndPrint}>Save & Print Report</button>
          </div>


        </div>
      </div>
    </div>

  )
}

export default Report;