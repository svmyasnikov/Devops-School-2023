package ru.tsystems.devschool.service;


import ru.tsystems.devschool.mapper.MapperFunctions;
import ru.tsystems.devschool.model.Mentor;
import ru.tsystems.devschool.model.MentorDto;
import ru.tsystems.devschool.repository.MentorRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Service for Mentors.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class MentorService {

    private final MentorRepository mentorRepository;

    /**
     * Creates Mentor
     *
     * @param mentorDto mentorDto
     * @return created mentor
     */
    @Transactional
    public MentorDto create(MentorDto mentorDto) {
        Mentor mentor = MapperFunctions.dtoToMentorMapper().apply(mentorDto);

        return MapperFunctions.mentorToDtoMapper().apply(mentorRepository.saveAndFlush(mentor));
    }

    /**
     * Searches all mentors
     *
     * @return List of mentors
     */
    @Transactional
    public List<MentorDto> search() {
        return mentorRepository.findAll().stream().map(MapperFunctions.mentorToDtoMapper()).collect(Collectors.toList());
    }

    /**
     * Gets mentor by ID
     *
     * @return mentorDto
     */
    @Transactional
    public MentorDto findById(Long id) {
        return mentorRepository.findById(id).map(MapperFunctions.mentorToDtoMapper()).orElse(null);
    }
}
