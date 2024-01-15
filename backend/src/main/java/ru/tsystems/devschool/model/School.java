package ru.tsystems.devschool.model;

import javax.validation.constraints.NotNull;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;


@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "school")
@ToString
@EqualsAndHashCode(callSuper = true)
@SequenceGenerator(name = BaseEntity.PK_GENERATOR_NAME, sequenceName = "school_seq", allocationSize = 1)
public class School extends BaseEntity {
    @Column(name = "number")
    @NotNull
    private Integer number;

    @Column(name = "start_date")
    @NotNull
    private LocalDate startDate;

    @Column(name = "end_date")
    @NotNull
    private LocalDate endDate;
}
