package ru.tsystems.devschool.service;

import ru.tsystems.devschool.mapper.MapperFunctions;
import ru.tsystems.devschool.model.Course;
import ru.tsystems.devschool.model.CourseDto;
import ru.tsystems.devschool.repository.CourseRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Service for Courses.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class CourseService {

    private final CourseRepository courseRepository;

    /**
     * Creates Course
     *
     * @param courseDto course dto
     * @return created course
     */
    @Transactional
    public CourseDto create(CourseDto courseDto) {
        Course course = MapperFunctions.dtoToCourseMapper().apply(courseDto);

        return MapperFunctions.courseToDtoMapper().apply(courseRepository.saveAndFlush(course));
    }

    /**
     * Searches all courses
     *
     * @return List of courses
     */
    @Transactional
    public List<CourseDto> search() {
        return courseRepository.findAll().stream().map(MapperFunctions.courseToDtoMapper()).collect(Collectors.toList());
    }

    /**
     * Gets Course by ID
     *
     * @return CourseDto
     */
    @Transactional
    public CourseDto findById(Long id) {
        return courseRepository.findById(id).map(MapperFunctions.courseToDtoMapper()).orElse(null);
    }
}
