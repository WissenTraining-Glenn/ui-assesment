import {useState} from "react";

function Balance() {
    const [error, setError] = useState('');
    const [details, setDetails] = useState({
        accountNumber: "",
        ifsc: '',
    });
    const [balance, setBalance] = useState(null);

    const handleBalance = (e) => {
        e.preventDefault();
        setError('');
        if (details.accountNumber.length < 6 || details.accountNumber.length > 9) {
            setError('Account number should be between 6 to 9 digits!');
            return;
        }
        fetch(`http://localhost:8585/balance/${details.accountNumber}/${details.ifsc}`)
            .then((response) => response.text())
            .then((data) => setBalance(data))
            .catch((error) => alert('Error:', error));
    }

    return (
        <>
            <div>
                <h2>Balance</h2>
            </div>
            <form onSubmit={handleBalance}>
                <label>
                    Account No:
                    <input
                        type="text"
                        pattern="[0-9]{6,9}"
                        value={details.accountNumber}
                        onChange={(e) => setDetails({...details, accountNumber: e.target.value})}
                    />
                </label>
                <label>
                    IFSC:
                    <input
                        type="text"
                        value={details.ifsc}
                        onChange={(e) => setDetails({...details, ifsc: e.target.value})}
                    />
                </label>
                {balance !== null &&
                <label>
                    Balance: 
                    <input type="text" disabled value={balance} />
                </label>
}
                <div>
            <span>{error}</span>
            </div>
            <div>
                <input type="submit" value="Balance" />
                <input type="reset" value="Clear" />
            </div>
        </form>
    </>
    );
}

export default Balance;
