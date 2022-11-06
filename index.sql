DROP TABLE IF EXISTS City;

CREATE TABLE City (
    ID INT(11),
    Name CHAR(35),
    CountryCode CHAR(3),
    District CHAR(20),
    Population INT(11),
    PRIMARY KEY (ID, CountryCode)
)
INSERT INTO
    City(ID, Name, CountryCode, District, Population)
VALUES
    ('New York', 'USA', 'New York', 8008278),
    ('Los Angeles', 'USA', 'California', 3694820),
    ('Chicago', 'USA', 'Illinois', 2896016),
    ('Houston', 'USA', 'Texas', 1953631),
    ('Philadelphia', 'USA', 'Pennsylvania', 1517550),
    ('Moscow', 'RUS', 'Moscow (City)', 8389200),
    ('St Petersburg', 'RUS', 'Pietari', 4694000),
    ('Novosibirsk', 'RUS', 'Novosibirsk', 1398800),
    (
        'Nizni Novgorod',
        'RUS',
        'Nizni Novgorod',
        1357000
    ),
    ('Jekaterinburg', 'RUS', 'Sverdlovsk', 1266300),
    ('Shanghai', 'CHN', 'Shanghai', 9696300),
    ('Peking', 'CHN', 'Peking', 7472000),
    ('Chongqing', 'CHN', 'Chongqing', 6351600),
    ('Tianjin', 'CHN', 'Tianjin', 5286800),
    ('Wuhan', 'CHN', 'Hubei', 4344600);