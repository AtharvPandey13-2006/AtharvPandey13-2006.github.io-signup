package com.finsol.signup.controller;

import com.finsol.signup.model.Debt;
import com.finsol.signup.repository.DebtRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/debts")
@CrossOrigin(origins = "*")
public class DebtController {

    @Autowired
    private DebtRepository debtRepository;

    @GetMapping
    public List<Debt> getAllDebts() {
        return debtRepository.findAll();
    }

    @PostMapping
    public Debt createDebt(@RequestBody Debt debt) {
        System.out.println("🔥 Received new debt: " + debt);
        return debtRepository.save(debt);
    }

    @PutMapping("/{id}")
    public Debt updateDebt(@PathVariable String id, @RequestBody Debt updatedDebt) {
        Optional<Debt> existingDebt = debtRepository.findById(id);
        if (existingDebt.isPresent()) {
            Debt debt = existingDebt.get();
            debt.setLenderName(updatedDebt.getLenderName());
            debt.setLoanAmount(updatedDebt.getLoanAmount());
            debt.setMonthlyPayment(updatedDebt.getMonthlyPayment());
            debt.setDueDate(updatedDebt.getDueDate());
            debt.setPaidAmount(updatedDebt.getPaidAmount()); // ✅ Ensures updated paid amount
            System.out.println("🔁 Updating debt: " + debt);
            return debtRepository.save(debt);
        } else {
            throw new RuntimeException("Debt not found with id " + id);
        }
    }

    @DeleteMapping("/{id}")
    public void deleteDebt(@PathVariable String id) {
        debtRepository.deleteById(id);
    }
}
