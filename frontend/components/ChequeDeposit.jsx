/*
Cheque Deposit
---------------
From Account No
From IFSC
To Account No
To IFSC
Amount
*/
import { useState } from "react";
import "../styles/component.css"

function ChequeDeposit() {
    const [error, setError] = useState('');
    const [details, setDetails] = useState({
        fromAccount: "",
        toAccount: "",
        fromIfsc: '',
        toIfsc: '',
        amount: 0,
    });
    
    const handleChequeDeposit = (e) => {
        e.preventDefault();
        setError('');
        if(details.fromAccount.length < 6 || details.fromAccount.length > 9){
            setError('Account number should be between 6 to 9 digits!');
            return;
        }
        if(details.toAccount.length < 6 || details.toAccount.length > 9){
            setError('Account number should be between 6 to 9 digits!');
            return;
        }
        if(details.amount <= 0){
            setError('Amount should be greater than 0!');
            return;
        }
        if(details.fromAccount === details.toAccount){
            setError('From Account and To Account should not be same!');
            return;
        }
        if(details.fromIfsc == "" || details.toIfsc == ""){
            setError('IFSC should not be empty!');
            return;
        }
        fetch('http://localhost:8585/chequeDeposit', {
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
            <form onSubmit={handleChequeDeposit}>
                <label>
                    From Account No:
                    <input
                        type="text"
                        value={details.fromAccount}
                        onChange={(e) => setDetails({ ...details, fromAccount: e.target.value })}
                    />
                </label>
                <label>
                    From IFSC:
                    <input
                        type="text"
                        value={details.fromIfsc}
                        onChange={(e) => setDetails({ ...details, fromIfsc: e.target.value })}
                    />
                </label>
                <label>
                    To Account No:
                    <input
                        type="text"
                        value={details.toAccount}
                        onChange={(e) => setDetails({ ...details, toAccount: e.target.value })}
                    />
                </label>
                <label>
                    To IFSC:
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
                    <input type="submit" value="Cheque Deposit"/>
                    <input type="reset" value="Reset"/>
                </div>
            </form>
            </>
        );
    }

    export default ChequeDeposit;