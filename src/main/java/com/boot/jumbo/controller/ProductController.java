package com.boot.jumbo.controller;

import com.boot.jumbo.model.Product;
import com.boot.jumbo.repository.ProductRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    private final ProductRepository repository;

    public ProductController(ProductRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Product> getAll() { 
        return repository.findAll(); 
    }

    @PostMapping
    public Product create(@RequestBody Product product) { 
        return repository.save(product); 
    }
}