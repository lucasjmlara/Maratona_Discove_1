const Modal = {
    open() {
        document
        .querySelector(".modal-overlay")
        .classList
        .add("active");
    },
    close() {
        document
        .querySelector(".modal-overlay")
        .classList
        .remove("active");
    }
}

const transactions = [
    {
        id:1,
        description: 'Luz',
        amount: - 23238,
        date: '03/04/2021',
    },
    {
        id:2,
        description: 'Bolsa Auxílio',
        amount: 150000,
        date: '03/04/2021',
    },
    {
        id:3,
        description: 'WiseUp Online',
        amount: - 9500,
        date: '26/03/2021',
    },
]

const Transaction = {
    all: transactions,

    add(transaction) {
        Transaction.all.push(transaction);

        App.reload();
    },

    incomes() {
        let income = 0;
        Transaction.all.forEach((transaction) => {
            if(transaction.amount > 0) {
                income += transaction.amount;
            }
        })
        return income;
    },
    expenses() {
        let expense = 0;
        Transaction.all.forEach((transaction) => {
            if(transaction.amount < 0) {
                expense += transaction.amount;
            }
        })
        return expense;
    },
    total() {
        return (Transaction.incomes() + Transaction.expenses());
    }
}

const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),
    
    addTransaction(transaction, index) {
        const tr = document.createElement('tr');
        tr.innerHTML = DOM.innerHTMLTransaction(transaction);
        DOM.transactionsContainer.appendChild(tr);

    },

    innerHTMLTransaction(transaction) {
        const CSSclass = transaction.amount > 0 ? "income" : "expense";

        const amount = Utils.formatCurrency(transaction.amount);

        const html = `
        <tr>
            <td class="date">${transaction.date}</td>
            <td class="description">${transaction.description}</td>
            <td class="${CSSclass}">${amount}</td>
            <td>
                <img src="./assets/minus.svg">
            </td>
        </tr>
        `
        return html
    },

    updateBalance() {
        document
            .getElementById('incomeDisplay')
            .innerHTML = Utils.formatCards(Transaction.incomes());
        document
            .getElementById('expenseDisplay')
            .innerHTML = Utils.formatCards(Transaction.expenses());
        document
            .getElementById('totalDisplay')
            .innerHTML = Utils.formatCards(Transaction.total());

    },

    clearTransactions() {
        DOM.transactionsContainer.innerHTML = "";
    }
}

const Utils = {
    formatCurrency(value) {
        const signal = Number(value) < 0 ? "- " : "+ ";

        value = String(value).replace(/\D/g, '');

        value = Number(value) / 100;
        value = value.toLocaleString('pt-BT', {
            style: "currency",
            currency: "BRL",
        });   

        return (signal + value);
    },
    formatCards(value) {
        value = String(value).replace(/\D/g, '');

        value = Number(value) / 100;
        value = value.toLocaleString('pt-BT', {
            style: "currency",
            currency: "BRL",
        });   

        return (value);
    }
}

const App = {
    init() {
        
        Transaction.all.forEach(transaction => {
            DOM.addTransaction(transaction); 
        })

        DOM.updateBalance()
    },
    reload() {
        DOM.clearTransactions();
        App.init()
    },
}

App.init()