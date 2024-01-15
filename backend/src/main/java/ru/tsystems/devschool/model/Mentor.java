package ru.tsystems.devschool.model;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "mentor")
@ToString
@EqualsAndHashCode(callSuper = true)
@SequenceGenerator(name = BaseEntity.PK_GENERATOR_NAME, sequenceName = "mentor_seq", allocationSize = 1)
public class Mentor extends BaseEntity {

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "email")
    private String email;

    @Column(name = "phone")
    private String phone;
}

