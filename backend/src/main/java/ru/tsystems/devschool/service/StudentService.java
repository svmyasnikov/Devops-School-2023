package ru.tsystems.devschool.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.tsystems.devschool.mapper.MapperFunctions;
import ru.tsystems.devschool.model.SearchStudentsDto;
import ru.tsystems.devschool.model.Student;
import ru.tsystems.devschool.model.StudentDto;
import ru.tsystems.devschool.repository.StudentRepository;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Service for School.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class StudentService {

    private final StudentRepository studentRepository;

    /**
     * Creates Student
     *
     * @param studentDto schoolDto
     * @return created mentor
     */
    @Transactional
    public StudentDto create(StudentDto studentDto) {
        Student student = MapperFunctions.dtoToStudentMapper().apply(studentDto);
        return MapperFunctions.studentToDtoMapper().apply(studentRepository.saveAndFlush(student));
    }

    /**
     * Searches Student by criteria
     *
     * @return List of courses
     */
    @Transactional(readOnly = true)
    public List<StudentDto> getStudentsByCriteria(SearchStudentsDto searchStudentsDto) {
        return studentRepository.findAll().stream().map(MapperFunctions.studentToDtoMapper()).collect(Collectors.toList());
    }

    /**
     * Gets Student by ID
     *
     * @return SchoolDto
     */
    @Transactional
    public StudentDto findById(Long id) {
        return studentRepository.findById(id).map(MapperFunctions.studentToDtoMapper()).orElse(null);
    }
}
