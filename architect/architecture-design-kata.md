# Architecture Design Kata

## Background

BPP tutors require an efficient mechanism to notify their growing number of students. The primary goal initially is to enable email notifications, which can be sent instantaneously or scheduled for future delivery.

## Kata Introduction

Your task: Design a student email notification system for BPP.

Your solution design should encompass:

- a Notification Sender Web App for tutors
- a Notification Engine
- a Learning Web App for students

The solution should consider specific functional and non-functional requirements, third-party integrations, and constraints detailed below.

## Functional Criteria

### Notification Sender Web App

- Tutors should be able to draft email notifications for Students within the App and choose to send them instantly or schedule them for a future date and time.

### Learning Web App

- Students should be able to use a Learning App to register their Email Address

### Notification Handling

- The system should send email notifications either instantly or at the scheduled time.
- Notifications should be sent to the student's registered email address as an email alert.

## Non-Functional Criteria

- Some email notifications are important and can be scheduled to be delivered to all 100,000 students at once.

## Constraints

- Emails should be sent using a third-party, SaaS Email Sender via an API.
- The SaaS Email Sender API has a burst-limit of 10,000, and allows an additional 10,000 requests every minute, with a maximum equal to the burst-limit.
- BPP is currently piloting 2 other SaaS Email Senders, as the existing contract expires in 6 months.

------

## Part 2 - Additional Requirements

### 1. Auditing

For the Notification Sender Web App:

- An audit of the notification should be stored and viewable within the App.
- Each audit record should have a retention period of 3 months and should be deleted after this period.

### 2. In-App Notifications

For the Notification Handling:

- The system should be capable of sending both Emails and In-App Notifications.
- It should detect if a student is currently logged onto their Learning Web App.
- If the student is online and active:
  - The notification should appear on their screen as an in-app notification, ensuring immediate visibility.
- If the student is offline:
  - The student should receive just an email notification

### 3. Multi-language Support

For the Notification Handling:

- The notification should be translated from English to the appropriate language, either English or French, depending on the student's preference.