package com.finalproject.georescue.repository;

import com.finalproject.georescue.model.PhData;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PhDataRepository extends MongoRepository<PhData, String> {
    // You can add custom query methods here if needed
}
