import React, { useState } from 'react';
import "./updateLog.css"
import { useNavigate } from 'react-router-dom';
import { Climber } from '../../public/climber';
import { Route } from '../../public/route';
import { Grade } from '../../public/grade';
import { Style } from '../../public/style';

export function UpdateLog({props}) {
    const navigate = useNavigate();
    const [style, setStyle] = useState('Solo');
    const [style2, setStyle2] = useState("None");
    const [prefix, setPrefix] = useState('6');
    const [suffix, setSuffix] = useState('');
    const [notes, setNotes] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        updateClimber();
        navigate('/postUpdateLog');
    }
    
    async function updateClimber() {
        const response = await fetch(`/api/auth/logRoute`, {
          method: 'post',
          body: JSON.stringify({ email: props.userName, 
                                route: {"prefix": prefix, 
                                    "suffix": suffix, "style": style, 
                                    "style2": style2, "notes": notes}}),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        });
        if (response?.status === 200) {
            console.log("Success");
        } else {
          const body = await response.json();
          console.log(`⚠ Error: ${body.msg}`);
        }
      }

    const handleGradeChange = (event) => {
        const gradeValue = event.target.value; // e.g., "5.10a"
        const gradeParts = gradeValue.split('.');
        if (gradeParts.length === 2) {
            const numberAndLetter = gradeParts[1];
            const numberPart = numberAndLetter.slice(0, -1); // Extract number part (e.g., "10")
            const letterPart = numberAndLetter.slice(-1); // Extract letter part (e.g., "a")
            setPrefix(numberPart);
            setSuffix(letterPart);
        }
    };

    const handleStyleChange = (event) => {
        let selectedStyle = event.target.value;
        if (["Onsight", "Flash", "Redpoint", "Pinkpoint", "Fell/Hung"].includes(selectedStyle)){
            setStyle("Lead");
            setStyle2(selectedStyle);
        } else {
            setStyle(selectedStyle);
            setStyle2("None");
        }
    }

    const handleNotesChange = (event) => {
        setNotes(event.target.value);
    }
    
  return (
    <main className="updateLog-main">
        <h1 className="updateLog-header">Update Your Climbing Log</h1>
        {/* <!-- Change this to a post method later --> */}
        <form onSubmit={handleSubmit} className="updateLog-form"> 
            <div className="mb-3">
                <label htmlFor="routeGrade" className="form-label">Route Grade: </label>
                <select id="routeGrade" name="varrouteGrade" className="form-select"
                onChange={handleGradeChange}>
                <optgroup label="Sub 10">
                    <option>5.6</option>
                    <option>5.7</option>
                    <option>5.8</option>
                    <option>5.9</option>
                </optgroup>
                <optgroup label="10a-10d">
                    <option>5.10a</option>
                    <option>5.10b</option>
                    <option>5.10c</option>
                    <option>5.10d</option>
                </optgroup>
                <optgroup label="11a-11d">
                    <option>5.11a</option>
                    <option>5.11b</option>
                    <option>5.11c</option>
                    <option>5.11d</option>
                </optgroup>
                <optgroup label="12a-12d">
                    <option>5.12a</option>
                    <option>5.12b</option>
                    <option>5.12c</option>
                    <option>5.12d</option>
                </optgroup>
                </select>    
            </div>

            <div className="mb-3">
                <label htmlFor="Style" className="form-label">Style:</label>
                <select id="Style" name="varStyle" className="form-select"
                onChange={handleStyleChange}>
                    <option>Solo</option>
                    <option>TR</option>
                    <option>Follow</option>
                    <optgroup label="Lead">
                        <option>Onsight</option>
                        <option>Flash</option>
                        <option>Redpoint</option>
                        <option>Pinkpoint</option>
                        <option>Fell/Hung</option>
                    </optgroup>
                </select>
            </div>

            <div className="mb-3">
                <label htmlFor="routeNotes" className="form-label">Additional Notes: </label>
                <textarea id="routeNotes" name="varrouteNotes" className="form-control" rows="4" placeholder="Enter any notes"
                onChange={handleNotesChange}></textarea>
            </div>
            <button type="submit" className="btn btn-primary w-100">Submit</button>
        </form>
    </main>
  );
}