/*
Withdrawal
-----------
AccountNo
IFSC
Amount
*/

import { useState } from "react";
import "../styles/component.css"

function Withdraw() {
    const [error, setError] = useState('');
    const [details, setDetails] = useState({
        fromAccount: "",
        fromIfsc: '',
        amount: 0,
    });
    
    const handleWithdraw = (e) => {
        e.preventDefault();
        setError('');
        if(details.fromAccount.length < 6 || details.fromAccount.length > 9){
            setError('Account number should be between 6 to 9 digits!');
            return;
        }
        if(details.amount <= 0){
            setError('Amount should be greater than 0!');
            return;
        }
        fetch('http://localhost:8585/withdraw', {
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
            <form onSubmit={handleWithdraw}>
                <label>
                    Account No:
                    <input
                        type="text"
                        pattern="[0-9]{6,9}"
                        value={details.fromAccount}
                        onChange={(e) => setDetails({ ...details, fromAccount: e.target.value })}
                    />
                </label>
                <label>
                    IFSC:
                    <input
                        type="text"
                        value={details.fromIfsc}
                        onChange={(e) => setDetails({ ...details, fromIfsc: e.target.value })}
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
                    <input type="submit" value="Withdraw"/>
                    <input type="reset" value="Reset"/>
                </div>
            </form>
            </>
        );
    }

export default Withdraw;