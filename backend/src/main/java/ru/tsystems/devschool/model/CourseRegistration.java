package ru.tsystems.devschool.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.AssociationOverride;
import javax.persistence.AssociationOverrides;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@AssociationOverrides({
    @AssociationOverride(name = "courseRegistrationKey.student",
        joinColumns = @JoinColumn(name = "STUDENT_ID")),
    @AssociationOverride(name = "courseRegistrationKey.course",
        joinColumns = @JoinColumn(name = "COURSE_ID")) })
@NoArgsConstructor
@Table(name = "course_registration")
@Getter
@Setter
public class CourseRegistration {

    @EmbeddedId
    CourseRegistrationKey courseRegistrationKey = new CourseRegistrationKey();

    private Integer mark;

    public CourseRegistration(Course course, Student student, int mark) {
        this.setCourse(course);
        this.setStudent(student);
        this.mark = mark;
    }

    public void setCourse(Course course) {
        courseRegistrationKey.setCourse(course);
    }

    public void setStudent(Student student) {
        courseRegistrationKey.setStudent(student);
    }

    @Transient
    public Course getCourse() {
        return courseRegistrationKey.getCourse();
    }

    @Transient
    public Student getStudent() {
        return courseRegistrationKey.getStudent();
    }
}
