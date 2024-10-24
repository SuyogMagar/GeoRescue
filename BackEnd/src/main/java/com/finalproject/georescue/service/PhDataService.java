package com.finalproject.georescue.service;

import com.finalproject.georescue.model.PhData;
import com.finalproject.georescue.repository.PhDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PhDataService {

    @Autowired
    private PhDataRepository phDataRepository;

    public PhData savePhData(PhData phData) {
        return phDataRepository.save(phData);
    }
}
