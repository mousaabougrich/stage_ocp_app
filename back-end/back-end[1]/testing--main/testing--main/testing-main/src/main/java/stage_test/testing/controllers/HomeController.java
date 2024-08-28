package stage_test.testing.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
@CrossOrigin("*")
@Controller
public class HomeController {

    @GetMapping("/home")
    public String home() {
        return "home"; // Create a home.html in src/main/resources/templates
    }

    @GetMapping("/login")
    public String login() {
        return "login"; // login.html in src/main/resources/templates
    }
}
