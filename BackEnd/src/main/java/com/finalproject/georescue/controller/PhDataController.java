package com.finalproject.georescue.controller;

import com.finalproject.georescue.model.PhData;
import com.finalproject.georescue.service.PhDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/phdata")
public class PhDataController {

    @Autowired
    private PhDataService phDataService;

    @PostMapping("/save")
    public ResponseEntity<PhData> savePhData(@RequestBody PhData phData) {
        // Set the timestamp to now if not provided
        if (phData.getTimestamp() == null) {
            phData.setTimestamp(LocalDateTime.now());
        }

        PhData savedData = phDataService.savePhData(phData);
        return ResponseEntity.ok(savedData);
    }
}
