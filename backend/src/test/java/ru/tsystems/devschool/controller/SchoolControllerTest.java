package ru.tsystems.devschool.controller;

import org.junit.Ignore;
import ru.tsystems.devschool.api.SchoolApi;
import ru.tsystems.devschool.model.SchoolDto;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.time.LocalDate;
import java.util.List;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
@TestPropertySource(locations = {"classpath:application-test.properties"})
public class SchoolControllerTest {

    @Autowired
    private SchoolApi schoolApi;

    @Test
    @Ignore
    public void shouldCreateAndFindSchool() {
        SchoolDto createdSchool = schoolApi.createSchool(new SchoolDto().number(1).startDate(LocalDate.now()).endDate(LocalDate.now()));
        SchoolDto foundSchool = schoolApi.getSchool(createdSchool.getId());

        Assert.assertEquals(createdSchool, foundSchool);
    }

    @Test
    @Ignore
    public void shouldGetAllSchools() {
        SchoolDto createdSchool = schoolApi.createSchool(new SchoolDto().number(2).startDate(LocalDate.now()).endDate(LocalDate.now()));
        List<SchoolDto> allSchools = schoolApi.getAllSchools();

        Assert.assertTrue(allSchools.contains(createdSchool));
    }
}
