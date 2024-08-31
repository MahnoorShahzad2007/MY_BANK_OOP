#! usr/bin/env node
class Account {
    private balance: number;
  
    constructor(initialBalance: number) {
      this.balance = initialBalance;
    }
  
    deposit(amount: number): void {
      if (amount <= 0) {
        console.error('Deposit amount must be positive.');
        return;
      }
      this.balance += amount;
      console.log(`Deposited ${amount}. New balance is ${this.balance}.`);
    }
  
    withdraw(amount: number): void {
      if (amount <= 0) {
        console.error('Withdrawal amount must be positive.');
        return;
      }
      if (amount > this.balance) {
        console.error('Insufficient funds.');
        return;
      }
      this.balance -= amount;
      console.log(`Withdrew ${amount}. New balance is ${this.balance}.`);
    }
  
    getBalance(): number {
      return this.balance;
    }
  }
  
  class Transaction {
    private account: Account;
    private amount: number;
    private type: 'deposit' | 'withdraw';
  
    constructor(account: Account, amount: number, type: 'deposit' | 'withdraw') {
      this.account = account;
      this.amount = amount;
      this.type = type;
    }
  
    perform(): void {
      if (this.type === 'deposit') {
        this.account.deposit(this.amount);
      } else if (this.type === 'withdraw') {
        this.account.withdraw(this.amount);
      }
    }
  }
  
  class BankManager {
    private accounts: Map<number, Account> = new Map();
    private nextAccountId: number = 1;
  
    createAccount(initialBalance: number): number {
      const account = new Account(initialBalance);
      const accountId = this.nextAccountId++;
      this.accounts.set(accountId, account);
      return accountId;
    }
  
    getAccount(accountId: number): Account | undefined {
      return this.accounts.get(accountId);
    }
  
    performTransaction(accountId: number, amount: number, type: 'deposit' | 'withdraw'): void {
      const account = this.getAccount(accountId);
      if (account) {
        const transaction = new Transaction(account, amount, type);
        transaction.perform();
      } else {
        console.error('Account not found.');
      }
    }
  
    getAccountBalance(accountId: number): number | undefined {
      const account = this.getAccount(accountId);
      return account ? account.getBalance() : undefined;
    }
  }
  
  // Main application code
  function main() {
    const bankManager = new BankManager();
  
    // Create accounts
    const account1 = bankManager.createAccount(500);
    const account2 = bankManager.createAccount(1000);
  
    // Perform transactions
    bankManager.performTransaction(account1, 150, 'deposit');
    bankManager.performTransaction(account2, 200, 'withdraw');
  
    // Check balances
    console.log(`Account 1 balance: ${bankManager.getAccountBalance(account1)}`);
    console.log(`Account 2 balance: ${bankManager.getAccountBalance(account2)}`);
  }
  
  main();
  
  