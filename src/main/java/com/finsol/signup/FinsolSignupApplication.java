package com.finsol.signup;

import com.finsol.signup.repository.DebtRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class FinsolSignupApplication {

    public static void main(String[] args) {
        SpringApplication.run(FinsolSignupApplication.class, args);
    }

    @Bean
    public CommandLineRunner checkRepo(DebtRepository repo) {
        return args -> {
            System.out.println("💾 Total debts: " + repo.count());
        };
    }
}
