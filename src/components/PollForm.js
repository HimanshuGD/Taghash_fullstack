import React, { useState } from 'react';
import DatePicker from 'react-datepicker'; 
import 'react-datepicker/dist/react-datepicker.css'; 
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import Bar from './bar';
import { useNavigate } from 'react-router-dom';
import './p.css'

function PollForm() {
    const [name, setName] = useState('');
    const [votingChoice, setVotingChoice] = useState(true);
    const [dateOfSubmission, setDateOfSubmission] = useState(new Date());
    const navigate = useNavigate();

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const formattedDate = dateOfSubmission.toISOString().split('T')[0];

        try {
            const response = await fetch('http://localhost:3000/vote', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    voting_choice: votingChoice,
                    casted_at: formattedDate,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(`Vote submitted with ID: ${data.id}`);
            } else {
                console.error('Failed to submit vote');
            }
        } catch (error) {
            console.error('An error occurred while submitting the vote:', error);
        }
    };

    return (
        <div>
            <div className='poll-form'>
            <h1 style={{justifyContent:'center', textAlign:'center'}}>Poll Station</h1>
            <form onSubmit={handleFormSubmit}>
                <div style={{justifyContent:'center', }}>
                <label htmlFor="name" style={{justifyContent:'center', textAlign:'center'}}>Name:</label>
                <input
                style={{justifyContent:'center' ,textAlign:'center'}}
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                /><br /><br />
                </div>
                <label>Vote Choice:</label>
                <input
                    type="radio"
                    id="true"
                    name="votingChoice"
                    value={true}
                    checked={votingChoice === true}
                    onChange={() => setVotingChoice(true)}
                    required
                /> Yes
                <input
                    type="radio"
                    id="false"
                    name="votingChoice"
                    value={false}
                    checked={votingChoice === false}
                    onChange={() => setVotingChoice(false)}
                    required
                /> No<br /><br />

                <label>Date of Submission:</label>
                <DatePicker
                    selected={dateOfSubmission}
                    onChange={(date) => setDateOfSubmission(date)}
                    dateFormat="dd-MM-yyyy"
                /><br /><br />

                <button type="submit">Submit</button>
            </form>
            </div>
            

        </div>
    );
}

export default PollForm;


