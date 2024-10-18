package com.finalproject.georescue.controller;

import com.finalproject.georescue.model.Location;
import com.finalproject.georescue.service.GeolocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/geolocation")
@CrossOrigin(origins = "http://localhost:5173") // Adjust the origin as per your frontend URL
public class GeolocationController {

    @Autowired
    private GeolocationService geolocationService;

    // Endpoint to save the location data
    @PostMapping("/save")
    public String saveLocation(@RequestBody Location location) {
        geolocationService.saveLocation(location);
        return "Location saved successfully!";
    }

    // Endpoint to fetch address details using latitude and longitude
    @GetMapping("/address")
    public ResponseEntity<String> fetchAddress(@RequestParam double latitude, @RequestParam double longitude) {
        try {
            String address = geolocationService.fetchAddress(latitude, longitude);
            return ResponseEntity.ok(address);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error fetching address: " + e.getMessage());
        }
    }
}
