package ru.tsystems.devschool.repository;

import ru.tsystems.devschool.model.Course;
import ru.tsystems.devschool.model.School;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

/**
 * School repository
 */
public interface SchoolRepository extends JpaRepository<School, Long>, JpaSpecificationExecutor<Course> {
}
