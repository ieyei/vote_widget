# vote_widget

## Movies table

### create table

```sql
CREATE TABLE IF NOT EXISTS `movie` (
  `id` INT(10) NOT NULL AUTO_INCREMENT,
	`title` VARCHAR(50) NOT NULL,
	`director_name` VARCHAR(50) NOT NULL,
	`summary` TEXT NOT NULL,
	PRIMARY KEY (`id`)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;
```

### insert dummy data

```sql
INSERT INTO `movie` (`title`,`director_name`, `summary`) VALUES
  ('영화1', '감독1', '요약1'),
  ('영화2', '감독2', '요약2'),
  ('영화3', '감독3', '요약3');
```

## Users table

### create table

```sql
CREATE TABLE IF NOT EXISTS `user` (
  `id` INT(10) NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(50) NOT NULL,
	`movie_id` INT(10),
	PRIMARY KEY (`id`),
  INDEX (`movie_id`),
  FOREIGN KEY (`movie_id`)
    REFERENCES `movie` (`id`)
    ON DELETE SET NULL
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;
```

### insert dummy data

```sql
INSERT INTO `user` (`name`) VALUES
  ('유저1'),
  ('유저2'),
  ('유저3');
```

## get most favorite movie title query

```sql
SELECT movie.title
FROM movie, (
  SELECT movie_id, COUNT(id) AS count
  FROM user
  GROUP BY movie_id
  ORDER BY count DESC LIMIT 1
) AS favorite
where movie.id=favorite.movie_id;
```

## get movies with title and favorite count query

```sql
SELECT movie.title, COUNT(user.id) as favorites
FROM movie
LEFT JOIN user ON movie.id=user.movie_id
GROUP BY movie.id;
```
