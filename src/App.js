import { useState, useEffect } from 'react';
import Report from './Report';
import './styles/app.css'
import dayBydate from './data/WaranusarSwabhav';
import nineBoxData from './data/nineBoxData';
import Plans from './data/plans';
import { BhagyankData, MulyankData } from './data/mulyank_bhagyank_data';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from './componants/AdminNavbar';

function App() {

  const navigate = useNavigate();
  const [name, setName] = useState('')
  const [mobileno, setMobileno] = useState('');
  // const [formData, setFormdata] = useState({})
  const [showReport, setShowreport] = useState(false)
  const [dob, setDob] = useState('')
  const [bhagyank, setBhagyank] = useState(Number)
  const [bhagyankData, setBhagyankData] = useState('')

  const [mulyank, setMulyank] = useState(Number)
  const [mulyankData, setMulyankData] = useState('')
  const [janmVar, setJanmvar] = useState('')
  const [dayData, setDaydata] = useState('')

  const [pgrahData, setPgrahata] = useState()
  const [missingUpay, setMissingupay] = useState()


  const [plansData, setPlansData] = useState()

  const [kuaNumber, setKuaNumber] = useState()
  const [selectedGender, setSelectedGender] = useState('male');
  console.log('gender issssssss' + selectedGender)

  useEffect(() => {
    if (dob !== '') {
      const fjanmVar = janmVarFinder();
      setJanmvar(fjanmVar);

      const fDaydata = dayDataFinder(fjanmVar);
      setDaydata(fDaydata);




      //  setMulyankData(mulyankData)
      // console.log(mulyankData)





      const presentPlans = planFinder();
      setPlansData(presentPlans)

      const kuaNumber = kuaFinder(dob, selectedGender);
      setKuaNumber(kuaNumber);
      // console.log("kua number is " + kuaNumber);

      let finalBhagyank = bhagyankFinder();
      setBhagyank(finalBhagyank)
      let bhagyankfData = bhagyankDataFinder(finalBhagyank);
      setBhagyankData(bhagyankfData)

      let finalMulyank = mulyankFinder();
      setMulyank(finalMulyank)
      let mulyankfData = mulyankDataFinder(finalMulyank);
      setMulyankData(mulyankfData)


      const results = findMatchingObjects(allDigits,finalMulyank,finalBhagyank);
      setPgrahata(results)
      // results.forEach((result) => {
      //   console.log(`ID: ${result.id}`);
      //   console.log(`Grah Name: ${result.grahname}`);
      //   console.log(`Count: ${result.count}`);
      //   console.log(`Result: ${result.result}`);
      //   console.log('-------------------');
      // });

      const missingData = findMissing(allDigits,finalMulyank,finalBhagyank)
      console.log('missing data '+(missingData));
      setMissingupay(missingData)
    }
  }, [dob, selectedGender]); // Run the effect when dob changes

  // console.log('dateofbirth'+dob)
  const mulyankFinder = () => {

    let dateofBirth = dob;
    let alldigits = dateofBirth.match(/\d/g) || [];
    let dayDigits = alldigits.slice(-2);

    let sum = dayDigits.reduce((acc, digit) => acc + parseInt(digit), 0);
    while (sum > 9) {
      sum = Array.from(sum.toString()).reduce((acc, digit) => acc + parseInt(digit), 0);
    }
    return sum;

  }

  const mulyankDataFinder = (mulyanknumber) => {
    // console.log('mulyank isssssss ' +mulyanknumber);
    let mulyankinfo = MulyankData.find(obj => obj.mulyank === mulyanknumber);
    // console.log('mulyank objecttttttttt'+mulyankinfo);
    return mulyankinfo ? { data: mulyankinfo.data, mulyankImg:mulyankinfo.mulyankImg}: null ;
  }


  // console.log(typeof(alldigits));
  const bhagyankFinder = () => {
    let dateofBirth = dob;
    let alldigits = dateofBirth.match(/\d/g) || [];
    let sum = alldigits.map(Number).reduce((acc, num) => acc + num, 0);
    while (sum > 9) {
      sum = Array.from(sum.toString()).reduce((acc, digit) => acc + parseInt(digit), 0);
    }
    return sum;
  }
  const bhagyankDataFinder = (bhagyanknumber) => {

    let bhagyankinfo = BhagyankData.find(obj => obj.bhagyank === bhagyanknumber);
    return bhagyankinfo ? { data: bhagyankinfo.data , bhagyankImg:bhagyankinfo.bhayankImg} : null;
  }

  const janmVarFinder = () => {
    let dateofBirth = dob;
    let allDays = ['रविवार', 'सोमवार', 'मंगळवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'];

    let date = new Date(dateofBirth);
    let dayIndex = date.getDay();
    return allDays[dayIndex];
  }

  const dayDataFinder = (day) => {
    let dayData = dayBydate.find(obj => obj.day === day);
    return dayData ? { description: dayData.description, dayImg: dayData.dayImg } : null;
  }


  let allDigits = dob.match(/\d/g) || [];
  console.log('all digits' + (allDigits))

  // console.log('after concatination '+dobDigitsmb)
  // new code 

  // function to find present grah data
  const findMatchingObjects = (allDigits,m,b) => {
    const results = [];

    let finalAllno = allDigits.concat(m,b)
    console.log('after concatination '+finalAllno)

    // Count occurrences of each digit in allDigits
    const counts = finalAllno.reduce((acc, digit) => {
      acc[digit] = (acc[digit] || 0) + 1;
      return acc;
    }, {});

    // Iterate over the unique IDs
    Object.keys(counts).forEach((id) => {
      const count = counts[id];
      console.log('counts is' + count)

      // Find the object with the matching ID
      const object = nineBoxData.find(item => item.id == Number(id));
      console.log('object found ' + object)

      if (object) {
        // Fetch data based on count
        let result;
        switch (count) {
          case 5:
           result = object[4] + ' ' + object.grahData;
            break;
          case 4:
            result = object[4] + ', ' + object.grahData;
            break;
          case 3:
            result = object[3] + ', ' + object.grahData ;
            break;
          case 2:
            result = object[2] + ' ' + object.grahData ;
            break;
          case 1:
            result = object.grahData;
            break;
          default:
            result = object.missing + ', ' + object.upay;
        }

        // Add the result to the results array
        results.push({
          id: object.id,
          grahname: object.grahname,
          whiteImg:object.whiteImg,
          count,
          result,
        });
      }
    });

    // Sort results by count in descending order
    results.sort((a, b) => b.count - a.count);

    return results;
  };

  // function to find missing grah data and upay
const findMissing = (digits, m, b) => {
  // Combine all digits, mulyank, and bhagyank
  let allDigits = digits.concat(m, b);
  console.log('All Digits in missing :', allDigits);

  // Find missing numbers from 1 to 9
  const allNumbers = Array.from({ length: 9 }, (_, i) => i + 1);
  const missingNumbers = allNumbers.filter(num => !allDigits.some(digit => digit == num));

  console.log('Missing Numbers:', missingNumbers);

  // Match missing numbers with nineBoxData and return object.missing
  const missingData = missingNumbers.map(missingNumber => {
    const matchingObject = nineBoxData.find(item => item.id == missingNumber);
    if (matchingObject) {
      return {
        id: matchingObject.id,
        grahname: matchingObject.grahname,
        missingData: matchingObject.missing,
        upay: matchingObject.upay,
        // whiteImg: matchingObject.whiteImg ? matchingObject.whiteImg.white : null,
        redImg: matchingObject.redImg ? matchingObject.redImg : null,
        greenImg: matchingObject.greenImg ? matchingObject.greenImg : null,
      };
    }
    return null;
  }).filter(item => item !== null);

  return missingData;
};



  // function to navgrah box
  // let allDigits = [2,0,2,4,0,7,1,8]
  console.log('m and b' + mulyank, bhagyank)
  let dobDigits = allDigits.concat(mulyank, bhagyank).map(digit => ({ digit }));

  console.log('dob digits is type' + typeof (dobDigits))

  let presentPlans;


  const planFinder = () => {
    // console.log('digits:', allDigits);

    presentPlans = Plans.filter(planObj => {
      const planDigits = planObj.plan.split(',');
      return planDigits.every(digit => allDigits.includes(digit));
    });

    const planDataArray = presentPlans.map(planObj => planObj.data);
    // console.log('matching plans data:', planDataArray);
    return planDataArray;
  };

  // kua number finder 
  const kuaFinder = (dob, selectedGender) => {
    console.log('birth date: ' + dob);
    const parts = dob.split('-');
    const year = parts[0];
  
    const yearSum = year.split('').reduce((sum, digit) => sum + parseInt(digit, 10), 0);
    let kuano = ''; 
  
    if (selectedGender === 'male') {
      kuano = 11 - yearSum;
  
      // Ensure kuano is not negative
      if (kuano < 0) {
        kuano = Math.abs(kuano);
      }
  
      // Reduce kuano to a single digit
      while (kuano > 9) {
        kuano = kuano
          .toString() // Convert the number to a string
          .split('')  // Split it into individual digits
          .reduce((sum, digit) => sum + parseInt(digit, 10), 0); // Sum the digits
      }
  
    } else {
      kuano = yearSum + 4;
  
      // Ensure kuano is not negative (unlikely, but just in case)
      if (kuano < 0) {
        kuano = Math.abs(kuano);
      }
  
      // Reduce kuano to a single digit
      while (kuano > 9) {
        kuano = kuano
          .toString() // Convert the number to a string
          .split('')  // Split it into individual digits
          .reduce((sum, digit) => sum + parseInt(digit, 10), 0); // Sum the digits
      }
    }
  
    console.log('kua: ' + kuano);
    return kuano;
  };
  

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();



    setShowreport(true)
  }

 const handleLogout = ()=>{
  navigate('/')
 }

  return (
    <div className="lossu">
      <div className="admin-nav">
     <AdminNavbar/>
     </div>
      <div className={(showReport) ? 'hidefPage' : 'firstPage'}>
        {/* <h1>Form Page</h1> <br /> */}
        <form onSubmit={handleSubmit} className="lossuForm">
          <h1>Lossu Software</h1>
          <label htmlFor="name">Name </label> <input type="text" placeholder='Enter name' onChange={(e) => setName(e.target.value)} required /><br />

          <label htmlFor="dob">Date of Birth </label> <input type="date" placeholder='Enter DOB' value={dob} onChange={(e) => setDob(e.target.value)} required/><br />
          <div>
            <label htmlFor="gender">Gender</label>
            <div className="gender">  <label>  <input type="radio" name="gender" value="male" checked={selectedGender === 'male'} onChange={handleGenderChange} required />
              Male  </label>

              <label>
                <input type="radio" name="gender" value="female" checked={selectedGender === 'female'} onChange={handleGenderChange}
               required />   Female  </label>
            </div>
          </div>
          <label htmlFor="mno">Mobile Number <input type="text" name='mno'onChange={(e) => setMobileno(e.target.value)} required/> </label> <br />
          <input type="Submit" value='GenerateReport'  />
        </form>
      </div>

      <div className="secondPage">
        {showReport && <Report name={name} dob={dob} setShowreport={setShowreport} bhagyankv={bhagyank} bhagyankData={bhagyankData} mulyank={mulyank} mulyankData={mulyankData} janmVar={janmVar} dayData={dayData} grahData={pgrahData} missingandUpay={missingUpay} plansData={plansData} dobDigits={dobDigits} kuaNumber={kuaNumber} mobileno={mobileno} />}
      </div>

    </div>
  );
}

export default App;
