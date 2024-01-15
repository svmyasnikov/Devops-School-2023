package ru.tsystems.devschool.service;


import ru.tsystems.devschool.mapper.MapperFunctions;
import ru.tsystems.devschool.model.School;
import ru.tsystems.devschool.model.SchoolDto;
import ru.tsystems.devschool.repository.SchoolRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Service for School.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class SchoolService {

    private final SchoolRepository schoolRepository;

    /**
     * Creates School
     *
     * @param schoolDto schoolDto
     * @return created mentor
     */
    @Transactional
    public SchoolDto create(SchoolDto schoolDto) {
        School school = MapperFunctions.dtoToSchoolMapper().apply(schoolDto);

        return MapperFunctions.schoolToDtoMapper().apply(schoolRepository.saveAndFlush(school));
    }

    /**
     * Searches all Schools
     *
     * @return List of courses
     */
    @Transactional
    public List<SchoolDto> search() {
        return schoolRepository.findAll().stream().map(MapperFunctions.schoolToDtoMapper()).collect(Collectors.toList());
    }

    /**
     * Gets School by ID
     *
     * @return SchoolDto
     */
    @Transactional
    public SchoolDto findById(Long id) {
        return schoolRepository.findById(id).map(MapperFunctions.schoolToDtoMapper()).orElse(null);
    }
}
