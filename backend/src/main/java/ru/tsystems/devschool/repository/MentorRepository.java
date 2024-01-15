package ru.tsystems.devschool.repository;

import ru.tsystems.devschool.model.Course;
import ru.tsystems.devschool.model.Mentor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

/**
 * Mentor repository
 */
public interface MentorRepository extends JpaRepository<Mentor, Long>, JpaSpecificationExecutor<Course> {
}
