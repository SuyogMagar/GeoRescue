package com.finalproject.georescue;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class OAuthController {

    @GetMapping("/{path:[^\\.]*}")
        public String redirect() {

            //return "redirect:/home";  // home.html or home.jsp
              return "forward:/index.html";
        }
}

