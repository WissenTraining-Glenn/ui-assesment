/*
Deposit
--------
AccountNo
IFSC
Amount
*/

import { useState } from "react";
import "../styles/component.css"

function Deposit() {
  const [error, setError] = useState('');
  const [details, setDetails] = useState({
    toAccount: "",
    toIfsc: '',
    amount: 0,
    });

  const handleDeposit = (e) => {
    e.preventDefault();
    setError('');
    if(details.toAccount.length < 6 || details.toAccount.length > 9){
        setError('Account number should be between 6 to 9 digits!');
        return;
    }
    if(details.amount <= 0){
        setError('Amount should be greater than 0!');
        return;
    }
    if(details.toIfsc == ""){
        setError('IFSC should not be empty!');
        return;
    }
    fetch('http://localhost:8585/deposit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(details),
    }).then((response) => response.text())
        .then((data) => alert(data))
        .catch((error) => alert('Error:', error));
    };

    return (
        <>
        <div>
            <h2>Register</h2>
        </div>
        <form onSubmit={handleDeposit}>
            <label>
                Account No:
                <input
                    type="text"
                    value={details.toAccount}
                    onChange={(e) => setDetails({ ...details, toAccount: e.target.value })}
                />
            </label>
            <label>
                IFSC:
                <input
                    type="text"
                    value={details.toIfsc}
                    onChange={(e) => setDetails({ ...details, toIfsc: e.target.value })}
                />
            </label>
            <label>
                Amount:
                <input
                    type="text"
                    value={details.amount}
                    onChange={(e) => setDetails({ ...details, amount: e.target.value })}
                />
            </label>
            <div>
            <span>{error}</span>
            </div>
            <div>
                <input type="submit" value="Deposit"/>
                <input type="reset" value="Reset"/>
            </div>
        </form>
        </>
    );
}

export default Deposit;