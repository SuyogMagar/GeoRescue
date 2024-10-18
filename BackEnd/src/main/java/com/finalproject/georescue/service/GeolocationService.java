package com.finalproject.georescue.service;

import com.finalproject.georescue.model.Location;
import com.finalproject.georescue.repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class GeolocationService {

    @Autowired
    private LocationRepository locationRepository;

    public void saveLocation(Location location) {
        locationRepository.save(location);
    }

    public String fetchAddress(double latitude, double longitude) {
        String url = String.format("https://nominatim.openstreetmap.org/reverse?format=json&lat=%f&lon=%f", latitude, longitude);
        RestTemplate restTemplate = new RestTemplate();
        String response = restTemplate.getForObject(url, String.class);
        return response; // You can parse this response to return specific address details if needed
    }
}
