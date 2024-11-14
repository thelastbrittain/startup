import React, {useEffect, useState} from 'react';
import "./log.css"

export function Log({climber}) {
    const [topFiveRows, setTopFiveRows] = useState([]);

    useEffect(() => {
        fetch("/api/userLog")
        .then((response) => response.json())
        .then((grades) => {
            let gradesList = []
            for (const g of grades){
                gradesList.push(g.prefix + g.suffix);
            }
            gradesList = gradesList.sort(compareGrades); // sort the grades 
            console.log("Here are the sorted grades: ", gradesList);
            setTopFiveRows(organizeRows(gradesList)); // get the top 5 rows as components, set them
        });
      }, []);
    
    // useEffect(() => {
    //     let sortedGrades = [];
    //     climber = JSON.parse(localStorage.getItem("user"));
    //     const Routes = climber.routeList;
    //     for (let i = 0; i < Routes.length; i++){
    //     sortedGrades.push(Routes[i].grade.prefix + Routes[i].grade.suffix)
    //     }
    //     sortedGrades = sortedGrades.sort(compareGrades);
    //     console.log("These are the sorted Grades", sortedGrades);
    //     setGrades(sortedGrades);
    // }, []);

    function parseGrade(grade) {
        const numberPart = parseInt(grade); // Extract numeric part
        const letterPart = grade.match(/[a-zA-Z]/) ? grade.match(/[a-zA-Z]/)[0] : ''; // Extract letter part if it exists
        return { numberPart, letterPart };
    }
    
    // Custom sort function
    function compareGrades(grade1, grade2) {
        const { numberPart: num1, letterPart: let1 } = parseGrade(grade1);
        const { numberPart: num2, letterPart: let2 } = parseGrade(grade2);
        // First, compare by number (descending order)
        if (num1 !== num2) {
            return num2 - num1; // Higher numbers come first
        }
        // If numbers are equal, compare by letter (descending alphabetical order)
        if (let1 !== let2) {
            return let2.localeCompare(let1); // Higher letters come first ('d' > 'a')
        }
        return 0; // If both number and letter are equal
    }

    function organizeRows(grades){
        let i = 0;
        let gradeRows = [];
        while (i < grades.length) {
            let rowVal = grades[i];  // Get the current grade
            let rowLength = 1;       // Initialize the count for this row
            let j = i + 1;
    
            // Check for consecutive grades that are the same
            while (j < grades.length && grades[i] === grades[j]) {
                rowLength += 1;
                j += 1;
            }
    
            // Create a new Row component and push it to gradeRows
            const currentRow = <Row key={i} numOfCirlces={rowLength} grade={`5.${rowVal}`} />;
            gradeRows.push(currentRow);
    
            // Move i to j to process the next unique grade
            i = j;
        }
        return gradeRows.slice(0,5);
    }
   
    
  return (
    <>
      <main className="log-main">
        <h1 className="log-header">Welcome to your log</h1>
        <div className="pyramid"></div>
        {topFiveRows}
        <p>(This is websocket data that will be updated in real time)</p>
    </main>
    </>
  );

}

function Circle({grade}) {
    return (
        <svg width="50" height="50">
            <circle cx="25" cy="25" r="20" fill="white" stroke="black"/>
            <text x="25" y="30" fontSize="15" textAnchor="middle" fill="black">{grade}</text>
        </svg>
    )
}

function Row({numOfCirlces, grade}){
    let listOfCirlces = [];
    for (let i = 0; i < numOfCirlces; i++){
        listOfCirlces.push(<Circle key={i} grade={grade}/>);
    }
    return (<div className="row">{listOfCirlces}</div>
    );
}