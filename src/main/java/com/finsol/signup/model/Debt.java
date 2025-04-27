package com.finsol.signup.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "debts")
public class Debt {

    @Id
    private String id;

    private String lenderName;
    private double loanAmount;
    private double monthlyPayment;
    private String dueDate;
    private double paidAmount; // ✅ Added this field

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getLenderName() { return lenderName; }
    public void setLenderName(String lenderName) { this.lenderName = lenderName; }

    public double getLoanAmount() { return loanAmount; }
    public void setLoanAmount(double loanAmount) { this.loanAmount = loanAmount; }

    public double getMonthlyPayment() { return monthlyPayment; }
    public void setMonthlyPayment(double monthlyPayment) { this.monthlyPayment = monthlyPayment; }

    public String getDueDate() { return dueDate; }
    public void setDueDate(String dueDate) { this.dueDate = dueDate; }

    public double getPaidAmount() { return paidAmount; }
    public void setPaidAmount(double paidAmount) { this.paidAmount = paidAmount; }

    @Override
    public String toString() {
        return "Debt{" +
                "id='" + id + '\'' +
                ", lenderName='" + lenderName + '\'' +
                ", loanAmount=" + loanAmount +
                ", monthlyPayment=" + monthlyPayment +
                ", dueDate='" + dueDate + '\'' +
                ", paidAmount=" + paidAmount +
                '}';
    }
}
