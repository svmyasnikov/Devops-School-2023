package ru.tsystems.devschool.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.Set;


@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "course")
@ToString
@EqualsAndHashCode(callSuper = true, exclude = {"registrations"})
@SequenceGenerator(name = BaseEntity.PK_GENERATOR_NAME, sequenceName = "course_seq", allocationSize = 1)
public class Course extends BaseEntity {

    @Column(name = "name")
    @NotNull
    private String name;

    @OneToMany(mappedBy = "courseRegistrationKey.course")
    Set<CourseRegistration> registrations = new HashSet<>();
}
