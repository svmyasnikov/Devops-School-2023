package ru.tsystems.devschool.controller;

import org.junit.Ignore;
import ru.tsystems.devschool.api.CourseApi;
import ru.tsystems.devschool.model.CourseDto;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.List;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
@TestPropertySource(locations = {"classpath:application-test.properties"})
public class CourseControllerTest {

    @Autowired
    private CourseApi courseApi;

    @Test
    @Ignore
    public void shouldCreateAndFindCourse() {
        CourseDto createdCourse = courseApi.createCourse(new CourseDto().name("testCourse"));
        CourseDto foundCourse = courseApi.getCourse(createdCourse.getId());

        Assert.assertEquals(createdCourse, foundCourse);
    }

    @Test
    @Ignore
    public void shouldGetAllCourses() {
        CourseDto createdCourse = courseApi.createCourse(new CourseDto().name("testCourse2"));
        List<CourseDto> allCourses = courseApi.getAllCourses();

        Assert.assertTrue(allCourses.contains(createdCourse));
    }
}
