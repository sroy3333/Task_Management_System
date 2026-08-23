CREATE DATABASE IF NOT EXISTS task_management
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE task_management;

CREATE TABLE IF NOT EXISTS tasks (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  priority ENUM('High', 'Medium', 'Low') NOT NULL,
  status ENUM('Todo', 'In Progress', 'Completed') NOT NULL,
  dueDate DATE NOT NULL,
  PRIMARY KEY (id),
  INDEX idx_tasks_status (status),
  INDEX idx_tasks_priority (priority),
  INDEX idx_tasks_due_date (dueDate)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO tasks (id, title, priority, status, dueDate)
VALUES
  (4, 'Learn NestJS Persistence', 'Low', 'Completed', '2026-08-20'),
  (5, 'Build API Login', 'High', 'In Progress', '2026-09-18'),
  (6, 'Learn NestJS Persistence', 'High', 'In Progress', '2026-08-28')
ON DUPLICATE KEY UPDATE
  title = VALUES(title),
  priority = VALUES(priority),
  status = VALUES(status),
  dueDate = VALUES(dueDate);

ALTER TABLE tasks AUTO_INCREMENT = 7;
