package ru.tsystems.devschool;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.web.ServerProperties;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.core.Ordered;

/**
 * Service entry point
 */
@SpringBootApplication(scanBasePackages = "ru.tsystems.devschool")
public class DevSchoolApplication {
    public static void main(String[] args) {
        SpringApplication.run(DevSchoolApplication.class, args);
    }

    @Autowired
    private ServerProperties serverProperties;

    @Bean
    public FilterRegistrationBean tvppFaultReportLoggingFilter() {
        FilterRegistrationBean registration = new FilterRegistrationBean();
        registration.setOrder(Ordered.LOWEST_PRECEDENCE);
        registration.setFilter(new HeaderFilter(serverProperties.getPort().toString()));
        return registration;
    }
}
