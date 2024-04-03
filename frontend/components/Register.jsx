import { useState } from "react";
import "../styles/component.css"

function Register() {
    const [error, setError] = useState('');
    const [details, setDetails] = useState({
        name: '',
        accountNumber: 0,
        ifsc: '',
        balance: 0,
    });

    const handleRegister = (e) => {
        e.preventDefault();
        setError('');
        if (!details.name || !details.accountNumber || !details.ifsc || !details.balance) {
            setError('All fields are mandatory!');
            return;
        }
        if (details.accountNumber.length < 6 || details.accountNumber.length > 9) {
            setError('Account number should be between 6 to 9 digits!');
            return;
        }
        if (details.balance <= 0) {
            setError('Initial amount should be greater than 0!');
            return;
        }
        fetch('http://localhost:8585/register', {
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
        <form onSubmit={handleRegister}>
            <label>
                Name:
                <input
                    type="text"
                    value={details.name}
                    onChange={(e) => setDetails({ ...details, name: e.target.value })}
                />
            </label>
            <label>
                Account No:
                <input
                    type="text"
                    pattern="[0-9]{6,9}"
                    value={details.accountNumber}
                    onChange={(e) => setDetails({ ...details, accountNumber: e.target.value })}
                />
            </label>
            <label>
                IFSC:
                <input
                    type="text"
                    value={details.ifsc}
                    onChange={(e) => setDetails({ ...details, ifsc: e.target.value })}
                />
            </label>
            <label>
                Initial Amount:
                <input
                    type="number"
                    value={details.balance}
                    onChange={(e) => setDetails({ ...details, balance: e.target.value })}
                />
            </label>
            <div>
            <span>{error}</span>
            </div>
            <div>
                <input type="submit" value="Register"/>
                <input type="reset" value="Reset"/>
            </div>
        </form>
        </>
    );
}

export default Register;