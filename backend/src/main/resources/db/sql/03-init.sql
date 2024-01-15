CREATE SEQUENCE school_seq
    START WITH 1000
    INCREMENT BY 1
    NO CYCLE;
CREATE TABLE school
(
    id         BIGINT PRIMARY KEY,
    number     BIGINT NOT NULL,
    start_date DATE   NOT NULL,
    end_date   DATE   NOT NULL,
    version    BIGINT NOT NULL
);

CREATE SEQUENCE mentor_seq
    START WITH 1000
    INCREMENT BY 1
    NO CYCLE;
CREATE TABLE mentor
(
    id         BIGINT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name  VARCHAR(50),
    email      VARCHAR(50),
    phone      VARCHAR(50),
    version    BIGINT NOT NULL
);

CREATE SEQUENCE student_seq
    START WITH 1000
    INCREMENT BY 1
    NO CYCLE;
CREATE TABLE student
(
    id         BIGINT PRIMARY KEY,
    first_name VARCHAR(50)        NOT NULL,
    last_name  VARCHAR(50)        NOT NULL,
    email      VARCHAR(50) UNIQUE NOT NULL,
    phone      VARCHAR(50) UNIQUE NOT NULL,
    mentor_id  BIGINT REFERENCES mentor,
    school_id  BIGINT REFERENCES school,
    version    BIGINT             NOT NULL
);

CREATE SEQUENCE course_seq
    START WITH 1000
    INCREMENT BY 1
    NO CYCLE;
CREATE TABLE course
(
    id      BIGINT PRIMARY KEY,
    name    VARCHAR(50) UNIQUE NOT NULL,
    version BIGINT             NOT NULL
);

CREATE TABLE student_course
(
    student_id BIGINT NOT NULL REFERENCES student,
    course_id  BIGINT NOT NULL REFERENCES course,
    mark       INT,
    PRIMARY KEY (student_id, course_id)
);
