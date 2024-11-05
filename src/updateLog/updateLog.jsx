import React from 'react';
import "./updateLog.css"
import { useNavigate } from 'react-router-dom';

export function UpdateLog() {
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        navigate('/postUpdateLog');
    }


  return (
    <main class="updateLog-main">
        <h1 class="updateLog-header">Update Your Climbing Log</h1>
        {/* <!-- Change this to a post method later --> */}
        <form onSubmit={handleSubmit} class="updateLog-form"> 
            <div class="mb-3">
                <label for="routeGrade" class="form-label">Route Grade: </label>
                <select id="routeGrade" name="varrouteGrade" class="form-select">
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

            <div class="mb-3">
                <label for="Style" class="form-label">Style:</label>
                <select id="Style" name="varStyle" class="form-select">
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

            <div class="mb-3">
                <label for="routeNotes" class="form-label">Additional Notes: </label>
                <textarea id="routeNotes" name="varrouteNotes" class="form-control" rows="4" placeholder="Enter any notes"></textarea>
            </div>
            <button type="submit" class="btn btn-primary w-100">Submit</button>
        </form>
    </main>
  );
}