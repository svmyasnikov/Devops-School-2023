package ru.tsystems.devschool;

import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.InetAddress;
import java.net.UnknownHostException;

public class HeaderFilter extends OncePerRequestFilter {

    private String hostAddress;
    private String hostName;
    public HeaderFilter(String port) {
        InetAddress ip;
        try {
            ip = InetAddress.getLocalHost();
            hostAddress = ip.getHostAddress() + ":" + port;
            hostName = ip.getHostName() + ":" + port;
        } catch (UnknownHostException e) {
            hostAddress = null;
            e.printStackTrace();
        }
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
        FilterChain filterChain) throws ServletException, IOException {
        response.addHeader("Full-Path", hostName);
        filterChain.doFilter(request, response);
    }
}
