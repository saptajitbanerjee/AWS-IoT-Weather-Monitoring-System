# AWS IoT Weather Monitoring System Documentation

## Table of Contents
- [Introduction](#introduction)
- [Project Overview](#project-overview)
- [Hardware and Software Used](#hardware-and-software-used)
- [System Architecture](#system-architecture)
- [Project Implementation](#project-implementation)
  - [ESP32 Implementation](#esp32-implementation)
  - [Web Application Implementation](#web-application-implementation)
- [Optimizations](#optimizations)
- [Conclusion](#conclusion)
- [Resources](#resources)

## Introduction

This documentation presents an AWS IoT Weather Monitoring System, a project that combines IoT, Cloud Computing, and Web Development to create an integrated weather monitoring solution. The project utilizes the ESP32 S2 Feather microcontroller and the BME280 sensor to collect weather data, which is then sent to AWS IoT for processing and storage. The system provides real-time weather data visualization through a web application while ensuring user authentication and data security.

## Project Overview

The AWS IoT Weather Monitoring System is designed to collect and visualize real-time weather data, providing users with valuable insights. It leverages the following key components:

- **ESP32 S2 Feather Microcontroller:** Collects weather data using the BME280 sensor and securely transmits it to AWS IoT Core.

- **AWS IoT Core:** Receives, processes, and stores weather data, ensuring secure and authenticated connections.

- **DynamoDB:** Stores weather data along with user authentication data, guaranteeing data integrity and confidentiality.

- **Web Application:** Offers real-time weather data visualization through interactive line charts and ensures secure user access through Passport.js authentication.

<video width="320" height="240" controls>
  <source src="https://github.com/saptajitbanerjee/AWS-IoT-Weather-Monitoring-System/blob/3997891db2d32e55f54fa2d25c5c971897fa51e0/video.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

## Hardware and Software Used

**Hardware:**
- ESP32 S2 Feather Microcontroller
- USB Type C Cable

**Software:**
- Arduino IDE
- VS Code Editor
- AWS Account

## System Architecture

The system architecture consists of the ESP32 S2 microcontroller for data collection, AWS IoT Core for data processing and storage, and a web application for real-time data visualization and user interaction.

![System Architecture](https://github.com/saptajitbanerjee/AWS-IoT-Weather-Monitoring-System/blob/main/full_stack_architecture.png)

![Full Stack Architecture](https://github.com/saptajitbanerjee/AWS-IoT-Weather-Monitoring-System/blob/main/system_architecture.png)

## Project Implementation

### ESP32 Implementation

The ESP32 S2 Feather was programmed using the Arduino IDE to collect temperature, humidity, pressure, and altitude data from the BME280 sensor.

- MQTT protocol was utilized to establish a secure connection between the ESP32 and AWS IoT Core, where the ESP32 was registered as a single "Thing."

- Certificates and policies were created to ensure secure and authenticated connections between the ESP32 and AWS IoT Core, guaranteeing data confidentiality and integrity.

### Web Application Implementation

The web application was developed using JavaScript, jQuery, Express.js, Passport.js, HighCharts.js, HTML, and CSS.

- Passport.js was used for user authentication, ensuring secure access to the system.

- HighCharts.js facilitated real-time weather data visualization through interactive line charts.

## Optimizations

To enhance system performance and efficiency:

- The ESP32 was optimized to disconnect from WiFi immediately after data transmission, minimizing power consumption and networking resources.

- JavaScript code in the web application was streamlined, memory utilization was improved, and WebSocket connections were optimized for minimal resource consumption.

## Conclusion

The AWS IoT Weather Monitoring System demonstrates the potential of combining IoT, Cloud Computing, and Web Development to create a user-friendly and reliable weather monitoring solution. It offers seamless data collection, secure storage, real-time data visualization, and user authentication capabilities.

## Resources

- [GitHub Repository](https://github.com/saptajitbanerjee/AWS-IoT-Weather-Monitoring-System)
