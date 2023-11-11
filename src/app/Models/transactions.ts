export class Transactions {
    userId!: String;
    transactionId!: number;
    accountNumber!: String;
    transactionDate!: Date;
    transactionType!: String; //('Deposit', 'Withdrawal', 'Transfer', 'Zelle')
    beforeAmount!: number;
    amountTransfer!: number;
    afterAmount!: number;
    description!: String;
    sender!: String;
    receiver!: String;
    transactionStatus!: String; //('Success', 'Fail', 'Denied')
}
