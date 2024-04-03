import {useState} from "react";
import Register from "../components/Register";
import Withdraw from "../components/Withdraw";
import Deposit from "../components/Deposit";
import ChequeDeposit from "../components/ChequeDeposit";
import Balance from "../components/Balance";
import "../styles/layout.css";

function layout(){
    const [page, setPage] = useState(0);
    return (
        <main>
            <div>
                <h1>Banking Application</h1>
            </div>
            <section>

            <div>
                <button onClick={() => setPage(0)}>Create Account</button>
                <button onClick={() => setPage(1)}>Withdraw</button>
                <button onClick={() => setPage(2)}>Deposit</button>
                <button onClick={() => setPage(3)}>Cheque Deposit</button>
                <button onClick={() => setPage(4)}>Balance</button>
            </div>
            <div>
                {page === 0 && <Register />}
                {page === 1 && <Withdraw />}
                {page === 2 && <Deposit />}
                {page === 3 && <ChequeDeposit />}
                {page === 4 && <Balance />}
            </div>
            </section>
        </main>
    )
}

export default layout;