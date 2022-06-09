let uniqueId = () => {
    return Math.round(Math.random() * 100)   
}

let state = {
    balance: 0,
    income: 0,
    expense: 0,
    transaction: [
        // { id: uniqueId(), name: 'Salary', amount: 1000, type: 'income'},
        // { id: uniqueId(), name: 'Groceries', amount: 500, type: 'expense'},
        // { id: uniqueId(), name: 'Piano', amount: 200, type: 'expense'}
        // {name: 'Salary', amount: 1000, type: 'income'}
    ]
}

const balanceElement = document.querySelector('.balance')
const incomeElement = document.querySelector('.income')
const expenseElement = document.querySelector('.expense')
const transactionElement = document.querySelector('.transaction')
const incomeButtonElement = document.querySelector('.income-button')
const expenseButtonElement = document.querySelector('.expense-button')
const nameInputElement = document.querySelector('.name')
const numberInputElement = document.querySelector('.number')


// calculation of balance


const updateState = () => {

    let balance = 0, income = 0, expense = 0

    for (const transact of state.transaction) {
        if (transact.type === 'income') {
            income += transact.amount
        } else if (transact.type === 'expense') {
            expense += transact.amount
        }
    }

    balance = income - expense
    // console.log(balance, income, expense)

    state.balance = balance
    state.income = income
    state.expense = expense

    localStorage.setItem('expenseTrackerState', JSON.stringify(state))



    render()
}

// for buttons to work


const incomeExpenseTransaction = (name, amount, type) => {
    if (name !== '' && amount !== '') {
        let transact = {
            id: uniqueId(),
            name : name,
            amount : Number(amount),
            type: type
            
        }
        state.transaction.push(transact)
        updateState()
        
    } else {
        alert("Kindly input a valid data!")
    }
    
    nameInputElement.value = ''
    numberInputElement.value = ''
}

const clickButton = () => {
    incomeButtonElement.addEventListener('click', () => {
        incomeExpenseTransaction(nameInputElement.value, numberInputElement.value, 'income')
    })
    expenseButtonElement.addEventListener('click', () => {
        incomeExpenseTransaction(nameInputElement.value, numberInputElement.value, 'expense')
    })
}
// const addIncome = () => {
//     incomeExpenseTransaction(nameInputElement.value, numberInputElement.value, 'income')
// }

// const addExpense = () => {
//     incomeExpenseTransaction(nameInputElement.value, numberInputElement.value, 'expense')
// }

const deleteButton = (event) => {
    let idConfirmation = Number(event.target.getAttribute('data-id'))
    let deleteIndex;

    for (let i = 0; i < state.transaction.length; i++) {
        if (state.transaction[i].id === idConfirmation ) {
            deleteIndex = i
            break
        }
    }

    state.transaction.splice(deleteIndex, 1)
    updateState()
}

    

// inputing the numbers

const render = () => {
    // balance, income, expense
    balanceElement.innerHTML = `$${state.balance}`
    incomeElement.innerHTML = `$${state.income}`
    expenseElement.innerHTML = `$${state.expense}`
    
    // transaction history
    let transactElement, divElement, amountElement,  buttonElement

    transactionElement.innerHTML = ''

    for (let transact of state.transaction) {
        transactElement = document.createElement('li')
        transactElement.append(transact.name)

        transactionElement.append(transactElement)
        
        divElement = document.createElement('div')
        amountElement = document.createElement('span')
        if (transact.type === 'income') {
            amountElement.className = 'income-amount'
            amountElement.innerHTML = `$${transact.amount} ✨`

        } else if (transact.type === 'expense'){
            amountElement.className = 'expense-amount'
            amountElement.innerHTML = `$${transact.amount} 🔥`

        }

        buttonElement = document.createElement('button')
        buttonElement.className = "uil uil-times"
        buttonElement.setAttribute('data-id', transact.id)
        buttonElement.addEventListener('click', deleteButton)
        
        
        divElement.append(amountElement)
        divElement.append(buttonElement)
        transactElement.append(divElement)

    }
}



const money = () => {
    let localState = JSON.parse(localStorage.getItem('expenseTrackerState')) 

    if (localState !== null) {
        state = localState
    }

    updateState()
    clickButton()
}

money()
            

