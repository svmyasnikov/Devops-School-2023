package ru.tsystems.devschool.mapper;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.stereotype.Component;
import ru.tsystems.devschool.model.Course;
import ru.tsystems.devschool.model.CourseDto;
import ru.tsystems.devschool.model.CourseRegistrationDto;
import ru.tsystems.devschool.model.Mentor;
import ru.tsystems.devschool.model.MentorDto;
import ru.tsystems.devschool.model.School;
import ru.tsystems.devschool.model.SchoolDto;
import ru.tsystems.devschool.model.Student;
import ru.tsystems.devschool.model.StudentDto;

import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

/**
 * Mapper functions utils.
 */
@Component
@Slf4j
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class MapperFunctions {
    private static final ModelMapper modelMapper;

    static {
        modelMapper = new ModelMapper();
        modelMapper.getConfiguration()
                .setMatchingStrategy(MatchingStrategies.STRICT)
                .setSkipNullEnabled(true);
    }

    /**
     * Mapper for transforming Course DTO to entity
     *
     * @return function for mapping
     */
    public static Function<CourseDto, Course> dtoToCourseMapper() {
        return courseDto -> modelMapper.map(courseDto, Course.class);
    }

    /**
     * Mapper for transforming Course entity to DTO
     *
     * @return function for mapping
     */
    public static Function<Course, CourseDto> courseToDtoMapper() {
        return course -> modelMapper.map(course, CourseDto.class);
    }

    /**
     * Mapper for transforming Mentor DTO to entity
     *
     * @return function for mapping
     */
    public static Function<MentorDto, Mentor> dtoToMentorMapper() {
        return mentorDto -> modelMapper.map(mentorDto, Mentor.class);
    }

    /**
     * Mapper for transforming Mentor entity to DTO
     *
     * @return function for mapping
     */
    public static Function<Mentor, MentorDto> mentorToDtoMapper() {
        return mentor -> modelMapper.map(mentor, MentorDto.class);
    }

    /**
     * Mapper for transforming School DTO to entity
     *
     * @return function for mapping
     */
    public static Function<SchoolDto, School> dtoToSchoolMapper() {
        return schoolDto -> modelMapper.map(schoolDto, School.class);
    }

    /**
     * Mapper for transforming School entity to DTO
     *
     * @return function for mapping
     */
    public static Function<School, SchoolDto> schoolToDtoMapper() {
        return school -> modelMapper.map(school, SchoolDto.class);
    }

    /**
     * Mapper for transforming Student DTO to entity
     *
     * @return function for mapping
     */
    public static Function<StudentDto, Student> dtoToStudentMapper() {
        return studentDto -> {
            Student student = modelMapper.map(studentDto, Student.class);
            student.setSchool(Optional.ofNullable(studentDto.getSchool()).map(dtoToSchoolMapper()).orElse(null));
            student.setMentor(Optional.ofNullable(studentDto.getMentor()).map(dtoToMentorMapper()).orElse(null));
            studentDto.getCourses().forEach(c -> student.addCourse(modelMapper.map(c.getCourse(), Course.class), c.getMark()));
            return student;
        };
    }

    /**
     * Mapper for transforming Student entity to DTO
     *
     * @return function for mapping
     */
    public static Function<Student, StudentDto> studentToDtoMapper() {
        return student -> {
            StudentDto studentDto = modelMapper.map(student, StudentDto.class);
            studentDto.setSchool(Optional.ofNullable(student.getSchool()).map(schoolToDtoMapper()).orElse(null));
            studentDto.setMentor(Optional.ofNullable(student.getMentor()).map(mentorToDtoMapper()).orElse(null));
            studentDto.setCourses(student.getRegistrations().stream().map(registration -> {
                CourseRegistrationDto courseRegistrationDto = new CourseRegistrationDto();
                courseRegistrationDto.setCourse(modelMapper.map(registration.getCourse(), CourseDto.class));
                courseRegistrationDto.setMark(registration.getMark());
                return courseRegistrationDto;
            }).collect(Collectors.toList()));
            return studentDto;
        };
    }

}
