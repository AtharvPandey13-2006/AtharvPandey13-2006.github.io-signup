package com.finsol.signup.repository;

import com.finsol.signup.model.Debt;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DebtRepository extends MongoRepository<Debt, String> {}
